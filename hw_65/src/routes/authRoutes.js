import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'super-secret-key-123';

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password === username) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        });

        return res.send('Вхід успішний! Токен збережено в куках.');
    }

    res.status(401).send('Неправильний логін або пароль.');
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Ви вийшли з системи.');
});

export default router;