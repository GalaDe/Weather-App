import express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import httpContext from 'express-http-context';
import { RegisterRoutes } from '../generated/routes';
import httpStatusCodes from './utils/http-status-codes';
import { vars } from './utils/variables'



const app = express();


app.get('/', (req, res) => res.send('Server is up and running!'));

app.get(vars.OPENAPI_URL, (req, res) => {
  res.sendFile(`${process.cwd()}/generated/swagger.json`);
});

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(httpContext.middleware);
app.use((req, res, next) => {
  next();
});

RegisterRoutes(app);

try {
  const swaggerDoc = require(`${process.cwd()}/generated/swagger.json`);
  app.use('/swagger/weatherApp', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
} catch (error) {
  console.error(error);
}

// Handling missing routes
app.use((_req, res: express.Response) => {
  res.status(httpStatusCodes.NOT_FOUND).send({
    message: 'Not Found',
  });
});

export default app;
