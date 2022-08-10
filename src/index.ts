import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`
  API IS UP AND RUNNING
  Try Hitting on
    /users
    /auth
    
  `);
});

// Server Listen
app.listen(PORT, () => {
  console.clear();
  console.log('jello');
});
