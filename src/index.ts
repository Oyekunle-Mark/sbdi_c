import server from './server';

// const { logger } = require('./common');

const { PORT } = process.env

function onListening() {
  // logger(module).info(`Listening on ${PORT}`);
}

server.listen(PORT, onListening)
