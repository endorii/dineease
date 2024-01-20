const Router = require('express');
const Feedback = require('../models/Feedback');

const router = new Router();

router.get('/feedback/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const feedbacks = await Feedback.find({ restaurant: restaurantId });
            return res.json({ feedbacks })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

router.post('/feedback/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { waiterName, message, time, date } = req.body;
            const feedback = new Feedback({ restaurant: restaurantId, waiterName, message, time, date });

            await feedback.save();

            return res.json({ message: 'Повідомлення було відправлено' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

router.delete('/feedback/:restaurantId/:messageId',
    async (req, res) => {
        try {
            const { restaurantId, messageId } = req.params;
            const message = await Feedback.findOneAndDelete({ restaurant: restaurantId, _id: messageId });

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