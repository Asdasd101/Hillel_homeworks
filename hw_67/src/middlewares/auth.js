export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send('Будь ласка, увійдіть в систему (авторизуйтесь)');
};

export const checkArticlePermissions = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).send('Доступ заборонено. Тільки адміністратори мають право створювати, редагувати або видаляти статті.');
};