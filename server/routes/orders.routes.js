const Router = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const Order = require('../models/Order');

const router = new Router();

router.get('/orders/:restaurantId', authMiddleware, async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const orders = await Order.find({ restaurant: restaurantId, waiter: req.user._id });
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

router.put('/orders/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { orderId } = req.body;

            const order = await Order.findOneAndUpdate(
                { restaurant: restaurantId, _id: orderId, isOpen: true },
                { isOpen: false },
                { new: true }
            );

            await order.save();

            return res.json({ message: "Замовлення закрито" });

        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);


module.exports = router;