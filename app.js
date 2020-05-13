import express from 'express';
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import apiRouter from "./src/api";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.redirect('/api');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error please try again');
});

module.exports = app;
