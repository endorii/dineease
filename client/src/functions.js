import { addOrdersToRestaurant } from "./actions/orders.actions";

export const getTotalInsideOrderValue = (guests) => {
    let totalValue = 0;

    for (let i = 0; i < guests.length; i++) {
        for (let j = 0; j < guests[i].orderInfo.length; j++) {
            totalValue += guests[i].orderInfo[j].price;
        }
    }
    return totalValue
}

export const getTotalOrderValue = (order) => {
    let totalValue = 0;

    for (let i = 0; i < order.items.length; i++) {
        const orderInfoList = order.items[i].orderInfo;

        for (let j = 0; j < orderInfoList.length; j++) {
            totalValue += Number(orderInfoList[j].price);
        }
    }

    return Number(totalValue);
}

export const configureOrder = (restaurantId, guests, currentTable, waiterId) => {
    const now = new Date().toLocaleString();

    const order = {
        items: guests,
        date: now.split(', ')[0],
        time: now.split(', ')[1],
        tableNumber: currentTable,
        waiter: waiterId
    }
    addOrdersToRestaurant(restaurantId, order.items, order.date, order.time, order.tableNumber, order.waiter);
}

export const formatDateString = (inputDate) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const [day, month, year] = inputDate.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return "Сьогодні";
    } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return "Вчора";
    } else {
        return date.toLocaleDateString("uk-UA", { day: "numeric", month: "numeric", year: "numeric" });
    }
};