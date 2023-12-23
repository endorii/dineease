const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const PORT = config.get('PORT')
const cors = require('cors');
const authRouter = require('../server/routes/auth.routes');
const restaurantsRouter = require('../server/routes/restaurants.routes');
const orderRoutes = require('../server/routes/orders.routes');
const menuRoutes = require('../server/routes/menu.routes');
const needsRoutes = require('../server/routes/needs.routes');
const feedbackRoutes = require('../server/routes/feedback.routes');
const employeesRoutes = require('../server/routes/employees.routes');

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/", restaurantsRouter);
app.use("/api/", orderRoutes);
app.use("/api/", menuRoutes);
app.use("/api/", needsRoutes);
app.use("/api/", feedbackRoutes);
app.use("/api/", employeesRoutes);

const start = async () => {
    try {
        mongoose.connect(config.get('DBURL'));

        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();