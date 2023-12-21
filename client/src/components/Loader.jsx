import Spinner from '../assets/svg/loader.svg';

export const Loader = () => {
    return(
        <div>
            <img className='w-25 h-25' src={Spinner} alt="" />
        </div>
    )
}