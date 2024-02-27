const Router = require('express');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// const {check, validationResult} = require('express-validator');

const router = new Router();

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/loginByPass/:restaurantId',
    async (req, res) => {
        try {

            const { restaurantId } = req.params;
            const { email, password } = req.body;
            const user = await Employee.findOne({ email, password, restaurant: restaurantId });

            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' })
            }

            // const isPasswordEquals = await bcrypt.compare(password, user.password);

            // if (!isPasswordEquals) {
            //     res.send({ message: "Невірний пароль" })
            // }

            user.workingTime.push({
                date: new Date().toLocaleDateString(),
                entries: { start: new Date().toLocaleTimeString(), end: null }
            });

            await user.save();

            const accessToken = jwt.sign({ _id: user._id }, config.get("secretAccessKey"), { expiresIn: "30m" });
            const refreshToken = jwt.sign({ _id: user._id }, config.get("secretRefreshKey"), { expiresIn: "30d" });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів в мілісекундах
                secure: true // Застосовуйте це, якщо ви працюєте з HTTPS
            });

            return res.json({
                message: "Ви успішно увійшли в аккаунт!",
                accessToken,
                refreshToken,
                employee: user
            })
        } catch (e) {
            console.log(e);
            return res.status(500).send({ message: "Помилка сервера" });
        }
    }
)

router.post('/loginByPin/:restaurantId',
    async (req, res) => {
        try {
            const { pin } = req.body;
            const { restaurantId } = req.params;
            const user = await Employee.findOne({ pin, restaurant: restaurantId });

            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' })
            }

            const accessToken = jwt.sign({ _id: user._id }, config.get("secretAccessKey"), { expiresIn: "30m" });
            const refreshToken = jwt.sign({ _id: user._id }, config.get("secretRefreshKey"), { expiresIn: "30d" });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів в мілісекундах
                secure: true // Застосовуйте це, якщо ви працюєте з HTTPS
            });

            return res.json({
                message: "Ви успішно увійшли в аккаунт!",
                accessToken,
                refreshToken,
                employee: user
            })
        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" })
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await Employee.findOne({ _id: req.user._id })

            const accessToken = jwt.sign({ _id: user._id }, config.get("secretAccessKey"), { expiresIn: "30m" });
            const refreshToken = jwt.sign({ _id: user._id }, config.get("secretRefreshKey"), { expiresIn: "30d" });

            return res.json({
                accessToken,
                refreshToken,
                employee: user
            })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    }
)

module.exports = router;