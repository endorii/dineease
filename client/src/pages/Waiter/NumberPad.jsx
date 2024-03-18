import { useState } from "react";
import Delete from '../../assets/svg/delete.svg'
import Enter from '../../assets/svg/enter.svg'
import { useDispatch } from "react-redux";
import { NumPadWelcomeModal } from "./NumPadWeclomeModal";
import { loginByPin } from "../../actions/user.actions";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const NumberPad = () => {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pinInput, setPinInput] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { restaurantId } = useParams();

    const handleClick = (number) => {
        if (pinInput.length < 4) {
            setPinInput(prevState => prevState + `${number}`);
        }
    }

    const clearPad = () => {
        setPinInput('');
    }

    return (
        <div className="bg-white p-5 rounded-xl shadow-xl">
            <AnimatePresence initial={open}>
                {open && <NumPadWelcomeModal setOpen={setOpen} />}
            </AnimatePresence>

            <div className="">
                <h2 className="text-center text-sky-900 text-3xl font-bold">
                    Введіть пін-код
                </h2>
            </div>

            <div className="">
                <div className="flex justify-center m-5">
                    <input className="w-[270px] h-20 bg-sky-950/5 text-sky-900 rounded-lg text-center font-bold text-6xl" type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
                </div>

                <div className="flex flex-wrap justify-center text-sky-900 gap-3">
                    {numbers.map((number) => (
                        <button key={number} onClick={() => handleClick(number)} className="text-center bg-sky-950/5 w-20 h-20 text-2xl hover:bg-sky-900/10 rounded-lg transition ease-out hover:ease-in active:bg-sky-900 active:text-white active:ease-in-out">
                            {number}
                        </button>
                    ))}
                    <button disabled={!pinInput} onClick={() => clearPad()} className="text-center bg-yellow-700 w-20 h-20 text-2xl hover:bg-yellow-800 rounded-lg disabled:bg-yellow-800/30 transition ease-out hover:ease-in">
                        <img className="ml-5 h-10" src={Delete} alt="" />
                    </button>
                    <button onClick={() => handleClick(0)} className="text-center bg-gray-200 w-20 h-20 text-2xl hover:bg-gray-300 rounded-lg transition ease-out hover:ease-in">
                        0
                    </button>
                    <button onClick={async () => {
                        dispatch(loginByPin(restaurantId, pinInput));
                        setOpen(true)
                    }} disabled={pinInput.length < 4} className="text-center bg-teal-700 text-white w-20 h-20 text-2xl hover:bg-teal-900 font-medium disabled:opacity-25 disabled:hover:bg-teal-900 rounded-lg transition ease-out hover:ease-in">
                        <img className="ml-5 h-10" src={Enter} alt="" />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default NumberPad;
