import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passport from './config/passport.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

app.use(session({
    secret: 'my-super-secret-session-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/set-theme/:theme', (req, res) => {
    const { theme } = req.params;

    if (theme !== 'light' && theme !== 'dark') {
        return res.status(400).send('Доступні теми: light або dark');
    }

    res.cookie('theme', theme, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: false
    });

    res.send(`Тему успішно змінено на: ${theme}. Поверніться на головну, щоб перевірити.`);
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

app.get('/', (req, res) => {
    const currentTheme = req.cookies.theme || 'light';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Головна сторінка</title>
            <link rel="icon" href="/favicon.ico">
            <link rel="stylesheet" href="/style.css">
            <style>
                body {
                    background-color: ${currentTheme === 'dark' ? '#1a202c' : '#f0f2f5'};
                    color: ${currentTheme === 'dark' ? '#f7fafc' : '#333'};
                }
                .container {
                    background-color: ${currentTheme === 'dark' ? '#2d3748' : '#ffffff'};
                    border-color: ${currentTheme === 'dark' ? '#4a5568' : '#ccc'};
                }
                a { color: ${currentTheme === 'dark' ? '#63b3ed' : '#0066cc'}; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Ласкаво просимо!</h1>
                <p>Поточна тема сайту: <strong>${currentTheme.toUpperCase()}</strong></p>
                
                <div style="margin: 15px 0;">
                    <a href="/set-theme/light" style="margin-right: 15px;">☀️ Світла тема</a>
                    <a href="/set-theme/dark">🌙 Темна тема</a>
                </div>
                <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;">
                
                <h3>Розділи сайту:</h3>
                <p><a href="/users">Переглянути користувачів (Pug)</a></p>
                <p><a href="/articles">Переглянути статті (EJS)</a></p>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Сервер запущено за адресою http://localhost:${port}`);
});