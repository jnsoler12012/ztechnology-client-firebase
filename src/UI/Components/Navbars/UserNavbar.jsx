import React from "react";
import { UserDropdown } from "../Dropdowns";
import { QuoteCart } from "../Sidebar";


export default function ({ user, setMainContext }) {
  const { token, info } = user

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[2] bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 navbar-background">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">

          <a
            className="text-[#ffffff] text-sm uppercase hidden md:inline-block font-semibold"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relativbg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form> */}
          <div className="md:flex hidden items-center">
            <h3 className="mr-[15px] font-[700] text-[1.5rem]">{info?.role}</h3><p className="text-white">{info?.names}</p>
          </div>

          <ul className="flex-row list-none items-center hidden md:flex">
            <QuoteCart id={1} />
            {/* <UserDropdown /> */}
          </ul>
        </div>
      </nav>

    </>
  );
}
