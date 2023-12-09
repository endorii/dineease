// import { addOrder } from './components/ordersActions';

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

    for (let i = 0; i < order.order.length; i++) {
        for (let j = 0; j < order.order[i].guest.length; j++) {
            totalValue += order.order[i].guest[j].value;
        }
    }
    return totalValue
}

export const configureOrder = (guests, currentTable) => {
    const now = new Date().toLocaleString();

    const order = {
        order: [...guests],
        openingTime: now,
        tableNumber: currentTable
    }
    // addOrder(order);
}