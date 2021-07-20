const colors = require('colors');
const path = require('path');
const http = require('http');
const express = require('express');
const { notFound, errorHandler } = require('./middleware/error');
const connectDB = require('./db');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const requestRouter = require('./routes/request');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const messageRouter = require('./routes/message');
const paymentRouter = require('./routes/payment');
const reviewRouter = require('./routes/review');
const { json, urlencoded } = express;
const cors = require('cors');
const { appSocket } = require('./socket/index');

connectDB();
const app = express();
const server = http.createServer(app);

// --------------------------------
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// var server = require('../app').server;

/**
 * Listen on provided port, on all network interfaces.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

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

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log(`Listening on ${bind}`);
}

server.listen(process.env.PORT);
server.on('error', onError);
server.on('listening', onListening);

// -----------------------------

//socket initialization
appSocket(server);

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://happy-heyrovsky-5a1d90.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/request', requestRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/message', messageRouter);
app.use('/payment', paymentRouter);
app.use('/review', reviewRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
