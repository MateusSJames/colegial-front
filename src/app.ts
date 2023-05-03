import express  from 'express';

import { InitApplication } from './routes/Init/index'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(InitApplication)

export { app }