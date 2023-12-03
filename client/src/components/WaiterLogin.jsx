import NumberPad from "./NumberPad";
import { GoBackButton } from '../ui/buttons/GoBackButton';

export const WaiterLogin = () => {

    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 lg:px-8">
            <GoBackButton/>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-gray-600 text-3xl font-bold leading-9 tracking-tight">
                    Введіть пін-код
                </h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <NumberPad />
            </div>
        </div>
    )
}