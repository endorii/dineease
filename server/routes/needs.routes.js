const Router = require('express');

// const authMiddleware = require('../middlewares/auth.middleware');
const Need = require('../models/Need');

const router = new Router();

router.get('/needs/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const needs = await Need.find({ restaurant: restaurantId });
            return res.json({ needs })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

router.post('/needs/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { waiterName, message, time, date, priority } = req.body;
            const need = new Need({ restaurant: restaurantId, waiterName, message, time, date, priority });

            await need.save();

            return res.json({ message: 'Повідомлення було відправлено' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

router.delete('/needs/:restaurantId/:messageId',
    async (req, res) => {
        try {
            const { restaurantId, messageId } = req.params;
            const message = await Need.findOneAndDelete({ restaurant: restaurantId, _id: messageId });

            if (!message) {
                return res.status(404).json({ message: `Message with id ${messageId} not found` });
            }

            return res.json({ message: 'Повідомлення було видалено' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

module.exports = router;