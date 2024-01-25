import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react'
import { userModificationValidation } from '../../utils/validations';
import { useForm } from 'react-hook-form';
import { CustomCreateInput } from '../Forms';
import { FiTool } from "Web_React_Icons/fi";
import { FaXmark } from "Web_React_Icons/fa6";
import { postUpdateSystemUser } from '../../../Application/Axios/post';
import { MainContext } from '../../../Infrastructure';
import { logOut } from '../../../Infrastructure/utils';

export default function ({ user }) {
    const { createdAt, document, email, id, names, role, state } = user
    const [mainContext, setMainContext] = useContext(MainContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(userModificationValidation())
    });

    const [showEditOptions, setShowEditOptions] = useState(false)

    const handleShowEdition = (state) => {
        reset()
        setShowEditOptions(state)
    }

    const handleSubmitForm = (dataForm, e) => {
        console.log(dataForm, errors);

        let cloneData = Object.assign({}, dataForm);

        const userEdited = Object.keys(cloneData).reduce((previous, next) => {
            //console.log(previous, next, next.includes(currentUserEditing));

            console.log(next, cloneData[next]);
            if (next.includes('password'))
                return (cloneData[next] === undefined || cloneData[next] === '*********'
                    ? previous
                    : Object.defineProperty(previous, `${next}`, {
                        value: cloneData[next]
                    }))
            else if (next.includes('role'))
                return Object.defineProperty(previous, `roleId`, {
                    value: cloneData[next]
                })
            else
                return Object.defineProperty(previous, `${next}`, {
                    value: cloneData[next]
                })
        }, {})


        console.log(userEdited);

        (
            async () => await postUpdateSystemUser({
                data: userEdited,
                id: {
                    idRequester: id,
                    idRequired: id
                },
                context: { mainContext, setMainContext }
            }).then(data => {
                console.log("||||||||||||||||||| PETICION HECHA", data);
                if (!data?.error) {
                    console.log(data?.data?.data);
                    setShowEditOptions(false)
                    setTimeout(() => {
                        logOut(setMainContext, 'Info')
                        
                    }, 1600);
                }


            })
        )()
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">

                        <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                        {
                            showEditOptions
                                ? (<button
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase  text-md  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex justify-center items-center"
                                    type="button"
                                    onClick={(e) => handleShowEdition(false)}
                                >
                                    <FaXmark className='w-[1.5rem] h-[1.5rem] mr-3' />
                                    Cancel
                                </button>)
                                : (<button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex justify-center items-center"
                                    type="button"
                                    onClick={(e) => handleShowEdition(true)}
                                >
                                    <FiTool className='w-[1.5rem] h-[1.5rem] mr-3' />
                                    Settings
                                </button>)
                        }

                    </div>
                </div>
                <div className={`flex-auto px-4 lg:px-10 py-10 pt-0 ${showEditOptions ? 'h-auto' : 'h-0'} ease-linear transition-all duration-400 overflow-hidden`}>
                    <form id={`setting-user-form`} onSubmit={handleSubmit(handleSubmitForm)}>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                        </h6>
                        <div className="flex flex-wrap">
                            <CustomCreateInput id={`email`} errors={errors} register={register} text={'Email address'} defaultValue={email} />
                            <CustomCreateInput id={`password`} errors={errors} register={register} text={'Change Password'} defaultValue={'*********'} />
                            <CustomCreateInput id={`names`} errors={errors} register={register} text={'Change Names'} defaultValue={names} />
                            <CustomCreateInput id={`document`} errors={errors} register={register} text={'Change Document'} defaultValue={document} />
                            <CustomCreateInput id={`role`} errors={errors} register={register} text={'Change Role'} defaultValue={role} />
                            <div className='flex justify-center items-center m-[1rem] w-full'>
                                <button className={`bg-emerald-600 active:bg-emerald-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-10 md:h-11 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full text-white`}
                                    type='submit'
                                >
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6 text-[#ffffff] mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M380.44 32H64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32V131.56zM112 176v-64h192v64zm223.91 179.76a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"></path></svg>
                                    Update User
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}