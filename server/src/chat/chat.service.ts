import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { GroupMessages } from 'src/database/entities/group.entitiy';
import { Groups } from 'src/database/entities/groups.entity';
import { Messages } from 'src/database/entities/message.entity';
import { UserGroups } from 'src/database/entities/user-groups.entity';
import { Users } from 'src/database/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('MESSAGES') private readonly messagesModel: typeof Messages,
    @Inject('GROUPMESSAGES')
    private readonly groupMessagesModel: typeof GroupMessages,
    @Inject('USER_REPOSITORY') private readonly UserModel: typeof Users,
    @Inject('GROUPS')
    private readonly groupsModel: typeof Groups,
    @Inject('USERGROUPS')
    private readonly userGroups: typeof UserGroups,
  ) {}

  async createMessage(
    senderId: number,
    data: {
      receiver_id: number;
      message: string;
    },
  ) {
    return await this.messagesModel.create({
      sender_id: senderId,
      receiver_id: data.receiver_id,
      message: data.message,
      sent_at: new Date(),
    });
  }

  async getMessagesBetweenUsers(userId1: number, userId2: number) {
    const messages = await this.messagesModel.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId1, receiver_id: userId2 },
          { sender_id: userId2, receiver_id: userId1 },
        ],
      },
      order: [['sent_at', 'ASC']],
    });
    const messageData = messages.map((message: any) => message.dataValues);
    console.log(messageData); // Now only logs the relevant message data
    return messages;
  }

  async createGroupMessage(
    senderId: number,
    payload: {
      group_id: number;
      message: string;
    },
  ) {
    const groupMessage = await this.groupMessagesModel.create({
      sender_id: senderId,
      group_id: payload.group_id,
      message: payload.message,
      sent_at: new Date(),
    });
    return groupMessage;
  }

  async getGroupMessages(group_id: number) {
    const messages = await this.groupMessagesModel.findAll({
      where: { group_id },
      include: [
        { model: Users, as: 'sender' },
        { model: Groups, as: 'group' },
      ],
    });
    console.log(messages);
    return messages;
  }

  async getGroupById(groupID: number) {
    const groupMembers = await this.userGroups.findAll({
      where: { group_id: groupID },
    });
    return groupMembers;
  }

  async getUserGroups(user_id: number) {
    const user = await this.UserModel.findByPk(user_id, {
      include: [{ model: Groups, as: 'groups' }],
    });

    return user?.groups || [];
  }
}
