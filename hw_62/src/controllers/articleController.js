export const getArticles = (req, res) => {
    res.send('Get articles route');
};

export const createArticle = (req, res) => {
    res.send('Post articles route');
};

export const getArticleById = (req, res) => {
    const { articleId } = req.params;
    res.send(`Get article by Id route: ${articleId}`);
};

export const updateArticle = (req, res) => {
    const { articleId } = req.params;
    res.send(`Put article by Id route: ${articleId}`);
};

export const deleteArticle = (req, res) => {
    const { articleId } = req.params;
    res.send(`Delete article by Id route: ${articleId}`);
};