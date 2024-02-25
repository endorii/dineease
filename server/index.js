const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = config.get('PORT')
const cors = require('cors');
const authRouter = require('../server/routes/auth.routes');
const restaurantsRouter = require('../server/routes/restaurants.routes');
const orderRoutes = require('../server/routes/orders.routes');
const menuСategoriesRoutes = require('../server/routes/menuCategories.routes');
const menuDishesRoutes = require('./routes/menuDishes.routes');
const needsRoutes = require('../server/routes/needs.routes');
const feedbackRoutes = require('../server/routes/feedback.routes');
const employeesRoutes = require('../server/routes/employees.routes');

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/", restaurantsRouter);
app.use("/api/", orderRoutes);
app.use("/api/", menuСategoriesRoutes);
app.use("/api/", menuDishesRoutes);
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