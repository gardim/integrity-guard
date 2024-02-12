import createApp from './config/index';
import { Application } from 'express';
import routes from './routes';

const app: Application = createApp();

const port: number = app.get('port') as number;

app.use('/', routes);

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
