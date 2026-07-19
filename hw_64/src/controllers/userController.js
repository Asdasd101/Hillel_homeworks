const mockUsers = [
    { id: 1, username: 'JohnDoe', role: 'admin' },
    { id: 2, username: 'AliceSmith', role: 'user' },
    { id: 3, username: 'BobJones', role: 'user' }
];

export const getUsers = (req, res) => {
    res.render('users.pug', { users: mockUsers });
};

export const createUser = (req, res) => {
    res.send('Post users route');
};

export const getUserById = (req, res) => {
    const { userId } = req.params;
    const user = mockUsers.find(u => u.id === Number(userId));
    if (!user) {
        return res.status(404).send('Користувача не знайдено');
    }
    res.render('user-detail.pug', { user });
};

export const updateUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Put user by Id route: ${userId}`);
};

export const deleteUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Delete user by Id route: ${userId}`);
};