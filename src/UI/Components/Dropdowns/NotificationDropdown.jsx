import React, { useEffect, useState } from 'react'

export default function NotificationDropdown({ mainState, setMainState, children }) {

    const { notification } = mainState
    const [visibleAlert, setVisibleAlert] = useState((notification?.type ? true : false))
    //let visibleAlert = true


    //console.log(mainState, setMainState, (notification?.type ? true : false), notification?.type, visibleAlert);

    let messageValues = {
        type: '',
        message: '',
        icon: null
    }
    let notificationComponentBase

    console.log(notification, notification?.type)

    const timerContextChange = (time) => {
        setVisibleAlert(false)
        setTimeout(() => {
            setMainState((prevState) => ({
                ...prevState,
                notification: {}
            }))
        }, time);
    }

    useEffect(() => {
        //console.log("CAMBIO NOTIFICATION MAIN", (notification?.type ? true : false), visibleAlert, ((notification?.type ? true : false) && visibleAlert));

        setVisibleAlert((notification?.type ? true : false))


        const timeoutId = setTimeout(() => {
            if ((notification?.type ? true : false)) {
                //console.log('cambiamos', mainState, (notification?.type ? true : false), visibleAlert, ((notification?.type ? true : false) && visibleAlert));

                timerContextChange(800)
            }

        }, 5000);


        return () => {
            setVisibleAlert(false)
            clearTimeout(timeoutId);
            //console.log("SALIMOS CAMBIO NOTIFICATION MAIN", visibleAlert);
        }
    }, [mainState?.notification])



    switch (notification?.type) {
        case "WARNING":
            messageValues.message = notification?.message
            messageValues.type = "Warning"
            messageValues.icon = <svg focusable="false" style={{ fill: '#ed6c02' }} aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
            messageValues.classNames = {
                containerDiv: 'bg-orange-100 border-orange-400 text-orange-700 ',
                svg: 'text-orange-500 '
            }
            break;
        case "SUCCESS":
            messageValues.message = notification?.message
            messageValues.type = "OK"
            messageValues.icon = <svg style={{ fill: '#2e7d32' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SuccessOutlinedIcon"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path></svg>
            messageValues.classNames = {
                containerDiv: 'bg-green-100 border-green-400 text-green-700 ',
                svg: 'text-green-500 '
            }
            break;
        case "INFO":
            messageValues.message = notification?.message
            messageValues.type = "INFO"
            messageValues.icon = <svg style={{ fill: '#0288d1' }} className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoOutlinedIcon"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
            messageValues.classNames = {
                containerDiv: 'bg-sky-100 border-sky-400 text-sky-700 ',
                svg: 'text-sky-500 '
            }
            break;
        default:
            break;
    }

    notificationComponentBase = <div role="alert" className={`absolute transform w-[92%] z-50 ${visibleAlert ? 'animate-slideIn block top-[1.5%]' : 'animate-slideOut top-[-3%]'} md:w-[58%] md:left-[20%] w-[91%] mx-[1rem] z-[52]`}>

        <div className={`${messageValues.classNames?.containerDiv} border px-4 py-3 rounded relative flex items-center`} role="alert">
            <div className='md:w-[3%] w-[5.3%] mr-[0.3rem]'>
                {messageValues.icon}
            </div>
            <strong className="font-bold mr-[0.5rem]">{messageValues.type}</strong>

            <span className="block sm:inline">{messageValues.message}</span>
        </div>
    </div>

    return (
        <>
            {notificationComponentBase}
            {children}
        </>

    )
}





{/* <div className={`absolute transform w-full z-50 ${mostrarAlerta ? 'animate-slideIn block top-[1.5%]' : 'animate-slideOut top-[-3%]'} bg-red-500 text-white p-4 rounded shadow-md md:w-[47%] md:left-[23%] w-[91%] mx-[1rem]`}>
                <span className="float-right cursor-pointer" onClick={toggleAlerta}>&times;</span>
                <p>¡Esta es una alerta!</p>
            </div> */}