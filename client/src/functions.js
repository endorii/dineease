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

export const configureOrder = (restaurantId, guests, currentTable) => {
    const now = new Date().toLocaleString();

    const order = {
        items: guests,
        date: now.split(',')[0],
        time: now.split(',')[1],
        tableNumber: currentTable,
    }
    addOrdersToRestaurant(restaurantId, order.items, order.date, order.time, order.tableNumber);
}