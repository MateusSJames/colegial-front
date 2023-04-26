import express  from 'express';

import { InitApplication } from './routes/Init/index'

const app = express();

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(InitApplication)

export { app }