const Router = require('express');
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

router.get('/restaurants/:restaurantId',
    async (req, res) => {
        try {
            const {restaurantId} = req.params;
            const restaurant = await Restaurant.findOne({_id: restaurantId});

            return res.json({restaurant});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);


module.exports = router;
