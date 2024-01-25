import React from "react"

export default ({ children, loading }) => {

    return (
        <>
            <div className={`${loading ? "visible opacity-90" : "invisible opacity-0"} fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 bg-gray-600 flex flex-col items-center justify-center  transition-all ease-in-out delay-150 duration-300`}>
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4"></div>
                <h2 className="text-center text-white text-[2.8rem] font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-white text-[1.3rem]">This may take a few seconds, please don't close this page.</p>
            </div>
            {children}
        </>
    )

}
