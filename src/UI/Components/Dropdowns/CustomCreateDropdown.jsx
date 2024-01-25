import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosArrowDropdown, IoIosArrowDropup } from "Web_React_Icons/io"
import { CustomCreateInput } from '../Forms';
import { userModificationValidation, customerModificationValidation } from '../../utils/validations';
import { MdCreateNewFolder } from "Web_React_Icons/md";
import { GiCancel } from "Web_React_Icons/gi";
import { postCreateCustomer, postCreateSystemUser } from '../../../Application/Axios/post';
import { MainContext } from '../../../Infrastructure';

export default function ({ type }) {
    const [mainContext, setMainContext] = useContext(MainContext)
    const [showDropdown, setShowDropdown] = useState(false)
    let yupValidationSchema = {
        validationFunction: null,
        values: null
    };

    if (type === 'Users') {
        yupValidationSchema = {
            validationFunction: userModificationValidation(),
            values: userModificationValidation()._nodes,
            functionPost: postCreateSystemUser
        }
    }
    if (type === 'Customers') {
        yupValidationSchema = {
            validationFunction: customerModificationValidation(),
            values: customerModificationValidation()._nodes,
            functionPost: postCreateCustomer
        }
    }

    console.log(yupValidationSchema, type);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(yupValidationSchema.validationFunction)
    });

    const handleSubmitForm = (data, e) => {
        console.log(data, errors);

        const modifiedArray = Object.keys(data).reduce((prev, next) => {
            prev[next] = next === 'state' ? data[next] === 'Active' : data[next];
            return prev;
        }, {});

        console.log(modifiedArray);

        const funcPostUpdateSystemUser = async () => await yupValidationSchema.functionPost({
            data: modifiedArray,
            id: {
                idRequester: mainContext.user?.info?.id,
            },
            context: { mainContext, setMainContext }
        }).then(data => {
            if (data?.error)
                console.log("\\\\\\\\\\\\ create PETICION EXITOSA", data);
            else {
                reset()
                setTimeout(() => {
                    setMainContext((prevState => ({
                        ...prevState,
                        reload: true
                    })))
                }, 3000);
            }

        })

        funcPostUpdateSystemUser()



    }

    const changeDropdown = () => {
        console.log('aaaaaaaaaaaaaaaaaaa');
        reset()
        setShowDropdown((prevState) => !prevState)
    }

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white mt-[3rem]"
                }
            >
                <div onClick={() => changeDropdown()} className="rounded-t mb-0 px-4 py-3 border-0 cursor-pointer">
                    <div className="flex flex-wrap items-center">
                        <div className="flex justify-between relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-md text-blueGray-700 uppercase"
                                }
                            >
                                Create {type}
                            </h3>
                            <div>
                                {
                                    showDropdown
                                        ? <IoIosArrowDropup style={{ width: '2rem', height: '2rem' }} />
                                        : <IoIosArrowDropdown style={{ width: '2rem', height: '2rem' }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${showDropdown ? 'h-[100%] px-4 py-3' : 'h-[0rem] px-0 py-0'} w-full overflow-x-auto ease-linear transition-all duration-350 flex flex-col-reverse lg:flex-row justify-between items-center`}>
                    <form id={`${type}-form`} onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col lg:flex-row w-[88%] lg:w-[100%] mt-[2.3rem] lg:mt-0 flex-wrap justify-around'>
                        {
                            yupValidationSchema.values.map((inputValue) => {
                                return (<CustomCreateInput key={inputValue} id={inputValue} errors={errors} register={register} text={inputValue} />)
                            })
                        }
                    </form>
                    <div className='w-[100%] lg:w-[12%] bg-slate-500 flex flex-row lg:flex-col justify-around items-center p-[0.5rem] ease-linear transition-all duration-350 h-[5rem] lg:h-[12rem]'>
                        <button
                            className="flex content-center justify-center items-center bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-[8px] py-[7px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-[1%] w-[45%] lg:w-[88%]"
                            type="submit"
                            onClick={(e) => { e.preventDefault(); handleSubmit(handleSubmitForm)() }}
                        >
                            <MdCreateNewFolder style={{ width: '2rem', height: '2rem' }} />
                        </button>
                        <button
                            className="flex content-center justify-center items-center bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-[8px] py-[7px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-[1%] w-[45%] lg:w-[88%]"
                            type="button"
                            onClick={(e) => { e.preventDefault(); reset() }}
                        >
                            <GiCancel style={{ width: '2rem', height: '2rem', color: 'black' }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}