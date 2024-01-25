import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
const randomColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')

export default function () {
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end",
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [3, 10],
                    },
                },
            ],
        });
        setDropdownPopoverShow(false);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const randomColorClass = "w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full"


    return (
        <div>
            <a
                className="text-blueGray-500 block"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <p style={{ background: randomColor }} className={randomColorClass}>
                        R
                    </p>
                </div>
            </a >
            <div
                ref={popoverDropdownRef}
                style={{
                    marginTop: '6px !important',
                    marginRight: '9px !important'
                }}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-1 list-none text-left rounded shadow-lg"
                }
            >
                <a
                    href="#user"
                    className={
                        "flex text-sm py-1 px-3 font-normal w-full whitespace-nowrap bg-transparent text-blueGray-700 parentIconLogOut"
                    }
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <svg className="mr-[5px]" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    Seprated link
                </a>
            </div>
        </div >
    );
};