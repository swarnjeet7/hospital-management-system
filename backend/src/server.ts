import express from 'express';
import { env } from './config/env.js';

const app = express();

const PORT = env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
