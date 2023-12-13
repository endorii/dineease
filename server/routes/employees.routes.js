const Router = require('express');

// const authMiddleware = require('../middlewares/auth.middleware');
const Employee = require('../models/Employee');

const router = new Router();

router.get('/employees',
    async (req, res) => {
        try {
            const {restaurantName} = req.query;

            let employees;
            if (restaurantName) {
                employees = await Employee.find({restaurant: restaurantName});
            } else {
                employees = await Employee.find({});
            }

            return res.json({employees});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
);

module.exports = router;