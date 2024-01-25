import React, { useEffect, useRef, useState, ComponentProps, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserEdit } from "Web_React_Icons/fa";
import { GiCancel } from "Web_React_Icons/gi";
import { useForceUpdate } from '../../../Infrastructure/utils';
import { postUpdateSystemUser } from '../../../Application/Axios/post';
import { MainContext } from '../../../Infrastructure';
import { CustomCreateDropdown } from '../Dropdowns';
import { emptyTable } from '../../utils/svg';
import { deleteSystemUser } from '../../../Application/Axios/delete';

export default function CardTable({ systemUsers }) {
    const color = "light";
    const { register, handleSubmit, setValue, watch, clearErrors, setError, getValues, reset, formState: { errors } } = useForm({

    });
    const formRef = useRef()
    const [mainContext, setMainContext] = useContext(MainContext)

    const [currentUserEditing, setCurrentUserEditing] = useState(0)

    const forceUpdate = useForceUpdate();
    console.log(mainContext, systemUsers.filter(systemUser => systemUser.id !== parseInt(mainContext.user?.info?.id)));

    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    useEffect(() => {
        console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\actualizamos');
        reset()
    }, [systemUsers])



    const onSubmit = (data, e) => {
        e.preventDefault()
        let cloneData = Object.assign({}, data);

        const userEdited = Object.keys(cloneData).reduce((previous, next) => {
            //console.log(previous, next, next.includes(currentUserEditing));
            if (next.includes(currentUserEditing)) {
                console.log(next, data[next]);
                if (next.includes('password'))
                    return (data[next] === undefined
                        ? previous
                        : Object.defineProperty(previous, `${(next).split('-')[1]}`, {
                            value: data[next]
                        }))
                else if (next.includes('role'))
                    return Object.defineProperty(previous, `roleId`, {
                        value: data[next]
                    })
                else
                    return Object.defineProperty(previous, `${(next).split('-')[1]}`, {
                        value: data[next]
                    })
            }
            return previous

        }, {})
        console.log(data, e, currentUserEditing, cloneData, userEdited);
        const funcPostUpdateSystemUser = async () => await postUpdateSystemUser({
            data: userEdited,
            id: {
                idRequester: mainContext.user?.info?.id,
                idRequired: currentUserEditing
            },
            context: { mainContext, setMainContext }
        }).then(data => {
            console.log("||||||||||||||||||| PETICION HECHA", data);
            if (data?.error) {
                setTimeout(() => {
                    location.reload()
                }, 3000);
                setCurrentUserEditing(0)

            } else {
                setCurrentUserEditing(0)
            }


        })

        funcPostUpdateSystemUser()
    }

    const handleUserDeletion = (idDeleteUser, e) => {
            (
                async () => await deleteSystemUser({
                    data: { idSystemUser: idDeleteUser },
                    userId: {
                        idUserRequester: mainContext.user?.info?.id,
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    if (!data?.error) {
                        setTimeout(() => {
                            setMainContext((prevState => ({
                                ...prevState,
                                reload: true
                            })))
                        }, 3000);
                    }
                })
            )()


    }

    const handleUserEdit = (id) => {
        //console.log("MODIFICAMOS");

        setCurrentUserEditing(prevState => {
            if (prevState)
                return 0
            else
                return id
        })
    }

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Card Tables
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {systemUsers.filter(systemUser => systemUser.id !== parseInt(mainContext.user?.info?.id)).length > 0 ? (
                        <form ref={formRef} id="modify-user-form" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th
                                            className={
                                                "pl-[2rem] align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Role
                                        </th>
                                        <th
                                            className={
                                                "w-[8rem] px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Created at
                                        </th>
                                        <th
                                            className={
                                                "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Name
                                        </th>
                                        <th
                                            className={
                                                "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Document
                                        </th>
                                        <th
                                            className={
                                                "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Email
                                        </th>
                                        <th
                                            className={
                                                "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Password
                                        </th>
                                        <th
                                            className={
                                                "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            State
                                        </th>
                                        <th
                                            className={
                                                "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        systemUsers.filter(systemUser => systemUser.id !== parseInt(mainContext.user?.info?.id)).map((user) => {
                                            let cloneUserAttr = Object.assign({}, user);
                                            cloneUserAttr['role'] = cloneUserAttr?.role?.name

                                            const randomColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')

                                            console.log(errors, cloneUserAttr, user);


                                            let changeState = (e) => {
                                                //console.log(e, e.target.parentElement.children[0], e.target.value === 'true', e.target.value, e.target.copyvalue);
                                                if (e.target.value === true || e.target.value === 'true') {
                                                    console.log('was trueee');
                                                    e.target.parentElement.children[1].classList.replace('bg-green-700', 'bg-rose-300')
                                                    e.target.parentElement.children[1].classList.replace('left-[26px]', 'left-1')
                                                    e.target.value = false
                                                    e.target.defaultValue = false
                                                    setValue(e.target.id, false);
                                                } else {
                                                    e.target.parentElement.children[1].classList.replace('bg-rose-300', 'bg-green-700')
                                                    e.target.parentElement.children[1].classList.replace('left-1', 'left-[26px]')
                                                    e.target.value = true
                                                    e.target.defaultValue = true
                                                    setValue(e.target.id, true);
                                                }
                                                //console.log(e);
                                            }

                                            let changeUserEdition = (e) => {

                                                //console.log("\\\\\\\\\\\\\EDITAMOS", e);
                                            }

                                            let changeRole = (e) => {
                                                //console.log("|||||||||||||ROLE", e);
                                                if (e.target.value === 'ADMIN') {
                                                    e.target.classList.replace('role-button-icon', 'user-button-icon')
                                                    e.target.value = 'USER'
                                                    e.target.defaultValue = 'USER'
                                                    setValue(e.target.id, 'USER');

                                                } else {
                                                    e.target.classList.replace('user-button-icon', 'role-button-icon')
                                                    e.target.value = 'ADMIN'
                                                    e.target.defaultValue = 'ADMIN'
                                                    setValue(e.target.id, 'ADMIN');
                                                }
                                                //console.log(e);
                                            }

                                            let cancelUserEdition = () => {
                                                //console.log('CANCEL', currentUserEditing);

                                                Array.from(formRef.current).forEach((tdElement) => {
                                                    if (tdElement.id.includes(currentUserEditing)) {
                                                        //console.log(tdElement);
                                                        if (tdElement.id.includes('state')) {
                                                            tdElement.parentElement.children[1].classList.remove('bg-green-700'); tdElement.parentElement.children[1].classList.remove('bg-rose-300');
                                                            tdElement.parentElement.children[1].classList.remove('left-1'); tdElement.parentElement.children[1].classList.remove('left-[26px]')

                                                            let defaultValue

                                                            Object.keys(tdElement).forEach((key, index) => {
                                                                //console.log(key, tdElement[key]);
                                                                if (key.includes('reactProps'))
                                                                    defaultValue = (tdElement[key]?.copyvalue == 'true' ? true : false)
                                                            })
                                                            //console.log("STATETETET", tdElement.value, tdElement.checked, tdElement.value, tdElement.defaultChecked, tdElement.__reactProps, defaultValue);
                                                            if (defaultValue == true) {
                                                                tdElement.parentElement.children[1].classList.add('bg-green-700')
                                                                tdElement.parentElement.children[1].classList.add('left-[26px]')
                                                            } else {
                                                                tdElement.parentElement.children[1].classList.add('bg-rose-300')
                                                                tdElement.parentElement.children[1].classList.add('left-1')
                                                            }
                                                            tdElement.value = defaultValue
                                                            tdElement.defaultValue = defaultValue
                                                            setValue(tdElement.id, defaultValue);
                                                        } else if (tdElement.id.includes('role')) {
                                                            tdElement.classList.remove('user-button-icon')
                                                            tdElement.classList.remove('role-button-icon')
                                                            if (cloneUserAttr.role === 'USER') {
                                                                tdElement.classList.add('user-button-icon')
                                                            } else {
                                                                tdElement.classList.add('role-button-icon')
                                                            }
                                                            tdElement.value = tdElement.defaultValue
                                                            tdElement.defaultValue = tdElement.defaultValue
                                                            setValue(tdElement.id, tdElement.defaultValue);
                                                        } else {
                                                            tdElement.value = tdElement.defaultValue
                                                            setValue(tdElement.id, tdElement.defaultValue);
                                                        }
                                                    }

                                                })

                                                clearErrors()
                                                setCurrentUserEditing(0)
                                            }

                                            return (
                                                <tr id={`${user.id}`} key={`User ${user.id}`}>
                                                    <td className="flex items-center border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  h-[3rem]">
                                                        <p style={{
                                                            background: randomColor,
                                                            width: '1rem',
                                                            height: '100%'
                                                        }} className={`flex`}></p>
                                                        <input
                                                            defaultValue={cloneUserAttr.role}
                                                            onClick={(e) => changeRole(e)}
                                                            id={`${user.id}-role`}
                                                            type='button'
                                                            className={`${currentUserEditing == user.id ? "pointer-events-auto" : "pointer-events-auto"} flex content-center justify-center items-center text-white bg-green-500 active:bg-green-600font-bold uppercase text-xs px-[5px] py-[4px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300 ml-[14px]  ${cloneUserAttr.role === 'ADMIN' ? 'role-button-icon' : 'user-button-icon'}`}
                                                            disabled={currentUserEditing == user.id ? false : true}
                                                            {...register(`${user.id}-role`, {
                                                                value: cloneUserAttr.role
                                                            })
                                                            }

                                                        >

                                                            {/* <GrUser style={{ width: '1.2rem', height: '1.2rem', }} /> */}
                                                            {/* <GrUserAdmin style={{ width: '1.2rem', height: '1.2rem',}} /> */}
                                                        </input>
                                                    </td>

                                                    <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4">
                                                        <input
                                                            type="text"
                                                            defaultValue={new Date(cloneUserAttr.createdAt).toDateString()}
                                                            className={`text-[0.75rem] p-[2px] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 w-[7rem] xl:w-[100%]`}
                                                            disabled={true}
                                                        />
                                                        {
                                                            //errors?.['test']?.type  {errors?.['test']?.message}
                                                            errors?.['test']?.type &&
                                                            <p key={'test'} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                                {errors?.['test']?.message}
                                                            </p>
                                                        }
                                                    </td>

                                                    <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4 py-2">
                                                        <input
                                                            id={`${user.id}-names`}
                                                            defaultValue={cloneUserAttr.names}
                                                            copyvalue={cloneUserAttr.names}
                                                            type="text"
                                                            className={`${currentUserEditing == user.id && 'px-1 outline outline-1 outline-[#cfcfcf] '} text-[0.75rem] p-[2px] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 w-[7rem] xl:w-[100%]`}
                                                            disabled={currentUserEditing == user.id ? false : true}
                                                            {...register(`${user.id}-names`, {
                                                                value: cloneUserAttr.names,
                                                                required: "Name is required",
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9\s]{1,20}$/,
                                                                    message: 'Max 20 char with no special'
                                                                },
                                                            })}
                                                        />
                                                        {
                                                            //errors?.['test']?.type  {errors?.['test']?.message}
                                                            errors?.[`${user.id}-names`]?.type &&
                                                            <p key={`${user.id}-names`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                                {errors?.[`${user.id}-names`]?.message}
                                                            </p>
                                                        }
                                                    </td>

                                                    <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-1">
                                                        <input type="text"
                                                            id={`${user.id}-document`}
                                                            defaultValue={cloneUserAttr.document}
                                                            className={`${currentUserEditing == user.id && 'px-1 outline outline-1 outline-[#cfcfcf] '} text-[0.75rem] p-[2px] w-[5rem] xl:w-[100%] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                            disabled={currentUserEditing == user.id ? false : true}
                                                            {...register(`${user.id}-document`, {
                                                                value: cloneUserAttr.document,
                                                                required: "Document is required",
                                                                pattern: {
                                                                    value: /^\d{10}$/,
                                                                    message: 'Doc. only of 10 digits'
                                                                },
                                                            })}
                                                        />
                                                        {
                                                            //errors?.['test']?.type  {errors?.['test']?.message}
                                                            errors?.[`${user.id}-document`]?.type &&
                                                            <p key={`${user.id}-document`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                                {errors?.[`${user.id}-document`]?.message}
                                                            </p>
                                                        }
                                                    </td>
                                                    <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4">
                                                        <input type="text"
                                                            id={`${user.id}-email`}
                                                            defaultValue={cloneUserAttr.email}
                                                            className={`${currentUserEditing == user.id && 'px-1 outline outline-1 outline-[#cfcfcf] '} text-[0.75rem] p-[2px] w-[7rem] xl:w-[100%] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                            disabled={currentUserEditing == user.id ? false : true}
                                                            {...register(`${user.id}-email`, {
                                                                value: cloneUserAttr.email,
                                                                required: "Email is required",
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                                    message: 'Email must be email format'
                                                                },
                                                            })}
                                                        />
                                                        {
                                                            //errors?.['test']?.type  {errors?.['test']?.message}
                                                            errors?.[`${user.id}-email`]?.type &&
                                                            <p key={`${user.id}-email`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                                {errors?.[`${user.id}-email`]?.message}
                                                            </p>
                                                        }
                                                    </td>
                                                    <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4">
                                                        <input
                                                            defaultValue={currentUserEditing == user.id ? "***************" : "***************"}
                                                            id={`${user.id}-password`}
                                                            type={currentUserEditing == user.id ? "text" : "password"}
                                                            className={`${currentUserEditing == user.id && 'px-1 outline outline-1 outline-[#cfcfcf] '} text-[0.75rem] p-[2px] w-[6rem] xl:w-[100%] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                                            disabled={currentUserEditing == user.id ? false : true}
                                                            {...register(`${user.id}-password`, {
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9* ]{1,20}$/,
                                                                    message: 'Password max 20 digis no special'
                                                                },
                                                            }
                                                            )}
                                                        />
                                                        {
                                                            //errors?.['test']?.type  {errors?.['test']?.message}
                                                            errors?.[`${user.id}-password`]?.type &&
                                                            <p key={`${user.id}-password`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                                {errors?.[`${user.id}-password`]?.message}
                                                            </p>
                                                        }
                                                    </td>
                                                    <td className="border-t-0 px-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-0">

                                                        <label htmlFor={`${user.id}-state`} className={`${currentUserEditing == user.id ? 'cursor-pointer ' : ' '}  bg-gray-100 relative w-[50px] h-[24px] rounded-full flex`}>
                                                            <input
                                                                id={`${user.id}-state`}
                                                                copyvalue={cloneUserAttr.state.toString()}
                                                                defaultValue={cloneUserAttr.state.toString()}
                                                                type="text" className='sr-only peer '
                                                                disabled={currentUserEditing == user.id ? false : true}
                                                                onClick={(e) => changeState(e)}
                                                                {...register(`${user.id}-state`, {
                                                                    value: cloneUserAttr.state
                                                                })}
                                                            />
                                                            <span className={`w-[40%] h-[82%]  absolute rounded-full top-[2px] ${cloneUserAttr.state ? 'bg-green-700 left-[26px] ' : 'bg-rose-300 left-1'} transition-all duration-500`}></span>
                                                        </label>
                                                    </td>
                                                    <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-right" >
                                                        {
                                                            currentUserEditing == user.id
                                                                ? (
                                                                    <div id='editOptionTrue' className='flex justify-between items-center'>
                                                                        <input
                                                                            className="flex cursor-pointer content-center justify-center items-center bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-[3px] py-[3px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-1 ok-button-icon"
                                                                            type='submit'
                                                                        >
                                                                            {/* <GiConfirmed style={{ width: '23px', height: '23px' }} /> */}
                                                                        </input>
                                                                        <button
                                                                            className="flex content-center justify-center items-center bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-[3px] py-[3px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-1 w-[29px] h-[29px]"
                                                                            type="button"
                                                                            onClick={() => { cancelUserEdition() }}
                                                                        >
                                                                            <GiCancel style={{ width: '23px', height: '23px' }} />
                                                                        </button>
                                                                        <div className=' h-auto bg-red-300 hover:w-[5rem] hover:fixed hover:right-[34px] [writing-mode:vertical-lr] transform -rotate-180 uppercase text-xs font-bold hover:after:content-["options"] hover:after:block hover:[writing-mode:horizontal-tb] hover:-rotate-0 hover:text-center hover:bg-red-400 hover:font-bold cursor-pointer'
                                                                            onClick={(e) => handleUserDeletion(user.id, e)}
                                                                        >
                                                                            delete
                                                                        </div>
                                                                    </div>

                                                                ) : (
                                                                    <button
                                                                        className="flex content-center justify-center items-center bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-[8px] py-[7px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-4"
                                                                        type="button"
                                                                        onClick={() => { handleUserEdit(user.id) }}
                                                                    >
                                                                        <FaUserEdit style={{ width: '1rem', marginRight: '7px' }} />
                                                                        Settings
                                                                    </button>
                                                                )
                                                        }

                                                    </td>
                                                </tr>
                                            )
                                        })}


                                </tbody>

                            </table>
                        </form>

                    ) : (
                        <div className='flex h-[13rem] items-center flex-col justify-center'>
                            {emptyTable}
                            <h3>Empty table</h3>
                        </div>
                    )}

                </div>
            </div >

            <CustomCreateDropdown type='Users' />
        </>
    )
}