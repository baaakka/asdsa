import { Express, Request, Response } from 'express';
import express from 'express';
import * as dotenv from 'dotenv';
import router from './app/router/router';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { TransferListener } from './app/service/contract/contract.service';

dotenv.config();

const app: Express = express();
const port = process.env.port || 3333;

app.use(bodyParser.json()); //* to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    //* to support URL-encoded bodies
    extended: true,
  })
);

app.use(express.static('public'));
app.use(cors());
app.use(logger('dev'));
app.options('*', cors());
app.use(express.json());
app.use(express.static('static'));
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('ok');
});

TransferListener();
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port ?? 3000}`);
});
