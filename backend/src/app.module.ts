import { Module } from '@nestjs/common';
import { PrismaModule } from './src.prisma/prisma.service';
import { QuizzesModule } from './src.quizzes/quizzes.module';

@Module({
  imports: [PrismaModule, QuizzesModule],
})
export class AppModule {}
