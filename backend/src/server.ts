import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const host = process.env.HOST ?? '0.0.0.0';

app.listen(env.PORT, host, () => {
  console.log(`Server running on http://${host}:${env.PORT}`);
});
