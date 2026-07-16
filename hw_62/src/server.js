import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'pug');
app.use(express.json());

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Головна сторінка</h1><p><a href="/users">Користувачі (Pug)</a></p><p><a href="/articles">Статті (EJS)</a></p>');
});

app.listen(port, () => {
    console.log(`Сервер запущено за адресою http://localhost:${port}`);
});