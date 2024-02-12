import createApp from './config/index';
import { Application } from 'express';
const app: Application = createApp();

const port: number = app.get('port') as number;

app.use('/', require('./routes').default);

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
