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

router.post('/employees',
    async (req, res) => {
        try {
            const { name, age, restaurantId, experience, position, salary, password, email, pin } = req.body;

            const candidate = await Employee.findOne({ pin: pin });

            if (candidate) {
                return res.status(400).json({ message: `Користувач пін-кодом ${pin} або логіном ${email} вже існує` })
            }

            const employeeData = { name, age, restaurant: restaurantId, experience, position, salary, email };

            if (password) {
                employeeData.password = password;
            }

            if (pin) {
                employeeData.pin = pin;
            }

            const employee = new Employee(employeeData);

            await employee.save();

            return res.json({ message: 'Працівника було додано' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" })
        }
    }
)


router.put('/employees/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const { name, age, restaurantName, experience, position, salary, password, email, pin } = req.body;

            const employeeData = { user: req.user.id, name, age, restaurantName, experience, position, salary, email };

            if (password) {
                employeeData.password = password;
            }

            if (pin) {
                employeeData.pin = pin;
            }

            const updatedEmployee = await Employee.findOneAndUpdate(
                { _id },
                employeeData,
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
    }
)


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

router.put('/employees/:employeeId/updateStartWorkingTime', authMiddleware, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { currentDate, currentTime } = req.body;

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: `Employee with id ${employeeId} not found` });
        }

        employee.workingTime.push({
            date: currentDate,
            entries: { start: currentTime, end: null, servedTablesNumber: 0 }
        });

        await employee.save();

        return res.json({ message: "Employee was updated" });
    } catch (e) {
        console.log(e);
        res.send({ message: "Server error" });
    }
});

router.put('/employees/:employeeId/updateEndWorkingTime', authMiddleware, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { endTime } = req.body;

        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: employeeId, 'workingTime.entries.end': null },
            { 'workingTime.$.entries.end': endTime },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: `Employee with id ${employeeId} not found or end time already set` });
        }

        return res.json({ message: "Employee end time was updated" });
    } catch (e) {
        console.log(e);
        res.send({ message: "Server error" });
    }
});

router.put('/employees/:employeeId/updateWaiterServedTables', async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { startTime } = req.body;

        const employee = await Employee.findOne({ _id: employeeId, 'workingTime.entries.end': null });

        // Перевірте, чи знайдено співробітника
        if (!employee) {
            return res.status(404).json({ message: `Employee with id ${employeeId} not found or end time already set` });
        }
        const currentServedTablesNumber = employee.workingTime[0].servedTablesNumber;

        const updatedWaiterServedTables = await Employee.findOneAndUpdate(
            { _id: employeeId, 'workingTime.entries.end': null },
            { 'workingTime.$.servedTablesNumber': currentServedTablesNumber + 1 },
            { new: true }
        );

        return res.json({ message: "Employee served tables number was updated" });
    } catch (e) {
        console.log(e);
        res.send({ message: "Server error" });
    }
});

module.exports = router;