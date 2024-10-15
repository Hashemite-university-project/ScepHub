import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return createPaymentDto;
  }

  findOne() {
    return `This action returns a  payment`;
  }
}
