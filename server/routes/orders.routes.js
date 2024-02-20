const Router = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const Order = require('../models/Order');

const router = new Router();

router.get('/orders/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const orders = await Order.find({ restaurant: restaurantId});
        return res.json({ orders });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/orders/:restaurantId/waiter', authMiddleware, async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const orders = await Order.find({ restaurant: restaurantId, waiter: req.user._id });
        return res.json({ orders });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/orders/:restaurantId/:waiterId', authMiddleware, async (req, res) => {
    try {
        const { restaurantId, waiterId } = req.params;

        const orders = await Order.find({ restaurant: restaurantId, waiter: waiterId });
        return res.json({ orders });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/orders/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { items, date, time, tableNumber, waiterId } = req.body;

            const newOrder = new Order({
                restaurant: restaurantId,
                items,
                date,
                time,
                waiter: waiterId,
                tableNumber
            });

            await newOrder.save();

            return res.json({ message: "Замовлення відправлено" });

        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);

router.put('/orders/:restaurantId/:orderId',
    async (req, res) => {
        try {
            const { restaurantId, orderId } = req.params;

            const order = await Order.findOneAndUpdate(
                { restaurant: restaurantId, _id: orderId, isOpen: true },
                { isOpen: false },
                { new: true }
            );

            return res.json({ message: "Замовлення закрито" });

        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);

router.delete('/orders/:restaurantId/:orderId',
    async (req, res) => {
        try {
            const { restaurantId, orderId} = req.params;

            const order = await Order.findOneAndDelete(
                { restaurant: restaurantId, _id: orderId },
            );

            return res.json({ message: "Замовлення видалено" });

        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);


module.exports = router;