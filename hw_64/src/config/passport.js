import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password123', name: 'Олександр' }
];

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
        return done(null, false, { message: 'Користувача з таким email не знайдено' });
    }

    if (user.password !== password) {
        return done(null, false, { message: 'Неправильний пароль' });
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = mockUsers.find(u => u.id === id);
    done(null, user);
});

export default passport;