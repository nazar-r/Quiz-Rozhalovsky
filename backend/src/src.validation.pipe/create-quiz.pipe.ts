import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateQuizPipe implements PipeTransform {
  transform(body: any) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new BadRequestException('Invalid request body');
    }

    const { title, questions } = body;

    if (typeof title !== 'string' || !title.trim()) {
      throw new BadRequestException('Title is required');
    }

    if (!Array.isArray(questions) || !questions.length) {
      throw new BadRequestException('At least one question is required');
    }

    return {
      title: title.trim(),
      questions: questions.map((q, i) => {
        const text = typeof q?.text === 'string' ? q.text.trim() : '';

        if (!text) throw new BadRequestException(`Question ${i + 1} has no text`);

        if (!['BOOLEAN', 'INPUT', 'CHECKBOX'].includes(q.type)) {
          throw new BadRequestException(`Question ${i + 1} has invalid type`);
        }

        if (q.type === 'BOOLEAN') {
          if (q.answer !== undefined && typeof q.answer !== 'boolean') {
            throw new BadRequestException(`Question ${i + 1} has invalid answer`);
          }

          return { type: q.type, text, answer: q.answer ?? false };
        }

        if (q.type === 'INPUT') {
          if (q.answer !== undefined && typeof q.answer !== 'string') {
            throw new BadRequestException(`Question ${i + 1} has invalid answer`);
          }

          return { type: q.type, text, answer: q.answer ?? '' };
        }

        const options = Array.isArray(q.options) ? q.options.map((o) => {
          if (typeof o?.text !== 'string' || (o.correct !== undefined && typeof o.correct !== 'boolean')) {
            throw new BadRequestException(`Question ${i + 1} has invalid options`);
          }

          return { text: o.text.trim(), correct: o.correct ?? false };
        }).filter((o) => o.text) : [];

        if (options.length < 2) {
          throw new BadRequestException(`Question ${i + 1} needs at least 2 options`);
        }

        return { type: q.type, text, options };
      }),
    };
  }
}