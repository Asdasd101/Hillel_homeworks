import { ObjectId } from 'mongodb';

export const getUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('users').find({}).project({ username: 1, role: 1, _id: 1 }).toArray();
        res.render('users', { title: 'Список користувачів', users });
    } catch (err) {
        res.status(500).send('Помилка при отриманні користувачів: ' + err.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.userId) });
        if (!user) return res.status(404).send('Користувача не знайдено');
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { username, role, password } = req.body;
        
        const result = await db.collection('users').insertOne({ username, role, password });
        res.status(201).json({ message: 'Користувача створено', id: result.insertedId });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createManyUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const usersArray = req.body.users;
        
        if (!Array.isArray(usersArray) || usersArray.length === 0) {
            return res.status(400).send('Надішліть масив користувачів у полі "users"');
        }

        const result = await db.collection('users').insertMany(usersArray);
        res.status(201).json({ message: 'Користувачів створено', insertedIds: result.insertedIds });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $set: req.body }
        );
        res.json({ message: 'Документ оновлено', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const updateManyUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { filter, update } = req.body;

        const result = await db.collection('users').updateMany(filter || {}, { $set: update || {} });
        res.json({ message: 'Документи оновлено', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const replaceUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { username, role, password } = req.body;

        const result = await db.collection('users').replaceOne(
            { _id: new ObjectId(req.params.userId) },
            { username, role, password }
        );
        res.json({ message: 'Документ повністю замінено', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.userId) });
        res.json({ message: 'Користувача видалено', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteManyUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { filter } = req.body;

        const result = await db.collection('users').deleteMany(filter || {});
        res.json({ message: 'Документи видалено', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};