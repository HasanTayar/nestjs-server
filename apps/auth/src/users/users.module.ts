import { Module } from '@nestjs/common';
import { DatabaseModule, Role } from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from '@app/common';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
