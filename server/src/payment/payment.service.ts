import { Inject, Injectable } from '@nestjs/common';
import { Payments } from 'src/database/entities/payment.entity';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  constructor(
    @Inject('PAYMENTS') private readonly paymentModel: typeof Payments,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCheckoutSession(userID: string) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        metadata: {
          user_id: userID,
        },
        success_url: process.env.ALLOWED_ORIGIN,
        cancel_url: process.env.ALLOWED_ORIGIN,
      });
      return session.url;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create Checkout session: ${error.message}`);
    }
  }

  async getSubscriptionStatus(userID: string, role: string) {
    try {
      const studentStripeID = await this.paymentModel.findOne({
        where: {
          user_id: userID,
        },
      });
      if (role !== '1') return { status: 'active' };
      const subscription = await this.stripe.subscriptions.retrieve(
        studentStripeID.stripe_sub_id,
      );

      return {
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
      };
    } catch (error) {
      throw new Error(`Failed to retrieve subscription: ${error.message}`);
    }
  }
}
