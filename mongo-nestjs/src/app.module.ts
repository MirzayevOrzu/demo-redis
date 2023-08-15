import { Module } from '@nestjs/common';
import { CoreModule } from './shared/core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';
import { ListsModule } from './modules/lists/lists.module';

@Module({
  imports: [CoreModule, UsersModule, TodosModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
