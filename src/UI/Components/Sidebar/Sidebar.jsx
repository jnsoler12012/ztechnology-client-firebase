import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDropdown } from "../Dropdowns";
import SidebarLink from "./SidebarLink";
import { dashboardIcon, usersIcon, quotesIcon, menuIcon, xMark, userIcon, clientsIcon, productsIcon, logOutIcon } from "../../utils/svg";
import { logOut } from "../../../Infrastructure/utils";
import QuoteCart from "./QuoteCart";

export default function ({ user, setMainContext }) {
    const { token, info } = user
    const [collapseShow, setCollapseShow] = useState("hidden");

    const logOutAction = () => {
        logOut(setMainContext, 'Info')
    }

    console.log(window.location.href, user)
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 py-4 px-6 z-[2]">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-1 py-6 px-6")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="w-6 h-6">
                            {menuIcon}
                        </svg>
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:inline-block text-left md:pb-2 text-blueGray-600 mr-0 hidden whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to="/"
                    >
                        ZTechnology
                    </Link>
                    <div className="flex flex-row justify-between list-none items-center md:hidden w-[83%]">
                        <div className="flex items-center">
                            <h3 className="mr-[15px] font-[700] text-[1.5rem]">{info?.role}</h3><p className="text-[#808080]">{info?.names}</p>
                        </div>
                        <QuoteCart id={2}/>
                    </div>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        to="/"
                                    >
                                        ZTechnology
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="w-6 h-6">
                                            {xMark}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr className="my-4 md:min-w-full" />

                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Admin Layout Pages
                        </h6>


                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: dashboardIcon,
                                text: 'Dashboard', toPath: "/app/dashboard"
                            }} />
                            {/* info?.role == 'ADMIN' */}
                            {info?.role == 'ADMIN' && <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: usersIcon,
                                text: 'Platform users', toPath: "/app/system-users"
                            }} />}

                            <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: clientsIcon,
                                text: 'customers', toPath: "/app/customers"
                            }} />

                            <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: productsIcon,
                                text: 'Products', toPath: "/app/products"
                            }} />


                            <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: quotesIcon,
                                text: 'quotes', toPath: "/app/quotes"
                            }} />


                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            User Profile
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <SidebarLink iconProps={{
                                attributes: { h: 'h-5', w: 'w-5' },
                                IconPath: userIcon,
                                text: 'User', toPath: "/app/user-settings"
                            }} />
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className={"items-center"}>
                                <div
                                    className={
                                        "flex items-center text-xs uppercase py-3 font-bold mr-1 parentIconLogOut"
                                    }
                                    onClick={() => logOutAction()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className="w-[23px] h-[23px] text-[#3f4246] childIconLogOut">
                                        {logOutIcon}
                                    </svg>{" "}
                                    <p className="ml-2">Log-out</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
