import Delete from '../assets/svg/delete-black.svg';

export const PayNumberPad = ({ selectedPaymentMethod, setCashInputValue, setCardInputValue, cashInputValue, cardInputValue}) => {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handlePush = (number, paymentMethod) => {
        if (paymentMethod === 'cash') {
            setCashInputValue(prev => String(prev) + String(number))
        } else if (paymentMethod === 'card') {
            setCardInputValue(prev => String(prev) + String(number))
        }
    }

    const handleClear = (paymentMethod) => {
        if (paymentMethod === 'cash') {
            setCashInputValue('0')
        } else if (paymentMethod === 'card') {
            setCardInputValue('0')
        }
    }

    const handleDelete = (paymentMethod) => {
        if (paymentMethod === 'cash') {
            setCashInputValue(prev => prev.slice(0, -1))
        } else if (paymentMethod === 'card') {
            setCardInputValue(prev => prev.slice(0, -1))
        }
    }

    return (
        <div className="flex flex-wrap justify-center text-black w-full gap-x-3 gap-y-3 p-5">
            {numbers.map((number) => (
                <button onClick={() => { handlePush(number, selectedPaymentMethod) }} key={number} className="text-center font-thin text-4xl bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-sky-900 active:text-white transition ease-out hover:ease-in">
                    {number}
                </button>
            ))}
            <button onClick={() => { handleClear(selectedPaymentMethod) }} className="w-1/4 text-center bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-gray-100 text-center font-thin text-4xl bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-sky-900 active:text-white transition ease-out hover:ease-in">
                CA
            </button>
            <button onClick={() => { handlePush(0, selectedPaymentMethod) }} className="w-1/4 text-center bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-gray-100 text-center font-thin text-4xl bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-sky-900 active:text-white transition ease-out hover:ease-in">
                0
            </button>
            <button onClick={() => { handleDelete(selectedPaymentMethod) }} className="w-1/4 text-center bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-yellow-600 transition ease-out hover:ease-in">
                <img className='w-12 h-12 ml-[28%]' src={Delete} alt="" />
            </button>
        </div>
    )
}