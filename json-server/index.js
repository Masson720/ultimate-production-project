const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Middleware для обработки стандартных роутов JSON Server
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Middleware для обработки публичных маршрутов
server.use((req, res, next) => {
    const publicRoutes = ['/register', '/login', '/activityLog'];

    if (publicRoutes.includes(req.path)) {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для регистрации
server.post('/register', (req, res) => {
    try {
        const { user, profile } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        // Генерация id
        const id = String(Math.floor(Math.random() * 10000000));

        // Присваиваем id пользователю и профилю
        const newUser = { ...user, id };
        const newProfile = { ...profile, id };

        // Добавляем пользователя
        db.users = db.users || [];
        db.users.push(newUser);

        // Добавляем профиль
        db.profile = db.profile || [];
        db.profile.push(newProfile);

        // Сохраняем изменения в файл db.json
        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 2));

        return res.status(201).json({ user: newUser, profile: newProfile });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.use(router);

// Запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
