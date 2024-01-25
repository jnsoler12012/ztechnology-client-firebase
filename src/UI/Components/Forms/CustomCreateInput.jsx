import React, { useState } from 'react'

export default function CustomCreateInput({ type, text, id, errors, register, defaultValue }) {
    //console.log(errors, (id == 'role' ? ['ADMIN', 'USER'] : ['Active', 'Inactive']).map((option) => <option key={option} id={option} value={option}>{option}</option>));

    const [showPassword, setshowPassword] = useState(false)
    switch (id) {
        case 'state':
        case 'role':
            return (
                <div className="w-full lg:w-2/6 px-3 my-[1rem]">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={id}>
                        {text}
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id={id}
                            defaultValue={defaultValue}
                            {...register(id)}
                        >
                            {
                                (id == 'role' ? ['USER', 'ADMIN'] : ['Active', 'Inactive']).map((option) => {
                                    return (<option key={option} id={option} value={option}>{option}</option>)
                                })
                            }
                        </select>
                    </div>
                    {
                        errors?.[`${id}`]?.type &&
                        <p key={`${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                            {errors?.[`${id}`]?.message}
                        </p>
                    }
                </div>
            )
        case 'phone':
        case 'document':
            return (
                <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0 my-[1rem]">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={id}>
                        {text}
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id={id}
                        type="number"
                        defaultValue={defaultValue}
                        {...register(id)} />
                    {
                        errors?.[`${id}`]?.type &&
                        <p key={`${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                            {errors?.[`${id}`]?.message}
                        </p>
                    }
                </div>
            )
        case 'password':
            return (
                <div className="relative w-full lg:w-1/2 px-3 mb-6 md:mb-0 my-[1rem]">
                    <div className="absolute flex right-4 mt-1.5 items-center ml-2 h-[92%] flex-col-reverse flex-wrap content-center justify-center">
                        <button className="px-1 block focus:outline-none mb-[-8px] lg:mt-[0rem]" onClick={(e) => { e.preventDefault(); setshowPassword(prevState => !prevState) }}>
                            {
                                showPassword
                                    ? (<div>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                                            </path>
                                        </svg>
                                    </div>)
                                    : (<div>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                            </path>
                                        </svg>
                                    </div>)
                            }
                        </button>
                    </div>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={id}>
                        {text}
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id={id}
                        type={showPassword ? 'text' : 'password'}
                        defaultValue={defaultValue}
                        {...register(id)} />
                    {
                        errors?.[`${id}`]?.type &&
                        <p key={`${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                            {errors?.[`${id}`]?.message}
                        </p>
                    }
                </div>
            )
        default:
            return (
                <div className="w-full lg:w-3/6 px-3 mb-6 md:mb-0 my-[1rem]">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={id}>
                        {text}
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id={id}
                        type="text"
                        defaultValue={defaultValue}
                        {...register(id)} />
                    {
                        errors?.[`${id}`]?.type &&
                        <p key={`${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                            {errors?.[`${id}`]?.message}
                        </p>
                    }
                </div>
            )
    }
}