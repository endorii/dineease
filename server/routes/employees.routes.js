const Router = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const Employee = require('../models/Employee');

const router = new Router();

router.get('/employees/:restaurantId',
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            let employees;
            if (restaurantId) {
                employees = await Employee.find({ restaurant: restaurantId });
            } else {
                return res.status(400).json({ message: `Робітників не знайдено` })
            }

            return res.json({ employees });

        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);

router.post('/employees', authMiddleware,
    async (req, res) => {
        try {

            const { name, age, restaurantName, experience, position, salary, password, email, pin } = req.body;

            const candidate = await Employee.findOne({
                user: req.user.id,
                $or: [{ pin: pin }, { email: email }]
            });

            if (candidate) {
                return res.status(400).json({ message: `Користувач пін-кодом ${pin} або логіном ${login} вже існує` })
            }

            const employee = new Employee({ user: req.user.id, name, age, restaurant: restaurantName, experience, position, salary, password, email, pin});

            await employee.save();

            return res.json({ message: 'Працівника було додано' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" })
        }
    }
);

router.put('/employees/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const { name, age, restaurantName, experience, position, salary, password, email, pin  } = req.body;

            const updatedEmployee = await Employee.findOneAndUpdate(
                { _id },
                { user: req.user.id, name, age, restaurantName, experience, position, salary, password, email, pin },
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: `Employee with id ${_id} not found` });
            }

            return res.json({ message: "Employee was updated" });
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    });

router.delete('/employees/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;

            const updatedEmployee = await Employee.findOneAndDelete({ _id });

            if (!updatedEmployee) {
                return res.status(404).json({ message: `Employee with id ${_id} not found` });
            }

            return res.json({ message: "Employee was deleted" });
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    });

module.exports = router;