const Router = require('express');

// const authMiddleware = require('../middlewares/auth.middleware');
const Order = require('../models/Order');

const router = new Router();

router.get('/orders/:restaurantId',
    async (req, res) => {
        try {
            const {restaurantId} = req.params;
            const orders = await Order.find({ restaurant: restaurantId });
            return res.json({ orders })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

    router.post('/orders/:restaurantId',
    async (req, res) => {
        try {
            const {restaurantId} = req.params;
            const {order} = req.body;

            const newOrder = new Order({
                restaurant: restaurantId,
                ...order
            });

            await newOrder.save();

            return res.json({newOrder});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);


module.exports = router;