import Delete from '../../../assets/svg/delete-black.svg';

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
        <div className="flex flex-wrap justify-center text-black w-[250px] gap-x-3 gap-y-3
        sm:
        md:w-[350px]
        lg:w-[450px] lg:px-20
        xl: 
        2xl: 
        ">
            {numbers.map((number) => (
                <button onClick={() => { handlePush(number, selectedPaymentMethod) }} key={number} className="text-center text-white font-thin bg-sky-950/50 shadow-md hover:shadow-lg active:bg-sky-950 transition ease-out hover:ease-in
                sm:text-xl sm:w-16 sm:h-16
                md:text-2xl md:w-20 md:h-20
                lg:text-3xl lg:w-22 lg:h-22
                xl: 
                2xl: 
                ">
                    {number}
                </button>
            ))}
            <button onClick={() => { handleClear(selectedPaymentMethod) }} className="text-center text-white bg-sky-950/50 shadow-md text-2xl hover:shadow-lg active:bg-gray-100 text-center font-thin text-4xl shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-sky-950 active:text-white transition ease-out hover:ease-in
            sm:text-xl sm:w-16 sm:h-16
            md:text-2xl md:w-20 md:h-20
            lg:
            xl: 
            2xl: 
            ">
                CA
            </button>
            <button onClick={() => { handlePush(0, selectedPaymentMethod) }} className="text-center text-white bg-sky-950/50 shadow-m text-2xl hover:shadow-lg active:bg-gray-100 text-center font-thin text-4xl shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-sky-950 active:text-white transition ease-out hover:ease-in
            sm:text-xl sm:w-16 sm:h-16
            md:text-2xl md:w-20 md:h-20
            lg:
            xl: 
            2xl: 
            ">
                0
            </button>
            <button disabled={(cashInputValue + cardInputValue) <= 0} onClick={() => { handleDelete(selectedPaymentMethod) }} className="text-center text-white bg-sky-950/50 shadow-md text-2xl hover:shadow-lg active:bg-yellow-600 transition ease-out hover:ease-in disabled:grayscale disabled:cursor-not-allowed
            sm:text-xl sm:w-16 sm:h-16
            md:text-2xl md:w-20 md:h-20
            lg:
            xl: 
            2xl: 
            ">
                <img className='w-8 ml-[22%]
                sm:
                md:w-10
                lg:w-12
                ' src={Delete} alt="" />
            </button>
        </div>
    )
}