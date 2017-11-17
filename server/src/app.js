import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';

import index from './routes/index';
import GlobalConfig from './config';

/*
* This is an example of how you would use environment specific configuration,
* that are defined in the config.js as well in the config folder.

    const sessionStore = new MongoDBStore({
      uri: GlobalConfig.session.mongo.uri,
      collection: GlobalConfig.session.mongo.collection
    });
*/

const app = express();
app.use(helmet());
const debug = Debug('server:app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

if (process.env.NODE_ENV === 'production') {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '../../client/build/')));
}

app.use('/s', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // serve index page to support react router in production.
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
  } else {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log(err.message);
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
