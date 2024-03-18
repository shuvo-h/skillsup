/*
// call it in main() function before start server
async function connectToDatabase() {
    try {
      if (env.DB_URL) {
        await mongoose.connect(env.DB_URL, {
          dbName: 'test',
        } as ConnectOptions);
        console.log('Connected to the database');
      }
    } catch (error) {
      console.error('Database connection error:', error);
      throw error; // Rethrow the error to be caught by the main function
    }
}
  

// backupScript.js  file
const { exec } = require('child_process');

const backupDatabase = () => {
  const databaseUrl = 'your-mongodb-atlas-connection-string';
  const outputPath = 'path-to-backup-directory';

  const command = `mongodump --uri="${databaseUrl}" --out="${outputPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${stderr}`);
    } else {
      console.log(`Backup successful: ${stdout}`);
    }
  });
};

// Perform the backup when this script is executed
backupDatabase();



// app.js file
const cron = require('node-cron');
const { fork } = require('child_process');

// Schedule the backup script to run every day at a specific time
cron.schedule('0 0 * * *', () => {
  const backupProcess = fork('backupScript.js');
  backupProcess.on('close', (code) => {
    console.log(`Backup process exited with code ${code}`);
  });
});

// Rest of your application logic...



// return back the data from the backup to main database when need
// restoreScript.js
const { exec } = require('child_process');

const restoreDatabase = () => {
  const databaseUrl = 'your-mongodb-atlas-connection-string';
  const backupPath = 'path-to-backup-directory';

  const command = `mongorestore --uri="${databaseUrl}" --dir="${backupPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Database restoration failed: ${stderr}`);
    } else {
      console.log(`Database restoration successful: ${stdout}`);
    }
  });
};

// Perform the database restoration when this script is executed
restoreDatabase();

*/