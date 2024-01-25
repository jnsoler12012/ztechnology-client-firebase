import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ({ iconProps }) {
    const { attributes, IconPath, text, toPath } = iconProps
    const { w, h } = attributes

    const location = useLocation();

    useEffect(() => {
        //console.log(`The current route is ${location.pathname}`);
    }, [location]);


    //console.log(window.location.href.indexOf(toPath) === -1, window.location.href)

    return (
        <li className={"items-center"}>
            <Link
                className={
                    "flex text-xs uppercase py-3 font-bold mr-1 " +
                    (window.location.href.indexOf(toPath) !== -1
                        ? "text-[#3b82f6] hover:text-[#93c5fd]" : "text-[#393e42] hover:text-[#999fa5]")
                }
                to={toPath}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="currentColor" className={`${w} ${h} ` +
                    (window.location.href.indexOf(toPath) !== -1
                        ? "opacity-75"
                        : "text-[#3f4246]")} >
                    {IconPath}
                </svg>{" "}
                <p className="ml-2">{text}</p>
            </Link>
        </li>
    )
}