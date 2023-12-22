const Router = require('express');
const Employee = require('../models/Employee');
// const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// const {check, validationResult} = require('express-validator');

const router = new Router();

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/loginByPass/:restaurantId', 
    async (req, res) => {
        try {

            const {restaurantId} = req.params;
            const {email, password} = req.body;
            const user = await Employee.findOne({email, password, restaurant: restaurantId});

            if (!user) {
                return res.status(404).json({message: 'Користувача не знайдено'})
            }

            const token = jwt.sign({_id: user._id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                message: "Ви успішно увійшли в аккаунт!",
                token,
                employee: user
            })
        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"})
        }
    }
)

router.post('/loginByPin', 
    async (req, res) => {
        try {
            const {pin} = req.body;
            const user = await Employee.findOne({pin});

            if (!user) {
                return res.status(404).json({message: 'Користувача не знайдено'})
            }

            const token = jwt.sign({_id: user._id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                message: "Ви успішно увійшли в аккаунт!",
                token,
                employee: user
            })
        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"})
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await Employee.findOne({_id: req.user._id})

            const token = jwt.sign({_id: user._id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                token,
                employee: user
            })

        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"});
        }
    }
)

module.exports = router;