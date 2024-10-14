import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Users } from 'src/database/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY') private readonly UserModel: typeof Users,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const access_token: string = request.cookies['access_token'];
      if (!access_token) throw new UnauthorizedException(access_token);
      const userPayload = await this.jwtService.verifyAsync(access_token, {
        secret: process.env.SECRET_KEY,
      });
      const user = await this.findUser({ userPayload });
      if (!user || !user.dataValues.user_email) {
        throw new UnauthorizedException('Access token missing');
      }
      request['user'] = user.dataValues;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private async findUser(payload: any) {
    console.log(payload.userPayload);
    const user = await this.UserModel.findOne({
      where: {
        user_id: payload.userPayload.user_id,
        user_email: payload.userPayload.user_email,
        role: payload.userPayload.role,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
