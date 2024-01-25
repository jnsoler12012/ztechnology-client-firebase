import React from 'react'

export default function ({ values }) {
    const { name, errors, register } = values
    console.log(errors, name)

    return (
        <div className="relative mb-4 z-0" data-te-input-wrapper-init>
            <input
                id={name}
                name={name}
                className="lg:text-[1.3rem] mt-4 mb-4 text-[1.3rem] block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-800 peer"
                placeholder={""}
                {...register(name)}
            />
            <label
                htmlFor={name}
                className="lg:text-[1.3rem] text-[1.3rem] mb-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >{name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            {
               
                errors?.[name]?.type &&
                <p key={name} className="text-red-500 text-base italic">
                    {errors?.[name]?.message}
                </p>
            }
        </div>
    )
}