import React, { useContext } from 'react'
import { emptyTable } from '../../utils/svg';
import { MainContext } from '../../../Infrastructure';
import { IoMdSettings } from "Web_React_Icons/io";
import { Document, pdf } from '@react-pdf/renderer';
import { convertPDFComponentToFile } from '../../../Infrastructure/utils';
import { QuotePDFComponent } from '../PDF';
import * as ReactDOMServer from 'react-dom/server';
import emailjs from '@emailjs/browser';

export default function ({ quoteData }) {
    const [mainContext, setMainContext] = useContext(MainContext)
    const refValuesForm = []

    console.log(quoteData);

    const headers = {
        state: 'w-[0.90%] ',
        createdAt: 'w-[3%]',
        id: 'w-[3.11%] ',
        createdBy: 'w-[8.11%] ',
        createdFor: 'w-[8.32%] ',
        discount: 'w-[6.11%] ',
        deliveryType: 'w-[3.11%] ',
        subTotal: 'w-[6%] ',
        total: 'w-[7%] ',
        description: 'w-[18.11%] ',
        '': 'w-[3.12%] '
    }

    const modifyQuote = (quote) => {
        console.log(quote);
        setMainContext(prevState => ({
            ...prevState,
            currentQuote: {
                state: 'modify',
                quoteData: { ...quote, email: quote.customer.email },
                showed: true
            }
        }))
    }



    const sendQuoteOverEmail = async (quote) => {
        console.log(quote);

        if (window.confirm(`Do you want to send this quote over email to the customer email? Customer email: ${quote.customer.email} `)) {
            const file = <QuotePDFComponent data={quote} />
            console.log(file);

            const value = ReactDOMServer.renderToString(
                <QuotePDFComponent data={quote} />
            );

            console.log(value, quote.user.names, quote.customer.names, quote.user.email, quote.description);

            emailjs.send(
                process.env.WEBPACK_EMAILJS_SERVICE_ID,
                process.env.WEBPACK_EMAILJS_TEMPLATE_ID,
                {
                    to_name: quote.customer.names,
                    from_name: quote.user.names,
                    from_email: quote.user.email,
                    to_email: quote.customer.email,
                    message: quote.description,
                    my_html: value
                },
                process.env.WEBPACK_EMAILJS_PUBLIC_KEY
            ).then((res) => {
                console.log('REEEEEEEEEEEEEEEEEEEEEEES', res);

                setMainContext(prevState => ({
                    ...prevState,
                    notification: {
                        type: "INFO",
                        message: 'Succes on send quote to customer over email',
                    },
                }))
            })
        }



    }

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg text-blueGray-700"
                                }
                            >
                                Quotes
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {
                        quoteData.length > 0 ? (

                            <table className="items-center w-full bg-transparent border-collapse" id='quotes-table'>
                                <thead>
                                    <tr>
                                        {
                                            Object.keys(headers).map(header => {
                                                return (
                                                    ['createdBy', 'createdAt', 'state', 'id'].includes(header)
                                                        ? (
                                                            <th
                                                                key={`${header}-header`}
                                                                className={
                                                                    `${headers[header]} px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100 `}
                                                            >
                                                                {header}
                                                            </th>
                                                        )
                                                        : (
                                                            <th
                                                                key={`${header}-header`}
                                                                className={
                                                                    `${headers[header]} px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                            >
                                                                {header}
                                                            </th>
                                                        )
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>

                                {
                                    quoteData.map((singleQuote) => {
                                        console.log(singleQuote);
                                        return (
                                            <>
                                                <tbody key={`Table-${singleQuote.id}`} className='border-t-2 border-[#202020] border-r-2 border-l-2'>
                                                    <tr id={`TR-${singleQuote.id}`} >
                                                        <td
                                                            id={`state-${singleQuote}`}
                                                            className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs py-2flex justify-center items-center">
                                                            <div className={`${singleQuote.state == 'Created' ? 'bg-yellow-600' : (singleQuote.state == 'Canceled') ? 'bg-red-600' : 'bg-green-600'} rounded-full h-[25px] w-[25px]`}>
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 align-middle border-l-0 border-r-0 text-xs py-2  text-center">
                                                            <div>
                                                                {new Date(singleQuote.createdAt).toDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm font-bold py-2 text-center">
                                                            <div>
                                                                #{singleQuote.id}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                            <div className='uppercase text-xs font-semibold italic'>
                                                                {singleQuote.user.role.name}
                                                            </div>
                                                            <div className=''>
                                                                {singleQuote.user.names}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1  text-center">
                                                            <div className='uppercase text-xs font-semibold italic'>
                                                                {singleQuote.customer.names}
                                                            </div>
                                                            <div className=''>
                                                                {singleQuote.customer.email}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1  text-center">
                                                            <div className='uppercase text-sm'>
                                                                {
                                                                    singleQuote.discountType == 'Standard'
                                                                        ? (`$ ${singleQuote.discount}`)
                                                                        : (`% ${singleQuote.discount}`)
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1  text-center">
                                                            <div className='text-sm flex justify-evenly items-end font-semibold italic'>
                                                                {
                                                                    singleQuote.deliveryType == 'Premium'
                                                                        ? (
                                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22%" width="22%" xmlns="http://www.w3.org/2000/svg"><path d="M2.00488 19H22.0049V21H2.00488V19ZM2.00488 5L7.00488 8L12.0049 2L17.0049 8L22.0049 5V17H2.00488V5Z"></path></svg>
                                                                        ) : singleQuote.deliveryType == 'Paid'
                                                                            ? (
                                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22%" width="22%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path></svg>
                                                                            ) : (
                                                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22%" width="22%" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.88 15.76V19h-1.75v-1.29c-.74-.18-2.39-.77-3.02-2.96l1.65-.67c.06.22.58 2.09 2.4 2.09.93 0 1.98-.48 1.98-1.61 0-.96-.7-1.46-2.28-2.03-1.1-.39-3.35-1.03-3.35-3.31 0-.1.01-2.4 2.62-2.96V5h1.75v1.24c1.84.32 2.51 1.79 2.66 2.23l-1.58.67c-.11-.35-.59-1.34-1.9-1.34-.7 0-1.81.37-1.81 1.39 0 .95.86 1.31 2.64 1.9 2.4.83 3.01 2.05 3.01 3.45 0 2.63-2.5 3.13-3.02 3.22z"></path></svg>
                                                                            )

                                                                }  {singleQuote.deliveryType}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                            <div className='uppercase text-sm italic font-semibold'>
                                                                {
                                                                    new Intl.NumberFormat('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                    }).format(singleQuote.subTotal)
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                            <div className='uppercase text-md italic font-bold'>
                                                                {
                                                                    new Intl.NumberFormat('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                    }).format(singleQuote.total)
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-l-[0.7px] px-2 align-middle border-r-[0.7px] border-gray-500 text-xs py-1">
                                                            <div className='uppercase text-sm'>
                                                                {singleQuote.description}
                                                            </div>
                                                        </td>
                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                            <div className='uppercase text-md italic font-bold h-[1.6rem] w-[97%] bg-lightBlue-500 text-white active:bg-lightBlue-600 rounded-md flex justify-center items-center' onClick={(e) => modifyQuote(singleQuote)}>
                                                                <IoMdSettings style={{ height: '1.5rem', width: '1.5rem' }} />
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                                <tbody key={`Products-${singleQuote.id}`} className='border-[#202020] border-r-2 border-l-2 border-b-2'>
                                                    <tr className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                        <td colSpan='11' className="text-wrap border-t-0 align-middle border-l-0 border-r-0 text-xs text-center">
                                                            <div className='bg-[#dcdcdc70] p-[0.4%] md:p-[0.6rem]'>
                                                                <div className='px-1 italic align-middle border border-solid py-1 text-xs uppercase whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-700 border-[#767676] border-t-2 border-l-2  border-r-2 border-b-0'>
                                                                    PRODUCTS
                                                                </div>
                                                                <table id={`quotes-products-${singleQuote.id}-table`} className='w-full'>
                                                                    <thead className=' border-[#767676] border-b-2  border-l-2  border-r-2'>
                                                                        <tr>
                                                                            <th className={
                                                                                `w-[7%] px-1 align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-[#245d95] text-blueGray-500 border-blueGray-100 italic`}
                                                                            >
                                                                                {''}
                                                                            </th>
                                                                            <th className={
                                                                                `w-[13%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                name
                                                                            </th>
                                                                            <th className={
                                                                                `w-[14%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                type
                                                                            </th>
                                                                            <th className={
                                                                                `w-[33%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                description
                                                                            </th>
                                                                            <th className={
                                                                                `w-[10%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                Unit. price
                                                                            </th>
                                                                            <th className={
                                                                                `w-[10%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                counter
                                                                            </th>
                                                                            <th className={
                                                                                `w-[13%] px-1 italic align-middle border border-solid py-1 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                                                            >
                                                                                total value
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='border-[#767676]  border-2'>
                                                                        {
                                                                            singleQuote.products.length > 0
                                                                                ? (singleQuote.products.map((product) => (
                                                                                    <tr key={`product-tr-${product.name}`} className='border-[#767676]  border-b-2'>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs text-center flex justify-center items-center">
                                                                                            <img src={product.imageSrc} alt="" style={{ height: '2.5rem', width: '2.5rem' }} />
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs font-semibold py-1 text-center">
                                                                                            {product.name}
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs font-semibold py-1 text-center italic">
                                                                                            {product.type}
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs font py-1 text-start ">
                                                                                            {product.description}
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center italic">
                                                                                            {
                                                                                                new Intl.NumberFormat('en-US', {
                                                                                                    style: 'currency',
                                                                                                    currency: 'USD',
                                                                                                }).format(product.price)
                                                                                            }
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-sm font-semibold py-1 text-center italic">
                                                                                            {product.counter}
                                                                                        </td>
                                                                                        <td className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs font-semibold py-1 text-center italic">
                                                                                            {
                                                                                                new Intl.NumberFormat('en-US', {
                                                                                                    style: 'currency',
                                                                                                    currency: 'USD',
                                                                                                }).format(product.price * product.counter)
                                                                                            }
                                                                                        </td>

                                                                                    </tr>
                                                                                )))
                                                                                : (
                                                                                    <tr>
                                                                                        Error, there are no products
                                                                                    </tr>
                                                                                )
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody key={`Send-Quote-${singleQuote.id}`} className='border-[#202020] border-r-2 border-l-2 border-b-2'>
                                                    <tr className="text-wrap border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs py-1 text-center">
                                                        <td colSpan='11' className="text-wrap border-t-0 align-middle border-l-0 border-r-0 text-xs text-center">
                                                            <div className='bg-[#dcdcdc70] p-[0.4%] md:p-[0.6rem]'>
                                                                <div className='px-1 italic align-middle border border-solid py-1 text-xs uppercase whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-700 border-[#767676] border-t-2 border-l-2  border-r-2 border-b-0 cursor-pointer '
                                                                    onClick={() => sendQuoteOverEmail(singleQuote)}
                                                                >
                                                                    SEND QUOTE TO CUSTOMER
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        )
                                    })

                                }
                            </table>
                        ) : (
                            <div className='flex h-[13rem] items-center flex-col justify-center'>
                                {emptyTable}
                                <h3>Empty table</h3>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}