import Delete from '../../assets/svg/delete.svg'
import { Toaster } from 'react-hot-toast';

export const ExitNumberPad = ({ numbers, pinInput, setPinInput }) => {
    const handleClick = (number) => {
        if (pinInput.length < 4) {
            setPinInput(prevState => prevState + `${number}`);
        }
    }

    const clearPad = () => {
        setPinInput('');
    }

    return (
        <div className="bg-white rounded-xl shadow-xl">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="flex justify-center items-center flex-col mb-5 w-full">
                <div className="flex justify-center w-[250px] m-8">
                    <input className="w-full h-14 bg-sky-950/5 text-sky-900 rounded-lg text-center font-bold text-5xl shadow-md" type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
                </div>

                <div className="flex flex-wrap justify-center text-sky-900 gap-2 w-[300px]">
                    {numbers.map((number) => (
                        <button key={number} onClick={() => handleClick(number)} className="text-center bg-sky-950/5 w-20 h-20 text-2xl hover:bg-sky-900/10 rounded-lg transition ease-out hover:ease-in">
                            {number}
                        </button>
                    ))}
                    <button disabled={pinInput === ''} onClick={() => clearPad()} className="text-center bg-yellow-700 w-20 h-20 text-2xl hover:bg-yellow-800 disabled:bg-yellow-800/30 rounded-lg transition ease-out hover:ease-in">
                        <img className="ml-5 h-10" src={Delete} alt="" />
                    </button>
                    <button onClick={() => handleClick(0)} className="text-center bg-sky-950/5 w-20 h-20 text-2xl hover:bg-gray-300 rounded-lg transition ease-out hover:ease-in">
                        0
                    </button>
                    <button className="w-20 h-20 cursor-default"></button>
                </div>
            </div>
        </div>
    );
}
