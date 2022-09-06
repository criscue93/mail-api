import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { DatabaseModule } from './conection/database.module';
@Module({
  imports: [ApiModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
