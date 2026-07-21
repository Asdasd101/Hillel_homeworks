import { ObjectId } from 'mongodb';

export const getUsers = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('users').find({}).project({ password: 0 }).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getUserCursor = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const cursor = db.collection('users').find({}).project({ username: 1, role: 1 });
        
        res.setHeader('Content-Type', 'application/json');
        res.write('[');
        
        let isFirst = true;
        for await (const user of cursor) {
            if (!isFirst) {
                res.write(',');
            }
            res.write(JSON.stringify(user));
            isFirst = false;
        }
        
        res.write(']');
        res.end();
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).send('Помилка обробки курсором: ' + err.message);
        }
    }
};

export const getUserStats = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const stats = await db.collection('users').aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 },
                    usernames: { $push: "$username" }
                }
            },
            {
                $project: {
                    role: "$_id",
                    count: 1,
                    usernames: 1,
                    _id: 0
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        res.json({
            success: true,
            timestamp: new Date(),
            data: stats
        });
    } catch (err) {
        res.status(500).send('Помилка агрегації: ' + err.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const db = req.app.locals.db;
        
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).send('Некоректний формат userId');
        }

        const user = await db.collection('users').findOne(
            { _id: new ObjectId(req.params.userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

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
        
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).send('Некоректний формат userId');
        }

        const { _id, ...updateData } = req.body;

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $set: updateData }
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

        if (update && update._id) {
            delete update._id;
        }

        const result = await db.collection('users').updateMany(filter || {}, { $set: update || {} });
        res.json({ message: 'Документи оновлено', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const replaceUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).send('Некоректний формат userId');
        }

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
        
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).send('Некоректний формат userId');
        }

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