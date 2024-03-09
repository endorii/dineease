import Spinner from '../../assets/svg/loader.svg';

export const Loader = () => {
    return(
        <div className='flex justify-center items-center w-full h-full'>
            <img className='w-25 h-25' src={Spinner} alt="" />
        </div>
    )
}