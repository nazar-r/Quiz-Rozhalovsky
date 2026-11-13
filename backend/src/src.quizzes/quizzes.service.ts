import { PrismaService } from '../src.prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) { }

  async createQuiz({ title, questions }: any) {
    return this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question, position) => ({ ...question, position })),
        },
      },
      include: { questions: { orderBy: { position: 'asc' } } },
    });
  }

  async findAllQuizzes() {
    return this.prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: {
          select: { questions: true },
        },
        questions: {
          select: {
            type: true,
          },
        },
      },
    });
  }

  async findQuiz(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { orderBy: { position: 'asc' } } },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async removeQuiz(id: string) {
    await this.prisma.quiz.delete({ where: { id } });
    return { id };
  }
}