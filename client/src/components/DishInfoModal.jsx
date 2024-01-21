import Close from '../assets/svg/close.svg';


export const DishInfoModal = ({ setOpenInfo, item }) => {
    return (
        <div className='relative flex items-center m-24 bg-gray-50 w-[70%] rounded-md shadow-xl'>
            <div>
                <img className=' absolute top-2 right-2 w-10 cursor-pointer' onClick={() => { setOpenInfo(false) }} src={Close} alt="" />
            </div>
            <div className="flex justify-center w-full m-5 text-sky-900 gap-10">
                <div className="text-black flex flex-col gap-2 bg-white shadow-lg rounded-md p-[3%]">
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Назва:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.name ? <div>{item.name}</div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Вагу не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Ціна товару:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.price ? <div>{item.price}₴ </div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Ціну не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Вага:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.weight ? <div>{item.weight}.</div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Вагу не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Час приготування:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.time ? <div>{item.time}хв.</div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Час не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 bg-white shadow-lg rounded-md p-[3%] text-black">
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Інгредієнти для приготування:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.ingredients ? item.ingredients.map((ingredient, i) => (
                                <div key={i}>- {ingredient};</div>
                            )) :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Вибачте, інгредієнти не доступні</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">Колорійність:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item.calories ? <div>{item.calories}</div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Калорійність не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-lg text-white mb-2 bg-sky-900 px-10 py-3 rounded-md">ID товару:</div>
                        <div className="flex flex-col justify-start w-full p-2 text-lg gap-1">
                            {item._id ? <div>{item._id}</div> :
                                <div className="flex flex-col justify-center items-center w-full h-auto bg-white m-5 p-[5%]">
                                    <div className="font-medium text-2xl mb-2">Вагу не вказано</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}