const Router = require("express");
const MenuCategory = require("../models/MenuCategory");

const router = new Router();

router.get(`/menuCategories/:restaurantId`, async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menu = await MenuCategory.find({ restaurant: restaurantId });

        return res.json({ menu });
    } catch (e) {
        console.log(e);
        res.send({ message: "Помилка сервера" });
    }
});

router.post(`/menuCategories/:restaurantId`, async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { category, logoPath } = req.body;

        const menuItem = await MenuCategory.findOne({ category });
        if (menuItem) {
            return res.status(400).json({ message: "Категорія з такою назвою вже існує" });
        }

        const menuCategory = new MenuCategory({ restaurant: restaurantId, category, logoPath });

        await menuCategory.save();

        return res.json({ message: "Категорію меню було додано" });
    } catch (e) {
        console.log(e);
        res.send({ message: "Помилка сервера" });
    }
});

module.exports = router;
