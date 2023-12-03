import { useEffect, useState } from "react";
import Delete from '../assets/svg/delete.svg'


export const NumberPad = () => {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pinInput, setPinInput] = useState('');
    const [open, setOpen] = useState(false);
    const [employee, setEmployee] = useState({});

    const handleClick = (number) => {
        console.log(`Кнопка ${number} натиснута`);
        if (pinInput.length < 4) {
            setPinInput(prevState => prevState + `${number}`);
        }
    }

    const clearPad = () => {
        setPinInput('');
    }

    return (
        <>
            <div className="flex justify-center m-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <input className="w-full h-20 bg-gray-100 text-gray-600 rounded-lg text-center font-bold text-6xl" type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
            </div>

            <div className="flex flex-wrap justify-center text-black gap-y-5 gap-x-10">
                {numbers.map((number) => (
                    <button key={number} onClick={() => handleClick(number)} className="w-1/4 text-center bg-gray-200 w-24 h-24 text-2xl hover:bg-gray-300 rounded-lg">
                        {number}
                    </button>
                ))}
                <button onClick={() => clearPad()} className="w-1/2 text-center bg-red-500 w-24 h-24 text-2xl hover:bg-red-600 rounded-lg">
                    <img className="ml-5 h-12" src={Delete} alt="" />
                </button>
                <button onClick={() => handleClick(0)} className="w-1/2 text-center bg-gray-200 w-24 h-24 text-2xl hover:bg-gray-300 rounded-lg">
                    0
                </button>
                <button onClick={async () => {


                    setOpen(true)

                }} disabled={pinInput.length < 4} className="w-1/2 text-center bg-green-400 text-white w-24 h-24 text-2xl hover:bg-green-500 font-medium disabled:opacity-25 disabled:hover:bg-green-400 rounded-lg">
                    Go
                </button>
            </div>
        </>
    );
}

export default NumberPad;
