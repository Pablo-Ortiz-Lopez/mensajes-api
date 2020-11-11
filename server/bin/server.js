#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debugLib from 'debug';
import https from 'https';
import http from 'http';
import fs from 'fs';


const debug = debugLib('myapp:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3977');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = (()=> {
  if (process.env.NODE_ENV === 'pro') {
    const key = fs.readFileSync('/etc/letsencrypt/live/parkink.cat/privkey.pem');
    const cert = fs.readFileSync('/etc/letsencrypt/live/parkink.cat/fullchain.pem');
    const options = {
      key: key,
      cert: cert,
    };
    console.log('Deploy finished: Running parkink-api in HTTPS mode')
    return https.createServer(options,app);
  } else {
    console.log('Deploy finished: Running parkink-api in HTTP mode')
    return http.createServer(app);
  }
})()
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
