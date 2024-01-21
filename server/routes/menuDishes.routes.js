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

router.post(`/menuDishes/:restaurantId/:categoryId`,
    async (req, res) => {
        try {
            const {restaurantId, categoryId} = req.params;
            const { dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCategory, dishIngredients, dishLogo } = req.body;

            const dish = await Dish.findOne({ category });
            if (dish) {
                return res.status(400).json({ message: 'Страва вже існує' })
            }

            const configuredDishData = {
                restaurant: restaurantId, 
                category: categoryId, 
                categoryName:  dishCategory,
                name: dishName, 
                price: dishPrice, 
                time: dishTime, 
                amount: dishAmount, 
                weigh: dishWeight, 
                ingredients: dishIngredients, 
                logoPath: dishLogo
            }

            const item = new Dish({configuredDishData})

            await item.save();

            return res.json({ message: 'Страву було додано' });

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    });

module.exports = router;