import { addOrdersToRestaurant } from "./actions/orders.actions";

export const getTotalInsideOrderValue = (guests) => {
    let totalValue = 0;

    for (let i = 0; i < guests.length; i++) {
        for (let j = 0; j < guests[i].guest.length; j++) {
            totalValue += guests[i].guest[j].value;
        }
    }
    return totalValue
}

export const getTotalOrderValue = (order) => {
    let totalValue = 0;

    for (let i = 0; i < order.items.length; i++) {
        totalValue += Number(order.items[i].price);
    }

    return totalValue;
}

export const configureOrder = (guests, currentTable) => {
    const now = new Date().toLocaleString();

    const order = {
        items: [...guests],
        openingTime: now,
        tableNumber: currentTable,
    }

    addOrdersToRestaurant({...order});
}