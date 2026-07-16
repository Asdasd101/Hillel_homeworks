export const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Помилка автентифікації. Немає заголовка Authorization.');
    }
    next();
};

export const checkArticlePermissions = (req, res, next) => {
    const userRole = req.headers['x-role'];

    if (userRole !== 'admin') {
        return res.status(403).send('Доступ заборонено. Тільки для адміністраторів.');
    }
    next();
};