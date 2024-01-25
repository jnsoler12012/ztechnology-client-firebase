import React, { useState } from 'react'
import CardCreateModifyProduct from './CardCreateModifyProduct';

export default function ({ productInfo }) {

    const [showSingleProduct, setShowSingleProduct] = useState(false)

    //console.log(productInfo);

    return (
        <>
            <article className="flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full shadow-lg" title="Organic Girl Lettuce" onClick={() => setShowSingleProduct(true)}>
                <div className="relative shrink-0">
                    <div className="overflow-hidden mx-auto w-full sm:w-[180px] h-[180px] md:w-[200px] md:h-[200px] transition duration-200 ease-in-out transform group-hover:scale-105 relative flex justify-center items-center">
                        <img alt="Image product" src={productInfo.imageSource} />
                    </div>
                    <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-6 -mx-0.5 sm:-mx-1">
                        <div className="xl:px-[1rem] lg:bottom-[0.5rem] lg:px-[0.75rem] left-[0.25rem] absolute bottom-[0.75rem] flex w-[100%] content-center px-[0.625rem] flex-row-reverse">
                            <button className="flex items-center justify-center w-[3rem] h-[3rem] text-4xl rounded-full bg-[#02b290] lg:w-10 lg:h-10 text-[white] focus:outline-none" aria-label="Count Button">
                                <svg width="19" height="19" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="1">
                                        <path d="M10.174 11.8439L3.15109 11.8438C2.69416 11.8439 2.32486 11.4746 2.32496 11.0177C2.32496 10.5608 2.69427 10.1915 3.15109 10.1915L10.1741 10.1915L10.174 3.16858C10.1741 2.71165 10.5433 2.34245 11.0002 2.34245C11.4571 2.34234 11.8264 2.71165 11.8263 3.16858L11.8264 10.1915L18.8493 10.1916C19.3062 10.1915 19.6755 10.5608 19.6754 11.0177C19.6755 11.2455 19.5831 11.4524 19.4335 11.602C19.284 11.7515 19.0772 11.8439 18.8493 11.8439L11.8264 11.8438L11.8264 18.8668C11.8264 19.0947 11.734 19.3015 11.5845 19.451C11.4349 19.6006 11.2281 19.6929 11.0002 19.6929C10.5433 19.693 10.174 19.3237 10.1741 18.8668L10.174 11.8439Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
                    <div className="mb-1 lg:mb-1.5 -mx-1"><span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-[1rem] lg:leading-[1.5rem] text-black">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format((Math.round(productInfo.price * 100) / 100)?.toFixed(2))}</span></div>
                    <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5"> {productInfo.name}</h2>
                    <div className='flex items-center uppercase text-[#979797] text-[12px]'>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 ltr:mr-2 rtl:ml-2">
                            <path d="M17.125 1H12.3677C11.4662 1 10.6188 1.351 9.98123 1.98849L1.63974 10.33C1.22725 10.7425 1 11.2908 1 11.8765C1 12.4593 1.22725 13.0075 1.63974 13.42L6.58 18.3603C6.99249 18.7728 7.54075 19 8.12649 19C8.70924 19 9.2575 18.7728 9.66999 18.3603L18.0115 10.0188C18.649 9.38125 19 8.53374 19 7.63226V2.87499C19 1.8415 18.1585 1 17.125 1ZM18.25 7.63226C18.25 8.33352 17.977 8.99277 17.482 9.48777L9.13976 17.83C8.6005 18.3693 7.65476 18.373 7.111 17.83L2.17 12.889C1.89926 12.619 1.74999 12.259 1.74999 11.8735C1.74999 11.491 1.89923 11.131 2.17 10.8603L10.5115 2.51875C11.008 2.02301 11.6665 1.74999 12.3677 1.74999H17.125C17.7452 1.74999 18.25 2.25473 18.25 2.87499V7.63226H18.25Z" fill="#999999" stroke="#999999" strokeWidth="0.5"></path>
                            <path d="M14.8749 3.25C13.8414 3.25 12.9999 4.0915 12.9999 5.12499C12.9999 6.15848 13.8414 6.99998 14.8749 6.99998C15.9084 6.99998 16.7499 6.15851 16.7499 5.12499C16.7499 4.0915 15.9084 3.25 14.8749 3.25ZM14.8749 6.24999C14.2546 6.24999 13.7499 5.74525 13.7499 5.12499C13.7499 4.50473 14.2546 3.99999 14.8749 3.99999C15.4952 3.99999 15.9999 4.50473 15.9999 5.12499C15.9999 5.74525 15.4951 6.24999 14.8749 6.24999Z" fill="#999999" stroke="#999999" strokeWidth="0.5"></path>
                        </svg> {productInfo.type}
                    </div>
                    <div className="mt-[1.2rem] text-13px sm:text-sm text-[#595959]">{productInfo.data.length} On stock</div>
                </div>
            </article>
            {showSingleProduct && (
                <CardCreateModifyProduct product={productInfo} typeCard={'Modify'} closeDialog={setShowSingleProduct} />
            )}
        </>
    )
}