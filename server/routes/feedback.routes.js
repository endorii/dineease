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

module.exports = router;