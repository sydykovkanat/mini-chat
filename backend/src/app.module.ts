import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChatModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
