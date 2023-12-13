const Router = require('express');

// const authMiddleware = require('../middlewares/auth.middleware');
const Restaurant = require('../models/Restaurant');

const router = new Router();

router.get('/restaurants',
    async (req, res) => {
        try {
            const restaurants = await Restaurant.find({});

            return res.json({restaurants});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);

module.exports = router;
