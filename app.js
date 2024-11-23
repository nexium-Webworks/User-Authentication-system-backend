'use strict';
import './env.js';
import DatabaseConfig from './config/database.js';
import express, { json, urlencoded, raw } from 'express';
import compression from 'compression';
import cors from 'cors';
import logger, { logStream } from './utils/logger.js';
import * as errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();

const APP_PORT =  process.env.PORT || '4000';

app.set('port', APP_PORT);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(errorHandler.bodyParser);
app.use(express.raw({ type: "application/xml"}));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors({credentials:true, origin: true}));


app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.use('/api', routes);

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);

new DatabaseConfig().connection().then(() => {
    app.listen(app.get('port'), () => {
        logger.info('⚡️[Database]: MongoDB Database Connected');
        logger.info(`⚡️[server]: Server is running at http://localhost:${app.get('port')}`);
    });
}).catch((error) => {
    logger.error(error.stack);
    process.exit(1);
})


process.on('unhandledRejection', (err) => {
    logger.error('Unhandled rejection', err);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err);
    process.exit(1);
});

export default app;