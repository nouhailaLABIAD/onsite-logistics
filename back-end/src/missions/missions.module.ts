import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission } from './entities/mission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission, User]),
    NotificationModule,
  ],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}