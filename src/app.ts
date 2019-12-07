import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// utils
import sequelize from './util/database';
// middlewares
import i18 from './middlewares/i18';
// routes
import routes from './routes';

const PORT: string | number = process.env.PORT || 7000;
const app: Application = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(i18);
app.use(process.env.API_VERSION_PATH + '/', routes);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 404;
  const message = error.message;
  const data = error.data;
  
  res.status(status).json({ message: message, data: data });
});

sequelize
// .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log('Server is running'));
  })
  .catch((err: Error) => console.log(err));