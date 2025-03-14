import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import itemsRoute from './routes/itemsRoute.js';

dotenv.config();

//creating express server
const app = express();

//Resolve the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configure view engine(EJS) and set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware for parsing form data and serving static files
app.use(express.urlencoded( { extended: true} ));
app.use(express.static('public'));

app.use('/', itemsRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Listening on ${process.env.SERVER_PORT || 3000}`);
})
