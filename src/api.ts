import createApp from './config/index';
import { Application } from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../swagger_output.json';

const app: Application = createApp();
const port: number = app.get('port') as number;

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
