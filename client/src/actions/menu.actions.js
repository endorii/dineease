import axios from "axios"

export const getMenuCategoriesByRestaurant = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/menuCategories/${restaurantId}`);
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const addMenuCategory = async (restaurantId, category, logoPath) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/menuCategories/${restaurantId}`, { category, logoPath });
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const addDish = async (restaurantId, categoryId, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/menuDishes/${restaurantId}`, { dishName, categoryId, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo });
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const getMenuDishes = async (restaurantId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/menuDishes/${restaurantId}`);
        return response.data.menu
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const deleteDish = async (restaurantId, dishId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/menuDishes/${restaurantId}/${dishId}`);
        return response.data;
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const editDish = async (restaurantId, dishCategoryId, dishId, dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishIngredients, dishLogo) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/menuDishes/${restaurantId}/${dishId}`, {  dishName, dishPrice, dishTime, dishAmount, dishWeight, dishCal, dishCategory, dishCategoryId, dishIngredients, dishLogo });
        return response.data;
    } catch (e) {
        console.log(e.response.data.message);
    }
}
