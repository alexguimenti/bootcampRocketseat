import express from 'express';
import routes from './routes';
import 'reflect-metadata';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);


app.get('/', (request, response) => {
  return response.json({ message: "Hello World!!!" });
})

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333')
})