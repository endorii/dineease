const Router = require('express');
const Menu = require('../models/Menu');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get(`/menu/:restaurantId`,
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const menu = await Menu.find({ restaurant: restaurantId })

            return res.json({ menu })

        } catch (e) {
            console.log(e);
            res.send({ message: "Помилка сервера" });
        }
    })

// router.post(`/menu/:restaurantId`,
//     async (req, res) => {
//         try {

//             const { category, logo } = req.body;

//             const candidate = await Menu.findOne({ category });
//             if (candidate) {
//                 return res.status(400).json({ message: 'Невірний запит', errors })
//             }

//             const menuCategory = new Menu({ logo, category })

//             await menuCategory.save();

//             return res.json({ message: 'Категорію меню було додано' });

//         } catch (e) {
//             console.log(e);
//             res.send({ message: "Помилка сервера" });
//         }
//     });

module.exports = router;