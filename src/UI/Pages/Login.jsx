import React, { useContext, useEffect } from 'react'
import { CustomInput } from '../Components/Forms'
import { useForm } from 'react-hook-form';
import { loginValidation } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { postLoginUser } from '../../Application/Axios/post';
import { MainContext } from '../../Infrastructure';
import Logo from 'Images/login/logo.png'
import { encode, parseJwt } from '../../Infrastructure/utils';


export default () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidation())
    });

    const [mainContext, setMainContext] = useContext(MainContext)

    useEffect(() => {
        console.log(errors);
        return () => {
            console.log(errors);
        }
    }, [errors])

    const onSubmit = async (sendData) => {
        console.log("Podemos enviar !!!", sendData);
        await postLoginUser({ data: { email: sendData.email, password: sendData.password }, context: { mainContext, setMainContext } })
            .then((res) => {
                console.log("teyteyyeye", res)

                if (res.error)
                    setMainContext((prevState) => ({
                        ...prevState,
                        user: {
                            token: null
                        }
                    }))
                if (res = res.data) {
                    console.log(res);
                    console.log(parseJwt(res.token).exp >= Math.floor(Date.now() / 1000));

                    const userString = Object.entries(res.data.user).map(attr => (`${attr[0]}=${attr[1]},`)).join('');

                    window.localStorage.setItem('user', userString);
                    window.localStorage.setItem('TOKEN', encode(res.token));

                    console.log(window.localStorage.getItem("TOKEN"));
                    setMainContext((prevState) => ({
                        ...prevState,
                        user: {
                            token: window.localStorage.getItem('TOKEN'),
                            info: res.data.user
                        }
                    }))
                }

            })
    };

    return (
        <section className="gradient-form w-[100vw] h-[100vh] top-[0] bottom-[0] z-[-1] absolute bg-neutral-200 dark:bg-neutral-700 lg:text-[1rem] text-[1.2rem]">
            <div className="container h-full w-full p-[1.5rem] lg:p-[4rem] ">
                <div className="g-6 flex h-full w-[92vw] flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div
                            className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap h-auto">

                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">

                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-68"
                                                src={Logo}
                                                alt="logo" />
                                        </div>

                                        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                                            <p className="mb-4 text-center">Please login to your account</p>

                                            <CustomInput values={{ name: "email", errors: errors, register: register }} />

                                            <CustomInput values={{ name: "password", errors: errors, register: register }} />

                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <input
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] cursor-pointer"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                    style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)" }}
                                                    type="submit"
                                                    value={'Log in'} />

                                            </div>
                                        </form>
                                    </div>
                                </div>


                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    style={{ background: "linear-gradient(to right, #2c3e50, #4ca1af)" }}>
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h3 className="mb-6 text-[1.2rem] lg:text-[2rem] font-semibold">
                                            We are more than just a company
                                        </h3>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
