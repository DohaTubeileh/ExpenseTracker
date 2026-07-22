import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './services/database/database.module';
import { ExpenseModule } from './services/expense/expense.module';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [DatabaseModule, ExpenseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
