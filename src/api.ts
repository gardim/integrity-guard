import createApp from './config/index';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import routes from './routes';
import swaggerSpec from '../swagger';

const app: Application = createApp();
const port: number = app.get('port') as number;

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
