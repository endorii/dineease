import { useNavigate } from "react-router-dom"
import Left from '../../assets/svg/angle-left.svg';

export const GoBackButton = () => {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className="absolute flex flex-row items-center top-3 left-3 text-center shadow-lg bg-white rounded-lg text-lg px-5 py-1 hover:bg-gray-100 font-medium transition ease-out hover:ease-in
        sm:top-5 sm:left-5
        md:top-10 md: left-10">
            <img className="w-12" src={Left} alt="" />
            Повернутися назад
        </button>
    )
}