import jwt from 'jsonwebtoken';

const JWT_SECRET = 'super-secret-key-123';

export const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Доступ заборонено. Будь ласка, увійдіть в систему.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(403).send('Невалідний або застарілий токен. Увійдіть знову.');
    }
}