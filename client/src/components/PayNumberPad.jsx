import Delete from '../assets/svg/delete-black.svg';

export const PayNumberPad = () => {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0]

    return (
        <div className="flex flex-wrap justify-center text-black w-full gap-x-3 gap-y-3 p-5">
            {numbers.map((number) => (
                <button key={number} className="text-center font-thin text-4xl bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-gray-100">
                    {number}
                </button>
            ))}
            <button className="w-1/4 text-center bg-white shadow-md w-32 h-32 text-2xl hover:shadow-lg active:bg-gray-100">
                    <img className='w-12 h-12 ml-[28%]' src={Delete} alt="" />
            </button>
        </div>
    )
}