import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { env } from './app/config/config';

async function main() {
  try {
    // connect DB
    if (env.DB_URL) {
      await mongoose.connect(env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'test',
      } as ConnectOptions);
    }

    // listen server
    app.listen(env.port, () => {
      console.log(`app listening on port ${env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
