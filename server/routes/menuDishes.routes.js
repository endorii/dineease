const Router = require('express');
const Dish = require('../models/Dish');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get(`/menuDishes/:restaurantId`,
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const menu = await Dish.find({ restaurant: restaurantId })

            return res.json({ menu })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

    router.post(`/menuDishes/:restaurantId`,
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { categoryId, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo } = req.body;

            const dish = await Dish.findOne({ name: dishName });
            if (dish) {
                return res.status(400).json({ message: 'Страва вже існує' })
            }

            const configuredDishData = {
                restaurant: restaurantId,
                category: categoryId,
                categoryName: dishCategory,
                name: dishName,
                price: dishPrice,
                time: dishTime,
                amount: dishAmount,
                weight: dishWeight,
                calories: dishCal,
                ingredients: dishIngredients,
                logoPath: dishLogo
            }

            const item = new Dish(configuredDishData);

            await item.save();

            return res.json({ message: 'Страву було додано' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    });

router.put(`/menuDishes/:restaurantId/:dishId`,
    async (req, res) => {
        try {
            const { restaurantId, dishId } = req.params;
            const { dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo } = req.body;

            const configuredDishData = {
                restaurant: restaurantId,
                categoryName: dishCategory,
                name: dishName,
                price: dishPrice,
                time: dishTime,
                amount: dishAmount,
                weight: dishWeight,
                calories: dishCal,
                ingredients: dishIngredients,
                logoPath: dishLogo
            }

            const dish = await Dish.findOneAndUpdate({ _id: dishId, restaurant: restaurantId },
                configuredDishData,
                { new: true }
            );

            if (!dish) {
                return res.status(400).json({ message: 'Страву не знайдено!' })
            }

            return res.json({ message: 'Страву було змінено' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    });

router.delete(`/menuDishes/:restaurantId/:dishId`,
    async (req, res) => {
        try {
            const { restaurantId, dishId } = req.params;

            const dish = await Dish.findOneAndDelete({ _id: dishId, restaurant: restaurantId });
            if (!dish) {
                return res.status(400).json({ message: 'Страви не знайдено' })
            };

            return res.json({ message: 'Страву виделенно' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    });

module.exports = router;