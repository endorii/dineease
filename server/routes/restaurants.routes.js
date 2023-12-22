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

router.post('/restaurants/menu',
    async (req, res) => {
        try {
            const {restaurantName} = req.body;
            const restaurant = await Restaurant.find({name: restaurantName});
            const menu = restaurant[0].menu;
            return res.json({menu});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);

router.post('/restaurants/needs',
    async (req, res) => {
        try {
            const {restaurantName} = req.body;
            const restaurant = await Restaurant.find({name: restaurantName});
            const needs = restaurant[0].needs;
            return res.json({needs});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);

router.post('/restaurants/feedback',
    async (req, res) => {
        try {
            const {restaurantName} = req.body;
            const restaurant = await Restaurant.find({name: restaurantName});
            const feedback = restaurant[0].feedback;
            return res.json({feedback});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);

module.exports = router;
