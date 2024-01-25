import React, { useEffect, useState } from 'react'

export default function ({ context, stateMd = null }) {
    const [mainContext, setMainContext] = context
    const { products } = mainContext
    //console.log(mainContext);
    const [seeMoreFilters, setSeeMoreFilters] = useState(false)


    const checkerFilter = ({ event, deleteSingle }) => {
        //console.log(event, deleteSingle);

        setMainContext((prevState) => {
            //console.log(prevState);
            const prevFilterState = prevState?.products?.filter

            if (deleteSingle)
                prevFilterState?.splice(prevFilterState?.indexOf(deleteSingle), 1)
            else
                if (event.target?.checked)
                    prevFilterState?.push(event.target?.value)
                else
                    prevFilterState?.splice(prevFilterState?.indexOf(event.target?.value), 1)

            return ({
                ...prevState,
                products: {
                    ...prevState.products,
                    filter: [...prevFilterState]
                }
            })
        })


    }



    return (
        <>
            <div className={`sticky ${stateMd ? 'flex' : 'hidden'} h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-[100%] lg:mr-[3%] lg:w-60 top-16`}>
                <div className="w-full h-min space-y-10 bg-white rounded-lg">
                    <div className="block -mb-3">
                        <div className="flex items-center justify-between mb-4 -mt-1">
                            <h3 className="text-[1rem] font-semibold mt-3 ml-3">Filters</h3>
                        </div>
                        <div className="flex flex-wrap mt-3 ml-3">
                            {
                                products?.filter?.map((eachFilter) => {
                                    return (
                                        <div key={eachFilter} className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize transition duration-200 ease-in-out hover:border-brand">
                                            {eachFilter}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="block">

                        <div className="flex flex-col p-5 border rounded-md border-border-base">
                            <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
                                <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">Motherboard</span>
                                <input className="form-checkbox text-blue-400 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-blue-500 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-blue-600 hover:checked:bg-blue-700"
                                    id={'motherboard'}
                                    checked={products?.filter.includes('motherboard')}
                                    onClick={(e) => { checkerFilter({ event: e, deleteSingle: null }) }}
                                    readOnly
                                    type="checkbox" value="motherboard" name="motherboard" />
                            </label>

                            <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
                                <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">Memory RAM</span>
                                <input className="form-checkbox text-blue-400 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-blue-500 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-blue-600 hover:checked:bg-blue-700"
                                    id={'ram'}
                                    checked={products?.filter.includes('ram')}
                                    onClick={(e) => { checkerFilter({ event: e, deleteSingle: null }) }}
                                    readOnly
                                    type="checkbox" value="ram" name="ram" />
                            </label>


                            <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
                                <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">CPU Processor</span>
                                <input className="form-checkbox text-blue-400 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-blue-500 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-blue-600 hover:checked:bg-blue-700"
                                    id={'cpu'}
                                    checked={products?.filter.includes('cpu')}
                                    onClick={(e) => { checkerFilter({ event: e, deleteSingle: null }) }}
                                    readOnly
                                    type="checkbox" value="cpu" name="cpu" />
                            </label>

                            <div className={`${seeMoreFilters ? 'h-full' : 'h-0 overflow-hidden'} ease-in transition-all duration-600`}>
                                <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0">
                                    <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">Power supplie</span>
                                    <input className="form-checkbox text-blue-400 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-blue-500 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-blue-600 hover:checked:bg-blue-700"
                                        checked={products?.filter.includes('powerSupply')}
                                        id={'powerSupply'}
                                        onClick={(e) => { checkerFilter({ event: e, deleteSingle: null }) }}
                                        readOnly
                                        type="checkbox" value="powerSupply" name="powerSupply" />
                                </label>
                                <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
                                    <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">Graphic Card</span>
                                    <input className="form-checkbox text-blue-400 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-blue-500 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-blue-600 hover:checked:bg-blue-700"
                                        id={'graphicCard'}
                                        checked={products?.filter.includes('graphicCard')}
                                        onClick={(e) => { checkerFilter({ event: e, deleteSingle: null }) }}
                                        readOnly
                                        type="checkbox" value="graphicCard" name="graphicCard" />
                                </label>

                            </div>

                            <div className="w-full">
                                <button
                                    className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center text-brand focus:outline-none" id="headlessui-disclosure-button-:r22:"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state=""
                                    onClick={() => setSeeMoreFilters(prevState => !prevState)}
                                >
                                    <span className="inline-block ltr:pr-1 rtl:pl-1">See more</span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-brand-dark text-opacity-60 text-15px" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}