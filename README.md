# Quiz Builder

Monorepo: NestJS + Prisma + PostgreSQL backend, React + React Query frontend.

## Requirements

- Node.js 20+
- PostgreSQL 14+

## Setup

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` and set `DATABASE_URL` to your PostgreSQL database.

## Database

```bash
npm run prisma:migrate -w backend
npm run prisma:seed -w backend
```

The seed script creates a sample quiz.

## Run

```bash
npm run dev
```

- API: http://localhost:3001
- Web: http://localhost:5173

Run separately: `npm run start:dev -w backend` and `npm run dev -w frontend`.

## Create a sample quiz

Through the UI open http://localhost:5173/create, or with curl:

```bash
curl -X POST http://localhost:3001/quizzes -H "Content-Type: application/json" -d '{
  "title": "Sample quiz",
  "questions": [
    { "type": "BOOLEAN", "text": "The sky is blue", "answer": true },
    { "type": "INPUT", "text": "Capital of France?", "answer": "Paris" },
    { "type": "CHECKBOX", "text": "Pick fruits", "options": [
      { "text": "Apple", "correct": true },
      { "text": "Carrot", "correct": false },
      { "text": "Banana", "correct": true }
    ] }
  ]
}'
```

## Endpoints

- `POST /quizzes`
- `GET /quizzes`
- `GET /quizzes/:id`
- `DELETE /quizzes/:id`

## Code quality

```bash
npm run lint
npm run format
```
