app.get('/set-theme/:theme', (req, res) => {
    const { theme } = req.params;

    res.cookie('theme', theme, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: false
    });

    res.send(`Тему змінено на: ${theme}`);
});