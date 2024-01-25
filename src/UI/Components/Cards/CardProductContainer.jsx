import React, { useState } from 'react'
import CardProductItem from './CardProductItem'
import { emptyTable } from 'SVG/';
import { HiPlusSm } from "Web_React_Icons/hi";
import CardCreateModifyProduct from './CardCreateModifyProduct';

export default function CardProductContainer({ productData }) {

    const [showCreateProduct, setShowCreateProduct] = useState(false)

    return (
        <>
            <div>
                <span className={`flex justify-center content-center items-center x-w-[11%]  text-[17px] font-bold bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1 bg-green-500 active:bg-green-600  text-white  uppercase cursor-pointer select-none w-[7.5rem] mb-[1rem]`}
                    onClick={() => setShowCreateProduct(true)}
                >
                    <><HiPlusSm style={{ width: '28px', height: '28px' }} /> Create</>
                </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5 bg-[#fefefe]">
                {
                    productData.length > 0
                        ? (
                            productData.map(singleProduct => {
                                return (
                                    <CardProductItem key={singleProduct.id} productInfo={singleProduct} />
                                )
                            })
                        ) : (
                            <div className='flex h-[13rem] items-center flex-col justify-center'>
                                {emptyTable}
                                <h3>Empty table</h3>
                            </div>
                        )
                }
            </div>
            <div className="pt-8 text-center xl:pt-10"><button data-variant="primary" className="group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center rounded placeholder-white focus-visible:outline-none focus:outline-none h-12 md:h-14 bg-brand text-brand-light tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90">Load More</button></div>
            {showCreateProduct && (
                <CardCreateModifyProduct typeCard={'Create'} closeDialog={setShowCreateProduct} />
            )}
        </>
    )
}