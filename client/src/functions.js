import { addOrdersToRestaurant } from "./actions/orders.actions";

export const getTotalInsideOrderValue = (guests) => {
    let totalValue = 0;

    for (let i = 0; i < guests.length; i++) {
        for (let j = 0; j < guests[i].orderInfo.length; j++) {
            totalValue += guests[i].orderInfo[j].price;
        }
    }
    return totalValue;
};

export const getTotalOrderValue = (order) => {
    let totalValue = 0;

    for (let i = 0; i < order.items.length; i++) {
        const orderInfoList = order.items[i].orderInfo;

        for (let j = 0; j < orderInfoList.length; j++) {
            totalValue += Number(orderInfoList[j].price);
        }
    }

    return Number(totalValue);
};

export const configureOrder = (restaurantId, guests, currentTable, waiterId) => {
    const now = new Date().toLocaleString();

    const order = {
        items: guests,
        date: now.split(", ")[0],
        time: now.split(", ")[1],
        tableNumber: currentTable,
        waiter: waiterId,
    };
    addOrdersToRestaurant(
        restaurantId,
        order.items,
        order.date,
        order.time,
        order.tableNumber,
        order.waiter
    );
};

export const formatDateString = (inputDate) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const [day, month, year] = inputDate.split(".").map(Number);
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
        return date.toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    }
};

export const experienceCounter = (experience) => {
    let lastDigit = experience % 10;
    let lastTwoDigits = experience % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${experience} років`;
    } else if (lastDigit === 1) {
        return `${experience} рік`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${experience} роки`;
    } else {
        return `${experience} років`;
    }
};

export const msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const getCurrentOnlineTime = (startTime) => {
    const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
    const now = new Date();
    const start = new Date();
    start.setHours(startHours, startMinutes, startSeconds);

    const result = now - start;

    return msToTime(result);
};

export const tables = [
    { table_id: 1, busy: false, booked: false },
    { table_id: 2, busy: false, booked: false },
    { table_id: 3, busy: false, booked: false },
    { table_id: 4, busy: false, booked: false },
    { table_id: 5, busy: false, booked: false },
    { table_id: 6, busy: false, booked: false },
    { table_id: 7, busy: false, booked: false },
    { table_id: 8, busy: false, booked: false },
    { table_id: 9, busy: false, booked: false },
    { table_id: 10, busy: false, booked: false },
    { table_id: 11, busy: false, booked: false },
    { table_id: 12, busy: false, booked: false },
    { table_id: 13, busy: false, booked: false },
    { table_id: 14, busy: false, booked: false },
    { table_id: 15, busy: false, booked: false },
    { table_id: 16, busy: false, booked: false },
    { table_id: 17, busy: false, booked: false },
    { table_id: 18, busy: false, booked: false },
    { table_id: 19, busy: false, booked: false },
    { table_id: 20, busy: false, booked: false },
    { table_id: 21, busy: false, booked: false },
    { table_id: 22, busy: false, booked: false },
    { table_id: 23, busy: false, booked: false },
    { table_id: 24, busy: false, booked: false },
    { table_id: 25, busy: false, booked: false },
    { table_id: 26, busy: false, booked: false },
    { table_id: 27, busy: false, booked: false },
    { table_id: 28, busy: false, booked: false },
    { table_id: 29, busy: false, booked: false },
    { table_id: 30, busy: false, booked: false },
    { table_id: 31, busy: false, booked: false },
    { table_id: 32, busy: false, booked: false },
    { table_id: 33, busy: false, booked: false },
    { table_id: 34, busy: false, booked: false },
    { table_id: 35, busy: false, booked: false },
    { table_id: 36, busy: false, booked: false },
];

export const dropIn = {
    hidden: {
        opacity: 0,
        y: "-100vh",
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 80,
            stiffness: 600,
        },
    },
    exit: {
        opacity: 0,
        y: "-100vh",
    },
};

export const dropInToLeft = {
    hidden: {
        opacity: 0,
        x: "-100vh",
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 50,
            stiffness: 500,
        },
    },
    exit: {
        opacity: 0,
        x: "-100vh",
    },
};

export const popUp = {
    hidden: {
        opacity: 0,
        // y: '-100vh'
    },
    visible: {
        // y: '0',
        opacity: 1,
        transition: {
            duration: 0.3,
            // type: 'spring',
            // damping: 80,
            // stiffness: 600
        },
    },
    exit: {
        opacity: 0,
        // y: '-100vh'
    },
};

export const accordionAnim = {
    // hidden: {
    //     width: '300px',
    //     // opacity: 0,
    //     // y: '-100vh'
    // },
    visible: {
        // y: '0',
        width: "240px",
        // opacity: 1,
        transition: {
            duration: 0.3,
            // type: 'spring',
            // damping: 80,
            // stiffness: 600
        },
    },
    exit: {
        width: "100px",
        // opacity: 0,
        // y: '-100vh'
    },
};

export const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.01,
            staggerChildren: 0.04,
        },
    },
};

export const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export const setClassesForInputs = (touched, error) => {
    return `bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black  ${
        touched && error ? "border-red-500" : "border-gray-300"
    }`;
};
