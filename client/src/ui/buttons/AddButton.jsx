import Plus from '../../assets/svg/plus.svg' ;

export const AddButton = ({customFunction}) => {
    return (
        <button className="flex items-center bg-teal-600 hover:bg-teal-700 rounded-lg px-7 py-2 text-white font-medium drop-shadow-md transition ease-out hover:ease-in"
            onClick={() => customFunction(true)}
        >Додати
            <img className='w-7 inline pl-2' src={Plus} alt="" />
        </button>
    )
}