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

module.exports = router;