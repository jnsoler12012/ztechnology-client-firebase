import React, { useContext, useEffect, useState } from 'react'
import { productValidation } from '../../utils/validations';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { default as imagesProducts } from '../../utils/img/product/'
import { IoMdSettings } from "Web_React_Icons/io";
import { HiMiniXMark } from "Web_React_Icons/hi2";
import { postCreateProduct, postUpdateProduct } from '../../../Application/Axios/post';
import { MainContext } from '../../../Infrastructure';

const { cpu } = imagesProducts

export default function ({ product, typeCard, closeDialog }) {

    const { register, handleSubmit, reset, getValues, setValue, setError, formState: { errors } } = useForm({});
    const [mainContext, setMainContext] = useContext(MainContext)
    const { currentQuote: { showed, quoteData, state } } = mainContext

    const [modifyProduct, setModifyProduct] = useState((typeCard == 'Create' ? true : false))
    const [addToQuote, setAddToQuote] = useState((typeCard == 'Modify' ? true : false))
    const [alertCreateMore, setAlertCreateMore] = useState(true)

    const [imageTypeCreate, setImageTypeCreate] = useState('motherboard')

    console.log('##=#=#=#==#=#=#=##==#=#=#=#=#=#=#=#=#=#=#=#=##=#=#=#=#=#=######=#=##==#\=\==\=\=\=\=\=\=\=\asd', quoteData);

    let productInfo

    if (typeCard == 'Create') {
        productInfo = Object.assign({}, product)
        productInfo.name = null
        productInfo.price = null
        productInfo.data = []
        productInfo.description = null
    } else {
        productInfo = Object.assign({}, product)
        console.log(productInfo);
    }


    const formatCounter = (quoteProducts) => {
        console.log(quoteProducts);
        let productOnQuote
        quoteProducts.map(singleProduct => {
            if (singleProduct.name == productInfo.name) {
                console.log(singleProduct);
                productOnQuote = singleProduct
            }
        })
        return (productOnQuote) ? productOnQuote : { counter: 0, data: [] }
    }

    const [onQuoteProductCounter, setOnQuoteProductCounter] = useState(formatCounter(quoteData.products))




    console.log(onQuoteProductCounter);

    const getImage = () => {
        //console.log(imagesProducts, productInfo);
        if (typeCard == 'Create') {
            return (Object.keys(imagesProducts).reduce((prev, keyImage) => {
                if (keyImage == imageTypeCreate)
                    prev.push(imagesProducts[keyImage][Math.floor(Math.random() * imagesProducts[keyImage].length)])
                return prev
            }, []));
        } else
            return productInfo?.imageSource
    }

    const handleSubmitForm = (dataForm, e) => {
        console.log(productInfo);
        console.log(dataForm, e);
        if (typeCard == 'Create') {
            if (dataForm?.counterProduct <= -1)
                alert('If a product is created, please set the quantity on 0 or 1')
            else {
                (
                    async () => await postCreateProduct({
                        data: dataForm,
                        id: {
                            idRequester: mainContext.user?.info?.id,
                        },
                        context: { mainContext, setMainContext }
                    }).then(data => {
                        console.log("||\\\\\\PRODUICT||||||||||||||| CREADO HECHA", data);

                        setTimeout(() => {
                            setMainContext((prevState => ({
                                ...prevState,
                                reload: true
                            })))
                            closeDialog(false)
                        }, 1600);
                    })
                )()
            }
        } else {
            let arrayId = []
            if (productInfo?.data?.length <= 0)
                arrayId.push(productInfo.id)
            else
                arrayId = productInfo?.data.reduce((prev, nextProduct) => {
                    prev.push(nextProduct.id)
                    return prev
                }, [])
            console.log(arrayId);

            (
                async () => await postUpdateProduct({
                    data: {
                        ...dataForm,
                        idsAssociated: arrayId,
                    },
                    id: {
                        idRequired: productInfo.id,
                        idRequester: mainContext.user?.info?.id,
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||||PRODUICT||||||||||||||| PETICION HECHA", data);
                    if (data?.error) {
                        console.log('-------------------------------------------------- ERROROROROR', data);
                    } else {

                        setTimeout(() => {
                            setMainContext((prevState => ({
                                ...prevState,
                                reload: true
                            })))
                            closeDialog(false)
                        }, 1600);
                    }
                })
            )()
        }
    }

    const increaseDecraseAction = (e, action) => {
        e.preventDefault()
        let counterProductValue = getValues('counterProduct')


        if (modifyProduct) {
            if (action == 'decrease') {
                if (counterProductValue == 0) {
                    if (confirm('Current items desired on stock are 0, if you place it on below it again, this product will be deleted of the database')) {
                        console.log('yeyeyeyeyeyeyey');
                        counterProductValue--
                        setValue('counterProduct', counterProductValue)
                    }
                } else if (counterProductValue < 0) {
                    setError('counterProduct', { type: 'custom', message: 'Item will be deleted already, can not decrease anymore' });
                } else {
                    counterProductValue--
                    setValue('counterProduct', counterProductValue)
                }
                console.log();
            } else {
                if (alertCreateMore) {
                    setAlertCreateMore(false)
                    if (confirm('Each time you increase the quantity desired for the new product on stock, it will create a new object with another id on the database')) {

                        counterProductValue++
                        setValue('counterProduct', counterProductValue)
                    }
                } else {
                    counterProductValue++
                    setValue('counterProduct', counterProductValue)
                }

            }
        } else if (addToQuote) {
            console.log('only modify to quote notuing nonoono', action);
            if (action == 'decrease') {
                if (counterProductValue == 0)
                    alert('Product on quote is already 0')
                else
                    setValue('counterProduct', --counterProductValue)
            } else {
                if ((counterProductValue + 1) > productInfo?.data.length)
                    alert('Product on Stock is lower than the requested')
                else
                    setValue('counterProduct', ++counterProductValue)
            }

        }

    }

    const saveProductOnQuote = () => {
        console.log(productInfo, getValues('counterProduct'), productInfo.data.slice(0, getValues('counterProduct')));
        console.log(productInfo.data, onQuoteProductCounter, quoteData, quoteData.products.filter(value => value.name !== productInfo.name));

        const productQuoteFormat = {
            name: productInfo.name,
            description: productInfo.description,
            price: productInfo.price,
            type: productInfo.type,
            imageSrc: productInfo.imageSource,
            counter: getValues('counterProduct')
        }

        if (getValues('counterProduct') > onQuoteProductCounter.counter) {
            console.log(onQuoteProductCounter.data, productInfo.data);
            let newProducts = [...onQuoteProductCounter.data]

            let availableValues = productInfo.data
                .reduce((prev, nextProduct) => { prev.push(nextProduct.id); return prev }, [])
                .filter((value) => !newProducts.includes(value));

            productQuoteFormat['data'] = newProducts.concat(availableValues.slice(0, getValues('counterProduct') - onQuoteProductCounter.counter));
        } else if (getValues('counterProduct') < onQuoteProductCounter.counter) {
            productQuoteFormat['data'] = onQuoteProductCounter.data.slice(0, getValues('counterProduct'));
        } else {
            productQuoteFormat['data'] = onQuoteProductCounter.data
        }

        console.log([...quoteData.products.filter(value => value.name !== productInfo.name), productQuoteFormat]);

        setMainContext(prevState => ({
            ...prevState,
            currentQuote: {
                ...prevState.currentQuote,
                quoteData: {
                    ...prevState.currentQuote.quoteData,
                    products: (getValues('counterProduct') == 0
                    ? [...prevState.currentQuote.quoteData.products.filter((value) => value.name !== productQuoteFormat.name)]
                    : [...prevState.currentQuote.quoteData.products.filter((value) => value.name !== productQuoteFormat.name), productQuoteFormat]
                    ) 
                },
            }
        }))

        alert('Product Added to Quote')

        closeDialog(false)
    }

    const handleModifyProduct = () => {
        console.log('||||||||||||||||| modify product');
        setModifyProduct(prevState => {
            if (prevState) {
                setValue('counterProduct', 0)
                setAlertCreateMore(false)
                reset()
            } else {
                setValue('counterProduct', productInfo?.data.length)
            }

            return !prevState
        })
    }

    const closeWindowProduct = (e) => {

        const idTarget = e.target.id
        //console.log(e.target.id, e);
        if (idTarget == 'product-item-background' || idTarget == 'image-container' || idTarget == 'container-window' || idTarget == 'close-button' || idTarget == 'close-svg' || idTarget == 'close-path')
            closeDialog(false)
        //console.log('||||||||||||||||||||||||||||||||||||SADdsadsa');
    }

    //console.log(cpu);

    return (
        <>
            <div id='product-item-background' className="bg-[#000000c9] fixed inset-0 z-50 overflow-x-hidden overflow-y-auto" role="dialog" aria-modal="true" onClick={(e) => closeWindowProduct(e)}>
                <div className="min-h-screen lg:px-4 text-center" id='main-container'>
                    <div className="fixed inset-0 z-40 cursor-pointer bg-brand-dark/70 opacity-100" id="container-window" aria-hidden="true" data-headlessui-state="open"></div>
                    <span className="h-screen align-middle inline-block" aria-hidden="true">​</span>
                    <div id="image-container" className="bg-[#fad7e600] relative z-50 inline-block p-4 align-middle transition-all transform md:w-auto md:p-6 xl:p-8 ltr:text-left rtl:text-right opacity-100 w-full lg:w-[100%] h-full lg:h-auto overflow-auto">
                        <form id={`form-create`} onSubmit={handleSubmit(handleSubmitForm)} >
                            <div className="relative rounded-md">
                                <div className="bg-white w-[94%] md:w-[600px] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] mx-auto p-[1.6rem] lg:p-0 xl:p-3  rounded-md">
                                    <button id='close-button' aria-label="Close Button" className="bg-slate-600 fixed z-10 inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 transition duration-200 text-brand-dark text-opacity-50 focus:outline-none  hover:text-opacity-100 ltr:right-0.5 rtl:left-0.5 md:ltr:right-2 md:rtl:left-0 lg:ltr:right-7 lg:rtl:left-7 xl:ltr:right-10 xl:rtl:left-10 bg-brand-light lg:bg-transparent rounded-full right-[16px] top-[2px]  md:top-[0.5%] md:right-[1%] lg:top-[3%] lg:right-[2%] xl:top-[4%] xl:right-[2.2%]"
                                        onClick={(e) => closeWindowProduct(e)}
                                    >
                                        <svg id="close-svg" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-xl lg:text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path id="close-path" d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                                        </svg>
                                    </button>
                                    <div className="overflow-hidden">
                                        <div className=" lg:p-8 2xl:p-10  lg:mb-2 2xl:pt-10">
                                            <div className="items-start justify-between lg:flex">
                                                <div className="items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0 lg:w-[49%] xl:w-[56%]">

                                                    <div className="w-full xl:flex xl:flex-row-reverse items-center justify-center">

                                                        <div className="w-full xl:ltr:ml-5 xl:rtl:mr-5 mb-2.5 md:mb-3 border border-border-base overflow-hidden rounded-md relative xl:w-[480px] 2xl:w-[650px]">
                                                            <div className="flex items-center justify-center" style={{ "width": '100%' }}>
                                                                <img alt="Product gallery 1" fetchpriority="high" width="650" height="590" src={getImage()}
                                                                    className='lg:h-[35rem] h-[20rem] mx-auto rounded-lg'
                                                                    style={{ "color": "transparent", "width": "auto" }} />
                                                            </div>
                                                        </div>
                                                        {
                                                            typeCard == 'Modify' && (
                                                                <span className={`absolute flex justify-center content-center items-center top-[1%] left-[5%]  lg:top-[4%] lg:left-[1%]       xl:top-[6%] xl:left-[5%] xl:h-[6%] xl:max-w-[11%]          text-[17px] font-bold bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1 ${!modifyProduct ? 'bg-lightBlue-500 active:bg-lightBlue-600' : 'bg-red-500 active:bg-red-600'}  text-white  uppercase cursor-pointer select-none`}
                                                                    onClick={() => handleModifyProduct()}
                                                                >
                                                                    {
                                                                        modifyProduct
                                                                            ? <><HiMiniXMark style={{ width: '28px', height: '28px' }} /> Cancel</>
                                                                            : (<><IoMdSettings style={{ width: '28px', height: '28px' }} /> Modify</>)
                                                                    }
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="shrink-0 flex flex-col lg:ltr:pl-5 lg:rtl:pr-5 xl:ltr:pl-8 xl:rtl:pr-8 2xl:ltr:pl-10 2xl:rtl:pr-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                                                    <div className="pb-5">
                                                        <h3 className='m-[6px] text-justify font-bold text-[19px] uppercase tracking-[3px]'>{typeCard == 'Create' ? 'Create' : 'Modify'} product</h3>
                                                        <div className="mb-2 md:mb-2.5 block -mt-1.5" role="button">
                                                            <input className={`${modifyProduct ? 'border-solid border-[#989898] border-[0.3px]' : 'border-none'}  block w-full bg-white  focus:bg-[#e8e8e88d] focus:border rounded py-3 px-4 leading-tight focus:outline-none active:bg-white text-lg font-medium transition-colors duration-300 text-black md:text-xl xl:text-2xl`}
                                                                placeholder='Title name'
                                                                defaultValue={productInfo.name}
                                                                id={'name'}
                                                                type="text"
                                                                disabled={modifyProduct ? false : true}
                                                                {...register('name', {
                                                                    value: productInfo.name,
                                                                    required: `Name is required`,
                                                                    pattern: {
                                                                        value: /^[a-zA-Z0-9 ]{5,20}$/,
                                                                        message: 'Name must be string - 5 to 20 string'
                                                                    },
                                                                })} />
                                                            {
                                                                errors?.[`${'name'}`]?.type &&
                                                                <p key={`${'name'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                                                    {errors?.[`${'name'}`]?.message}
                                                                </p>
                                                            }

                                                        </div>
                                                        <div className="flex items-center mt-5 flex-row">
                                                            <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                                                                $
                                                            </div>&nbsp;<input className={` ${modifyProduct ? 'border-solid border-[#989898] border-[0.3px]' : 'border-none'}  appearance-none block w-full bg-white focus:bg-[#e8e8e88d] focus:border rounded py-3 px-2 leading-tight focus:outline-none active:bg-white transition-colors duration-300 text-black font-bold text-base md:text-xl xl:text-[22px] focus:px-1`}
                                                                defaultValue={
                                                                    (Math.round(productInfo?.price * 100) / 100)?.toFixed(2)
                                                                }
                                                                placeholder='000.00'
                                                                id={'price'}
                                                                type="number"
                                                                disabled={modifyProduct ? false : true}
                                                                {...register('price', {
                                                                    value: productInfo?.price,
                                                                    required: `Price is required`,
                                                                    pattern: {
                                                                        value: /^[0-9]{1,10}(\.[0-9]+)?$/,
                                                                        message: 'Price must be number decimal - 1 to 10 digits'
                                                                    },
                                                                })} />
                                                        </div>
                                                        {
                                                            errors?.[`${'price'}`]?.type &&
                                                            <p key={`${'price'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                                                {errors?.[`${'price'}`]?.message}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="mb-2 pt-0.5">
                                                        <h4 className="mb-3 font-normal capitalize text-15px text-black text-opacity-70">On stock product: {productInfo?.data.length}</h4>
                                                        {
                                                            errors?.[`${'counterProduct'}`]?.type &&
                                                            <p key={`${'counterProduct'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                                                {errors?.[`${'counterProduct'}`]?.message}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="pb-2"></div>
                                                    <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                                                        {modifyProduct ? <div>Select new quantity on Stock</div> : <div>Select items for quote</div>}
                                                        <div className="flex items-center justify-between rounded shrink-0 p-1 h-11 md:h-14 bg-[#f3f5f9]">
                                                            <button className="flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-10 !h-10 rounded-full transform scale-80 lg:scale-100 text-brand-dark hover:bg-fill-four ltr:ml-auto rtl:mr-auto" onClick={(e) => increaseDecraseAction(e, 'decrease')}>
                                                                <span className="sr-only">button-minus</span>
                                                                <svg className="transition-all" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="1">
                                                                        <path d="M3.15109 11.8438L10.174 11.8439L11.8264 11.8438L18.8493 11.8439C19.0772 11.8439 19.284 11.7515 19.4335 11.602C19.5831 11.4524 19.6755 11.2455 19.6754 11.0177C19.6755 10.5608 19.3062 10.1915 18.8493 10.1916L11.8264 10.1915L10.1741 10.1915L3.15109 10.1915C2.69427 10.1915 2.32496 10.5608 2.32496 11.0177C2.32486 11.4746 2.69416 11.8439 3.15109 11.8438Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path>
                                                                    </g>
                                                                </svg>
                                                            </button>

                                                            <input className={`  ${modifyProduct ? 'border-solid border-[#989898] border-[0.3px]' : 'border-none'} bg-[#ffffff00] focus:bg-[#ffffff00] focus:border focus:outline-none focus:border-gray-500 duration-300 font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-base md:text-[17px] w-[30%] md:w-20 xl:w-28 `}
                                                                id={'counterProduct'}
                                                                type="number"
                                                                disabled={modifyProduct ? false : true}
                                                                {...register('counterProduct',
                                                                    {
                                                                        value: onQuoteProductCounter.counter
                                                                    })
                                                                } />
                                                            <button className="group flex items-center !h-10 shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none pr- !w-10  rounded-full scale-80 lg:scale-100 text-heading hover:bg-fill-four ltr:mr-auto rtl:ml-auto  justify-center" title=""
                                                                onClick={(e) => increaseDecraseAction(e, 'increase')}
                                                            >
                                                                <span className="sr-only">button-plus</span>
                                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity="1">
                                                                        <path d="M10.174 11.8439L3.15109 11.8438C2.69416 11.8439 2.32486 11.4746 2.32496 11.0177C2.32496 10.5608 2.69427 10.1915 3.15109 10.1915L10.1741 10.1915L10.174 3.16858C10.1741 2.71165 10.5433 2.34245 11.0002 2.34245C11.4571 2.34234 11.8264 2.71165 11.8263 3.16858L11.8264 10.1915L18.8493 10.1916C19.3062 10.1915 19.6755 10.5608 19.6754 11.0177C19.6755 11.2455 19.5831 11.4524 19.4335 11.602C19.284 11.7515 19.0772 11.8439 18.8493 11.8439L11.8264 11.8438L11.8264 18.8668C11.8264 19.0947 11.734 19.3015 11.5845 19.451C11.4349 19.6006 11.2281 19.6929 11.0002 19.6929C10.5433 19.693 10.174 19.3237 10.1741 18.8668L10.174 11.8439Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        {
                                                            modifyProduct
                                                                ? (
                                                                    <button className={`bg-emerald-600 active:bg-emerald-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-12 md:h-14 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4  w-full text-white `} disabled=""
                                                                        type='submit'>
                                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6 text-[#ffffff] mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M380.44 32H64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32V131.56zM112 176v-64h192v64zm223.91 179.76a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"></path></svg>
                                                                        Save Product
                                                                    </button>
                                                                )
                                                                : (
                                                                    <button className={`bg-lightBlue-600 active:bg-lightBlue-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-12 md:h-14 bg-brand px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4  w-full text-white `} disabled="" onClick={(e) => { e.preventDefault(); saveProductOnQuote() }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#000000] mr-3"><path fill="#FFFFFF00" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
                                                                        Add to Quote
                                                                    </button>
                                                                )

                                                        }

                                                    </div>
                                                    <ul className="pt-5 xl:pt-6">
                                                        <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                                                <path d="M17.125 1H12.3677C11.4662 1 10.6188 1.351 9.98123 1.98849L1.63974 10.33C1.22725 10.7425 1 11.2908 1 11.8765C1 12.4593 1.22725 13.0075 1.63974 13.42L6.58 18.3603C6.99249 18.7728 7.54075 19 8.12649 19C8.70924 19 9.2575 18.7728 9.66999 18.3603L18.0115 10.0188C18.649 9.38125 19 8.53374 19 7.63226V2.87499C19 1.8415 18.1585 1 17.125 1ZM18.25 7.63226C18.25 8.33352 17.977 8.99277 17.482 9.48777L9.13976 17.83C8.6005 18.3693 7.65476 18.373 7.111 17.83L2.17 12.889C1.89926 12.619 1.74999 12.259 1.74999 11.8735C1.74999 11.491 1.89923 11.131 2.17 10.8603L10.5115 2.51875C11.008 2.02301 11.6665 1.74999 12.3677 1.74999H17.125C17.7452 1.74999 18.25 2.25473 18.25 2.87499V7.63226H18.25Z" fill="#999999" stroke="#999999" strokeWidth="0.5"></path>
                                                                <path d="M14.8749 3.25C13.8414 3.25 12.9999 4.0915 12.9999 5.12499C12.9999 6.15848 13.8414 6.99998 14.8749 6.99998C15.9084 6.99998 16.7499 6.15851 16.7499 5.12499C16.7499 4.0915 15.9084 3.25 14.8749 3.25ZM14.8749 6.24999C14.2546 6.24999 13.7499 5.74525 13.7499 5.12499C13.7499 4.50473 14.2546 3.99999 14.8749 3.99999C15.4952 3.99999 15.9999 4.50473 15.9999 5.12499C15.9999 5.74525 15.4951 6.24999 14.8749 6.24999Z" fill="#999999" stroke="#999999" strokeWidth="0.5"></path>
                                                            </svg>
                                                            Tags:
                                                        </li>
                                                        {
                                                            modifyProduct
                                                                ? (
                                                                    <li className="inline-block p-[3px]">
                                                                        <select name="select-type" id="type"
                                                                            style={{
                                                                                "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                                                            }}
                                                                            defaultValue={productInfo?.type} {...register('type')}
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                console.log(e.target.value, e);
                                                                                if (typeCard == 'Create') {
                                                                                    if (e.detail == 0)
                                                                                        setImageTypeCreate(e.target.value)
                                                                                }
                                                                            }}>
                                                                            <option value="motherboard">Motherboard</option>
                                                                            <option value="ram">Ram</option>
                                                                            <option value="cpu">CPU</option>
                                                                            <option value="powerSupply">Power Supply</option>
                                                                            <option value="graphicCard">Graphic Card</option>
                                                                        </select>
                                                                    </li>
                                                                )
                                                                : (
                                                                    <li className="inline-block p-[3px]">
                                                                        <div className="font-medium text-13px md:text-sm rounded hover:bg-fill-four block border border-sink-base px-2 py-1 transition" role="button">
                                                                            {(productInfo?.type.charAt(0).toUpperCase() + productInfo?.type.slice(1))
                                                                                .replace(/([A-Z])/g, ' $1').trim()}
                                                                        </div>
                                                                    </li>
                                                                )
                                                        }

                                                    </ul>
                                                    <div className="pt-6 xl:pt-8">
                                                        <label forhtml='description' className="text-brand-dark text-15px sm:text-base font-semibold mb-3 lg:mb-3.5">
                                                            Product Details:
                                                        </label>
                                                        <input className={` ${modifyProduct ? 'border-solid border-[#989898] border-[0.3px]' : 'border-none'} block w-full bg-white  focus:bg-[#e8e8e88d] focus:border rounded py-3 px-2 focus:outline-none active:bg-white transition-colors duration-300 text-[#595959] text-sm leading-7 lg:leading-[1.85em]`}
                                                            defaultValue={null}
                                                            id={'description'}
                                                            placeholder='Product description'
                                                            type="text"
                                                            disabled={modifyProduct ? false : true}
                                                            {...register('description', {
                                                                value: productInfo?.description,
                                                                required: `Price is required`,
                                                                pattern: {
                                                                    value: /^\s*(\w+\s+){3,19}\w+\s*$/,
                                                                    message: 'Description must be any text - min 4 words, and max 18 words'
                                                                },
                                                            })} />
                                                        {
                                                            errors?.[`${'description'}`]?.type &&
                                                            <p key={`${'description'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                                                {errors?.[`${'description'}`]?.message}
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}