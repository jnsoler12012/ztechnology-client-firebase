import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaTrashAlt } from "Web_React_Icons/fa";
import { TbShoppingBag } from "Web_React_Icons/tb";
import { HiMiniXMark } from "Web_React_Icons/hi2";
import { MainContext } from '../../../Infrastructure';
import { useWindowsDimensions } from '../../../Infrastructure/utils';
import { postCreateQuote, postUpdateQuote } from '../../../Application/Axios/post';
import { deleteQuote } from '../../../Application/Axios/delete';

export default function ({ id }) {

    const { register, handleSubmit, reset, watch, getValues, setValue, setError, formState: { errors } } = useForm({});
    const { height, width } = useWindowsDimensions();

    const [mainContext, setMainContext] = useContext(MainContext)
    const { currentQuote: { showed, quoteData, state } } = mainContext
    console.log(showed, quoteData, state);

    const mapper = Object.values(quoteData.products.reduce((acc, val) => {
        acc[val] = { value: val, counter: (acc[val]?.counter || 0) + 1 };
        return acc;
    }, {}))



    useEffect(() => {
        //console.log(width, 'CAMBVIO SIZE');
        if (showed && width <= 768) {
            //console.log('|||||||||||||||||||||||| CAMBIAREMOS');
            setMainContext(prevState => ({
                ...prevState,
                currentQuote: {
                    ...prevState.currentQuote,
                    showed: false
                }
            }))
            reset()
        }
    }, [width])

    useEffect(() => {
        console.log('\\\\\\\\\\\\\\\\\\\\\\\\A CAMBIADO LA QUOTE ACA', showed, quoteData, state);
        const formatedQuoteData = Object.keys(quoteData).reduce((prev, nextAttr) => {
            console.log(prev);
            Object.defineProperty(prev, `${nextAttr}-${id}`, {
                value: quoteData[nextAttr],
                enumerable: true,
                writable: true
            })
            return prev
        }, {})
        console.log(formatedQuoteData);
        reset(formatedQuoteData)
    }, [state, quoteData])

    const cancelModifyQuote = () => {
        setMainContext(prevState => ({
            ...prevState,
            currentQuote: {
                state: 'create',
                quoteData: {
                    id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
                    state: 'Created',
                    discountType: 'Standard',
                    discount: 0,
                    description: null,
                    customer: null,
                    deliveryType: 'Standard',
                    products: [],
                    user: mainContext.user.info
                },
                showed: false
            }
        }))
    }

    const deleteProductFromQuote = (nameProduct) => {

        console.log('|||||||||||||||||||||||| delete ', nameProduct, quoteData.products);

        console.log([...quoteData.products.filter((value) => value.name !== nameProduct)]);

        setMainContext(prevState => ({
            ...prevState,
            currentQuote: {
                ...prevState.currentQuote,
                quoteData: {
                    ...prevState.currentQuote.quoteData,
                    products: [...quoteData.products.filter((value) => value.name !== nameProduct)]
                },
            }
        }))
    }

    const funcShowHideCart = (e) => {

        const idClick = e.target.id
        console.log(e.target.id, e, "DOS VECES");

        if (idClick == 'quote-icon' || e.target?.nearestViewportElement?.id == 'quote-icon') {
            console.log('ICOCJNCONCONCO');
            setMainContext(prevState => ({
                ...prevState,
                currentQuote: {
                    ...prevState.currentQuote,
                    showed: true
                }
            }))
        } else {
            if (idClick == `cart-container-${id}` || idClick == `quote-close-${id}` || e.target?.nearestViewportElement?.id == `quote-close-${id}`) {
                console.log('LETS CLOSEEE');
                setMainContext(prevState => ({
                    ...prevState,
                    currentQuote: {
                        ...prevState.currentQuote,
                        showed: false
                    }
                }))
            }
            //console.log('NOTHING');
            //setShowCart(false)
        }
    }

    const getValueSubTotal = () => {
        //console.log(watch(`products-${id}`), watch(`discount-${id}`), watch(`discountType-${id}`), errors);
        const productsOnQuote = watch(`products-${id}`)
        let valueDiscount = 0


        let totalValueQuote = 0
        if (Object.keys(errors).length == 0) {
            if (productsOnQuote) {
                const totalValueProducts = productsOnQuote.reduce((total, nextProduct) => {
                    return total += (nextProduct.price * nextProduct.counter)
                }, 0)
                totalValueQuote += totalValueProducts
                //totalValueQuote += deliveryAmount
                //console.log(watch(`products-${id}`), watch(`discount-${id}`), totalValueProducts);

                if (watch(`discountType-${id}`) == 'Standard')
                    valueDiscount = parseInt(watch(`discount-${id}`))
                else
                    valueDiscount = parseInt(totalValueQuote) * (parseInt(watch(`discount-${id}`)) / 100)


                totalValueQuote -= valueDiscount
                return totalValueQuote
            }
        } else {
            return (-9999)
        }
    }

    const getValueTotal = () => {
        //console.log((watch(`products-${id}`)), watch(`discount-${id}`), errors);
        const productsOnQuote = watch(`products-${id}`)
        const deliveryAmount = watch(`deliveryType-${id}`) == 'Standard' ? 10 : (watch(`deliveryType-${id}`) == 'Paid') ? 15 : 25

        let totalValueQuote = 0
        let valueDiscount = 0


        if (Object.keys(errors).length == 0) {
            if (productsOnQuote) {
                const totalValueProducts = productsOnQuote.reduce((total, nextProduct) => {
                    return total += (nextProduct.price * nextProduct.counter)
                }, 0)
                totalValueQuote += totalValueProducts

                if (watch(`discountType-${id}`) == 'Standard')
                    valueDiscount = parseInt(watch(`discount-${id}`))
                else
                    valueDiscount = parseInt(totalValueQuote) * (parseInt(watch(`discount-${id}`)) / 100)

                totalValueQuote -= valueDiscount

                totalValueQuote += deliveryAmount
                return totalValueQuote
            }
        } else {
            return (-9999)
        }
    }


    const handleSubmitForm = (dataForm, e) => {
        e.preventDefault()
        const eventId = e.nativeEvent.submitter.id
        console.log(dataForm, e, e.nativeEvent.submitter.id, getValueSubTotal(), getValueTotal());


        const dataFormFormated = Object.keys(dataForm).reduce((prev, nextAttr) => {
            if (nextAttr.split('-')[0] == 'products') {
                prev[`${nextAttr.split('-')[0]}`] = dataForm[nextAttr].reduce((prev, nextProduct) => (prev.concat(nextProduct.data)), [])
            } else {
                prev[`${nextAttr.split('-')[0]}`] = dataForm[nextAttr]
            }
            return prev
        }, {})
        console.log(dataFormFormated);
        dataFormFormated['subTotal'] = getValueSubTotal()
        dataFormFormated['total'] = getValueTotal()
        console.log(dataFormFormated);

        if (eventId.includes('submit')) {
            (
                async () => await postCreateQuote({
                    data: dataFormFormated,
                    usersId: {
                        idUserRequester: mainContext.user?.info?.id,
                        emailCustomerRequester: dataFormFormated.email
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||\\\\\\QUOTE||||||||||||||| CREADO HECHA", data);
                    if (!data.error)
                        setTimeout(() => {
                            setMainContext((prevState => ({
                                ...prevState,
                                reload: true,
                                currentQuote: {
                                    state: 'create',
                                    quoteData: {
                                        id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
                                        state: 'Created',
                                        discountType: 'Standard',
                                        discount: 0,
                                        description: null,
                                        customer: null,
                                        deliveryType: 'Standard',
                                        products: [],
                                        user: mainContext.user.info
                                    },
                                    showed: false
                                }
                            })))
                        }, 1600);
                })
            )()
        } else if (eventId.includes('delete')) {
            (
                async () => await deleteQuote({
                    data: { idQuote: dataFormFormated.id },
                    userId: {
                        idUserRequester: mainContext.user?.info?.id,
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||\\\\\\QUOTE DELETED||||||||||||||| DELETED HECHA", data);

                    setTimeout(() => {
                        setMainContext((prevState => ({
                            ...prevState,
                            reload: true,
                            currentQuote: {
                                state: 'create',
                                quoteData: {
                                    id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
                                    state: 'Created',
                                    discountType: 'Standard',
                                    discount: 0,
                                    description: null,
                                    customer: null,
                                    deliveryType: 'Standard',
                                    products: [],
                                    user: mainContext.user.info
                                },
                                showed: false
                            }
                        })))
                    }, 1600);
                })
            )()
        } else if (eventId.includes('modify')) {
            console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ modificamos', dataFormFormated);
            (
                async () => await postUpdateQuote({
                    data: dataFormFormated,
                    originalIdQuote: quoteData?.id,
                    usersId: {
                        idUserRequester: mainContext.user?.info?.id,
                        emailCustomerRequester: dataFormFormated.email
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||\\\\\\QUOTE||||||||||||||| CREADO HECHA", data);
                    if (!data.error)
                        setTimeout(() => {
                            setMainContext((prevState => ({
                                ...prevState,
                                reload: true,
                                currentQuote: {
                                    state: 'create',
                                    quoteData: {
                                        id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
                                        state: 'Created',
                                        discountType: 'Standard',
                                        discount: 0,
                                        description: null,
                                        customer: null,
                                        deliveryType: 'Standard',
                                        products: [],
                                        user: mainContext.user.info
                                    },
                                    showed: false
                                }
                            })))
                        }, 1600);
                })
            )()
        }
    }


    return (
        <>
            <div id={`main-cart-container-${id}`} className='relative md:right-[-11px]  right-0 h-[2.5rem] w-[2.5rem] flex rounded-full bg-[whitesmoke] content-center justify-center items-center border-[#64748bcc] border-2' onClick={(e) => funcShowHideCart(e)}>
                <TbShoppingBag id='quote-icon' style={{ backgroundColor: '#64748b1', height: '2rem', width: '2rem', paddingBottom: '3px', paddingRight: '1px', color: '#575757', pointerEvents: 'auto' }} />

                <div id={`cart-container-${id}`} className={`bg-[#0e0e0e5e] top-0 min-h-[100vh] fixed left-0 ${showed ? 'min-w-[100%]' : 'w-0'} flex flex-row-reverse ease-in-out transition-all duration-700 z-[6]`} onClick={(e) => funcShowHideCart(e)}>
                    <div id={`cart-${id}`} className={`bg-white ${showed ? 'w-[100%] md:w-[56%] lg:w-[35rem] opacity-100' : 'w-[0] opacity-0'} p-[1.8rem] ease-in-out transition-all duration-800 overflow-y-auto h-[100vh]`} >
                        <form id={`form-create-quote-${id}`} onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col justify-between h-full'>

                            <div id={`header-quote-${id}`} className='bg-white flex content-center justify-between items-center mb-[1rem]'>
                                <FaArrowRight id={`quote-close-${id}`} style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} />
                                <h4 className='font-[700] text-[22px] uppercase'>
                                    {
                                        state == 'modify' ? 'Modify ' : 'Create '
                                    }
                                    quote
                                </h4>
                                {
                                    state == 'modify' && (
                                        <div className='flex uppercase bg-red-600 p-[5px] text-[white] font-bold cursor-pointer' onClick={(e) => { e.preventDefault(); cancelModifyQuote() }}>
                                            <HiMiniXMark id={`quote-cancel-modify-${id}`} style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                                            cancel
                                        </div>
                                    )
                                }
                            </div>
                            <div id={`state-id-quote-${id}`} className='flex justify-between mb-[1rem]'>
                                <div id={`state-quote-div`} className=' w-max flex flex-col items-center justify-between '>

                                    <input
                                        {...register(`state-${id}`, {
                                            value: quoteData?.state,
                                        })}
                                        className={`${watch(`state-${id}`) == 'Created' ? 'bg-yellow-600' : (watch(`state-${id}`) == 'Canceled') ? 'bg-red-600' : 'bg-green-600'} appearance-none block leading-tight focus:outline-none rounded-full w-[2.5rem] h-[2.5rem] text-[#fff0] cursor-pointer`}
                                        id={`state-${id}`}
                                        title={watch(`state-${id}`) == 'Created' ? 'Created quote' : (watch(`state-${id}`) == 'Canceled') ? 'Canceled quote' : 'Completed Quote'}
                                        type="button"
                                        onClick={(e) => {
                                            console.log(e);
                                            if (e.target.value == 'Created')
                                                setValue(`state-${id}`, 'Canceled')
                                            else
                                                if (e.target.value == 'Canceled')
                                                    setValue(`state-${id}`, 'Completed')
                                                else
                                                    setValue(`state-${id}`, 'Created')
                                        }}

                                    />
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={`state-${id}`}>
                                        state
                                    </label>
                                </div>
                                <div id={`id-quote-div`} className=' w-max flex flex-col items-start justify-center'>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" forhtml={'state-quote'}>
                                        ID
                                    </label>
                                    <input className={`border-solid border-[#989898] border-[0.3px]  block w-full bg-white focus:border rounded py-1 px-2 leading-tight focus:outline-none active:bg-white text-md font-medium tracking-wide transition-colors duration-300 text-black`}
                                        placeholder='Quote ID'
                                        id={`id-${id}`}
                                        type="number"
                                        {...register(`id-${id}`, {
                                            value: quoteData?.id,
                                            required: `Quote ID is required`,
                                            pattern: {
                                                value: /^[1-9][0-9]{0,9}$/,
                                                message: 'ID only can be 1 to 10 numbers'
                                            },
                                        })} />
                                    {
                                        errors?.[`id-${id}`]?.type &&
                                        <p key={`id-${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify ml-2">
                                            {errors?.[`${`id-${id}`}`]?.message}
                                        </p>
                                    }
                                </div>

                            </div>
                            <div id='customer-quote' className=' flex h-[auto] flex-col mb-[1rem] items-center'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" forhtml={'state-quote'}>
                                    Email Customer
                                </label>
                                <input className={`border-solid border-[#989898] border-[0.3px]  block w-[80%] bg-white focus:border rounded py-1 px-2 leading-tight focus:outline-none active:bg-white text-md font-medium tracking-wide transition-colors duration-300 text-black`}
                                    placeholder='Email'
                                    id={`email-${id}`}
                                    type="text"
                                    {...register(`email-${id}`, {
                                        value: quoteData.email,
                                        required: `Email is required`,
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Email must be email format'
                                        },
                                    })} />
                                {
                                    errors?.[`email-${id}`]?.type &&
                                    <p key={`email-${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify ml-2">
                                        {errors?.[`${`email-${id}`}`]?.message}
                                    </p>
                                }
                            </div>
                            <div id='products-quote' className=' flex h-[auto] flex-col mb-[1rem] pb-1 pl-1 pr-1'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" forhtml={'state-quote'}>
                                    products
                                </label>
                                <div className=' border-solid border-[1px] border-[black] p-1'  {...register(`products-${id}`, {
                                    value: quoteData.products,
                                })} >
                                    {
                                        quoteData.products.length > 0
                                            ? quoteData.products.map(product => (
                                                <div className='flex flex-row justify-evenly bg-white rounded-md px-2 py-1  border-solid border-[1px] border-[black]'>
                                                    <div className='flex justify-center items-center mr-2'><img src={product.imageSrc} alt={product.name} className='w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] rounded-full' /></div>
                                                    <div className='flex flex-col justify-center items-center mr-3'>
                                                        <label className="block uppercase tracking-wide text-gray-700 text-[.75rem] font-bold" >
                                                            name
                                                        </label>
                                                        <p className='italic text-sm'>{product.name}</p>
                                                    </div>
                                                    <div className='flex flex-col justify-center items-center mr-3'>
                                                        <label className="block uppercase tracking-wide text-gray-700 text-[.75rem] font-bold" >
                                                            type
                                                        </label>
                                                        <p className='italic text-sm'>{product.type}</p>
                                                    </div>
                                                    <div className='flex flex-col justify-center items-center mr-3'>
                                                        <label className="block uppercase tracking-wide text-gray-700 text-[.75rem] font-bold" >
                                                            unit
                                                        </label>
                                                        <p className='italic text-sm'>{
                                                            new Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(product.price)
                                                        }</p>
                                                        <div className='flex'>
                                                            <label className="block uppercase tracking-wide text-gray-700 text-[.75rem] font-bold mr-2" >
                                                                counter
                                                            </label>
                                                            <p className='italic text-sm'>{product.counter}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col justify-center items-center  mr-3'>
                                                        <label className="block uppercase tracking-wide text-gray-700 text-[.75rem] font-bold" >
                                                            total
                                                        </label>
                                                        <p className='italic text-sm'>{
                                                            new Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD',
                                                            }).format(product.price * product.counter)
                                                        }</p>
                                                    </div>
                                                    <div className='flex flex-col justify-center items-center'>
                                                        <div
                                                            className='h-[2rem] w-[2rem] bg-red-600 flex justify-center items-center rounded-sm cursor-pointer'
                                                            onClick={(e) => { e.preventDefault(); deleteProductFromQuote(product.name) }}
                                                        >
                                                            <FaTrashAlt style={{ color: 'white', height: '1.6rem', width: '1.6rem' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            (
                                                <div className='flex flex-row justify-evenly bg-white rounded-md px-2 py-1'>
                                                    No products yet, please add them from products tab
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                            <div id={`description-quote-div-${id}`} className=' flex flex-col mb-[1rem] h-auto'>
                                <label forhtml={`description-quote-${id}`} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" >
                                    description
                                </label>
                                <textarea className={` border-solid border-[#989898] border-[0.3px] block w-auto bg-white focus:border rounded py-1 px-2 focus:outline-none active:bg-white transition-colors duration-300 text-[#595959] text-sm leading-7 lg:leading-[1.85em] m-2 max-h-fit`}
                                    id={`description-quote-${id}`}
                                    placeholder='Quote description'
                                    type="text"
                                    {...register(`description-${id}`, {
                                        value: quoteData?.description,
                                        required: `Description is required`,
                                        pattern: {
                                            value: /^\s*(\w+\s+){3,19}\w+\s*$/,
                                            message: 'Description must be any text - min 4 words, and max 18 words'
                                        },
                                    })} />
                                {
                                    errors?.[`description-${id}`]?.type &&
                                    <p key={`description-${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify ml-3">
                                        {errors?.[`description-${id}`]?.message}
                                    </p>
                                }
                            </div>
                            <div id={`delivery-discount-quote-div`} className='flex flex-row mb-[1rem]'>
                                <div className='flex flex-col justify-start items-center  w-[50%]'>
                                    <label forhtml={`delivery-quote-${id}`} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" >
                                        delivery type
                                    </label>
                                    <select name={`selection-delivery-${id}`} id={`delivery-quote-${id}`}
                                        style={{
                                            "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                        }}
                                        {...register(`deliveryType-${id}`, {
                                            value: quoteData.deliveryType
                                        })}
                                    >
                                        <option value="Premium">Premium</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Standard">Standard</option>
                                    </select>
                                    <label className="text-[#626262] text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-center">
                                        This option for delivery type costs ${watch(`deliveryType-${id}`) == 'Standard' ? '10.00' : (watch(`deliveryType-${id}`) == 'Paid') ? '15.00' : '25.00, and it is delivered the same day'}
                                    </label>
                                </div>
                                <div className='flex flex-col w-[50%]'>
                                    <label forhtml={`discount-${id}`} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2 text-center" >
                                        discount
                                    </label>
                                    <div className='flex flex-col items-end'>

                                        <select name={`discountType-${id}`} id={`discountType-${id}`}
                                            className=' mt-2'
                                            style={{
                                                "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                            }}
                                            defaultValue={'Standard'} {...register(`discountType-${id}`, {
                                                value: quoteData?.discountType
                                            })}
                                        >
                                            <option value="Percentage">Percentage</option>
                                            <option value="Standard">Standard</option>
                                        </select>
                                        <label forhtml={`discountType-${id}`} className="block uppercase tracking-wide text-gray-700 text-[.6rem] font-bold mb-2 ml-2" >
                                            discount type {watch(`products-${id}`)?.reduce((total, nextProduct) => {
                                                return total += (nextProduct.price * nextProduct.counter)
                                            }, 0)}
                                        </label>
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <div className="font-bold text-base md:text-xl xl:text-[22px]">
                                            {watch(`discountType-${id}`) == 'Standard' ? '$-' : '%-'}
                                        </div>&nbsp;<input className={`border-solid border-[#989898] border-[0.3px] block w-[50%] bg-white focus:border rounded py-1 px-2 leading-tight focus:outline-none active:bg-white transition-colors duration-300 text-black font-bold`}
                                            placeholder='00.00'
                                            id={`discount-${id}`}
                                            type="number"
                                            {...register(`discount-${id}`, {
                                                value: quoteData?.discount,
                                                required: `Discount is required`,
                                                validate: {
                                                    custom: (value) => {
                                                        console.log(value);
                                                        if (watch(`discountType-${id}`) == 'Standard') {
                                                            if (value > watch(`products-${id}`)?.reduce((total, nextProduct) => {
                                                                return total += (nextProduct.price * nextProduct.counter)
                                                            }, 0))
                                                                return ('Can`t be more than total value products')
                                                        } else
                                                            if (value > 100)
                                                                return ('Can`t be more than 100%')

                                                    }
                                                },

                                            })} />

                                    </div>
                                    {
                                        errors?.[`discount-${id}`]?.type &&
                                        <p key={`discount-${id}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify ml-3">
                                            {errors?.[`discount-${id}`]?.message}
                                        </p>
                                    }
                                </div>
                            </div>
                            <hr className="mt-4 md:min-w-full" />
                            <div id={`total-quote-div-${id}`} className='bg-slate-200 flex flex-col'>
                                <div className='flex flex-row justify-end items-center w-[100%]'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold" forhtml={`subTotal-${id}`}>
                                        subtotal
                                    </label>
                                    <div className={`block bg-none focus:border rounded py-1 leading-tight focus:outline-none bg-[#fff0] text-xs font-bold  tracking-[.10em] transition-colors duration-300 text-black w-auto  ml-2`}
                                        id={`subTotal-${id}`}
                                        disabled={true}
                                        {...register(`subTotal-${id}`, {
                                            value: getValueSubTotal(),
                                        })}
                                    >
                                        {
                                            new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(getValueSubTotal())
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-row justify-end items-center w-[100%] mt-2'>
                                    <label className="block uppercase tracking-wide text-gray-700 text-md font-bold" forhtml={`total-${id}`}>
                                        total
                                    </label>
                                    <div className={`block bg-none focus:border rounded py-1 leading-tight focus:outline-none bg-[#fff0] text-md font-bold  tracking-[.10em] transition-colors duration-300 text-black w-auto  ml-2`}
                                        id={`total-${id}`}
                                        disabled={true}
                                        {...register(`total-${id}`, {
                                            value: getValueTotal(),
                                        })}
                                    >
                                        {
                                            new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(getValueTotal())
                                        }
                                    </div>
                                </div>
                                <div className='p-2'>
                                    {
                                        state == 'modify'
                                            ? (<div className='flex justify-center items-center'>
                                                <button className={`bg-emerald-600 active:bg-emerald-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-10 md:h-11 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-1/2 text-white mr-3`} disabled=""
                                                    type='submit'
                                                    id={`modify-${id}`}>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6 text-[#ffffff] mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M380.44 32H64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32V131.56zM112 176v-64h192v64zm223.91 179.76a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"></path></svg>
                                                    Modify Quote
                                                </button>
                                                <button className={`bg-red-600 active:bg-red-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-10 md:h-11 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-1/2 text-white`} disabled=""
                                                    type='submit'
                                                    id={`delete-${id}`}>
                                                    <FaTrashAlt style={{ color: 'white', height: '1.3rem', width: '1.3rem', marginRight: '0.75rem' }} />
                                                    Delete Quote
                                                </button>

                                            </div>)
                                            : (
                                                <button className={`bg-emerald-600 active:bg-emerald-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-10 md:h-11 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 w-full text-white`} disabled=""
                                                    type='submit'
                                                    id={`submit-${id}`}>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6 text-[#ffffff] mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M380.44 32H64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32V131.56zM112 176v-64h192v64zm223.91 179.76a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"></path></svg>
                                                    Save Quote
                                                </button>
                                            )
                                    }

                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
            {

            }
            {

                !showed && <div className='flex content-center justify-center flex-wrap md:relative absolute rounded-full bg-[#FF2A2A] h-[22px] w-[22px] md:top-[9px] md:right-[8px] top-[38px] right-[21px] text-[12px] text-white font-[600] select-none'>{quoteData.products.reduce((prev, nextProduct) => prev += nextProduct.counter, 0)}</div>
            }

        </>

    )
}