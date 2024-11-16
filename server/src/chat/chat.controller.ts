import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('messages')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Get('history')
  async getMessageHistory(
    @Req() Request: Request,
    @Query('userID2') userID2: number,
  ) {
    console.log(userID2);
    const userID1 = Request['user'].user_id;
    return this.chatService.getMessagesBetweenUsers(userID1, userID2);
  }
}
