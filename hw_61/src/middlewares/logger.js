export const logRequests = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} запит на ${req.url}`);
    next();
};