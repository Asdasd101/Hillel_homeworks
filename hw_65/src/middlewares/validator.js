export const validateUserId = (req, res, next) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
        return res.status(400).send('Помилка валідації. ID користувача має бути числом.');
    }
    next();
};

export const validateUserBody = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Помилка валідації. Поля username та password є обов\'язковими.');
    }
    next();
};

export const validateArticleId = (req, res, next) => {
    const { articleId } = req.params;
    if (isNaN(Number(articleId))) {
        return res.status(400).send('Помилка валідації. ID статті має бути числом.');
    }
    next();
};