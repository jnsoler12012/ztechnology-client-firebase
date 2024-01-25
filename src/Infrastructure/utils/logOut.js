export default function (setMainContext, type) {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('TOKEN');

    if (type == 'Expire') {
        setMainContext((prevState) => ({
            ...prevState,
            user: {
                token: null,
                info: null
            },
            notification: {
                type: "WARNING",
                message: 'Session expired, please log in again',
            },
            loading: false,
            data: {},
        }))
    } else {
        setMainContext((prevState) => ({
            ...prevState,
            user: {
                token: null,
                info: null
            },
            notification: {
                type: "INFO",
                message: 'Success on Log out',
            },
            loading: false,
            data: {},
        }))
    }
    setTimeout(() => {
        location.reload();
    }, 2000);
}