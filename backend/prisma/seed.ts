import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.quiz.create({
    data: {
      title: 'Sample quiz',
      questions: {
        create: [
          { position: 0, type: 'BOOLEAN', text: 'The sky is blue', answer: true },
          { position: 1, type: 'INPUT', text: 'Capital of France?', answer: 'Paris' },
          {
            position: 2,
            type: 'CHECKBOX',
            text: 'Pick fruits',
            options: [
              { text: 'Apple', correct: true },
              { text: 'Carrot', correct: false },
              { text: 'Banana', correct: true },
            ],
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
