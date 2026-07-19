import { ObjectId } from 'mongodb';

export const getUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('users').find({}).toArray();
        res.render('users', {
            title: 'Список користувачів з MongoDB',
            users: users
        });
    } catch (err) {
        console.error('Помилка при отриманні користувачів з бази даних:', err);
        res.status(500).send('Внутрішня помилка сервера при отриманні даних');
    }
};

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const db = req.app.locals.db;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).send('Некоректний формат унікального ідентифікатора (ID)');
        }

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('Користувача не знайдено в базі даних');
        }

        res.render('user-detail', { user });
    } catch (err) {
        console.error('Помилка при отриманні деталей користувача:', err);
        res.status(500).send('Внутрішня помилка сервера');
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, role, email, password } = req.body;
        const db = req.app.locals.db;

        const newUser = {
            username,
            role: role || 'user',
            email,
            password
        };

        await db.collection('users').insertOne(newUser);
        res.status(201).send('Користувача успішно додано до MongoDB Atlas');
    } catch (err) {
        console.error('Помилка при створенні користувача:', err);
        res.status(500).send('Не вдалося зберегти користувача');
    }
};

export const updateUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Put user by Id route: ${userId}`);
};

export const deleteUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Delete user by Id route: ${userId}`);
};