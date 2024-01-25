import React, { useEffect, useState } from 'react'
import { SidebarProductsFilter } from '../Sidebar'
import CardProductContainer from './CardProductContainer'
import { FaArrowLeft } from "Web_React_Icons/fa";

export default function ({ context, productData }) {

  const [showFilter, setshowFilter] = useState(false)
  const [mainContext, setMainContext] = context
  const { products } = mainContext

  const funcShowHideCart = (e) => {

    const idClick = e.target.id
    console.log(e.target.id, e, "DOS VECES");

    if (idClick == 'filter-icon' || idClick == 'filter-text' || e.target.nearestViewportElement?.id == 'filter-icon-svg') {
      console.log('ICOCJNCONCONCO');
      setshowFilter(true)
    } else if (idClick == 'filter-container' || idClick == 'closeArrow' || e.target.nearestViewportElement?.id == 'closeArrow') {
      setshowFilter(false)
    } else {
      console.log('NONOON');
      // setshowFilter(false)
    }
  }

  return (
    <>
      <div className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
        <SidebarProductsFilter context={context} />
        <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">

          <div className="flex items-center justify-between mb-6">
            <button
              id='filter-icon'
              onClick={(e) => funcShowHideCart(e)}
              className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand">
              <svg id='filter-icon-svg' xmlns="http://www.w3.org/2000/svg" width="18px" height="14px" viewBox="0 0 18 14">
                <g id="Group_36196" data-name="Group 36196" transform="translate(-925 -1122.489)">
                  <path id="Path_22590" data-name="Path 22590" d="M942.581,1295.564H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1295.564,942.581,1295.564Z" transform="translate(0 -169.575)" fill="currentColor"></path>
                  <path id="Path_22591" data-name="Path 22591" d="M942.581,1951.5H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1951.5,942.581,1951.5Z" transform="translate(0 -816.512)" fill="currentColor"></path>
                  <path id="Path_22593" data-name="Path 22593" d="M1163.713,1122.489a2.5,2.5,0,1,0,1.768.732A2.483,2.483,0,0,0,1163.713,1122.489Z" transform="translate(-233.213)" fill="currentColor"></path>
                  <path id="Path_22594" data-name="Path 22594" d="M2344.886,1779.157a2.5,2.5,0,1,0,.731,1.768A2.488,2.488,0,0,0,2344.886,1779.157Z" transform="translate(-1405.617 -646.936)" fill="currentColor"></path>
                </g>
              </svg>
              <span className="ltr:pl-2.5 rtl:pr-2.5" id='filter-text'>Filters</span>
            </button>

            <div id='filter-container' className={`bg-[#0e0e0e5e] top-0 min-h-[100vh] fixed left-0 ${showFilter ? 'min-w-[100%] ' : 'w-0 '} flex flex-row ease-in-out transition-all duration-700 z-[6] lg:hidden`} onClick={(e) => funcShowHideCart(e)}>
              <div id='cart' className={`${showFilter ? 'w-[100%] md:w-[21rem] lg:md:w-[25rem] opacity-100 ' : 'w-[0] h-[0] opacity-0 z-[-1] bottom-0 fixed cursor-none pointer-events-none '} bg-[white] p-[1.8rem] ease-in-out transition-all duration-800`} >
                <div id='header-cart' className=' flex content-center justify-between items-center p-[0.8rem] mb-[1rem]'>
                  <h4 className='font-[700] text-[22px] uppercase'>Filters</h4>
                  <FaArrowLeft id={'closeArrow'} style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>

                <SidebarProductsFilter context={context} stateMd={showFilter} />
              </div>
            </div>
          </div>

          <CardProductContainer productData={productData} />
        </div>
      </div>
    </>
  )
}