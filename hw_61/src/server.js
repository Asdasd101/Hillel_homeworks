import express from 'express';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Get root route');
});

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.listen(port, () => {
    console.log(`Сервер запущено за адресою http://localhost:${port}`);
});