import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', { failureMessage: true }), (req, res) => {
    res.send(`Вхід успішний! Вітаємо, ${req.user.name}. Сесію створено`);
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.send('Ви успішно вийшли з системи, сесію видалено');
    });
});

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Доступ заборонено. Цей маршрут захищений. Будь ласка, увійдіть в систему');
};

router.get('/protected', isAuthenticated, (req, res) => {
    res.send(`Ваші дані профілю: Email: ${req.user.email}, Ім'я: ${req.user.name}`);
});

export default router;