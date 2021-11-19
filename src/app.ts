import * as dotenv from "dotenv"
import "module-alias/register";
import createHttpError from "http-errors";
import express, {NextFunction, Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan"
import helmet from "helmet"
import historyApiFallback from "connect-history-api-fallback";

const app = express()
dotenv.config()

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(historyApiFallback());
app.use(express.static('./client/dist'));

// API endpoints
app.use('/api', require('./routes/api'));

app.get("/*", function (req: Request, res: Response) {
  return res.sendFile("./client/public/index.html");
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

export = app;
