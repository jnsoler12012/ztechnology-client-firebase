import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AxiosContext } from "../../Infrastructure/AxiosProvider";

export default ({ context, props }) => {
    console.log("!!!!!!!!!!!! PETICION HECHA AXIOS MAIN", context)
    const { url, method, payload } = props
    const { mainContext, setMainContext } = context


    let response = {
        data: null,
        error: null
    }
    return (async () => {
        setMainContext((prevState) => ({
            ...prevState,
            loading: true
        }))

        try {
            const petitionResponse = await mainContext?.services?.axios.request({
                data: payload,
                method,
                url,
            });
            //console.log(petitionResponse);

            response.data = petitionResponse?.data
        } catch (error) {
            console.log(error);
            if (error?.code && !error.response?.data)
                response.error = {
                    message: error?.message,
                    path: ''
                }
            else
                response.error = error?.response?.data
        } finally {
            console.log(response)
            if (response?.error?.data)
                console.log(response?.error?.data);

            setMainContext((prevState) => ({
                ...prevState,
                reload: false,
                loading: false,
                notification: {
                    type: (response?.error ? "WARNING" : "SUCCESS"),
                    message: (response?.error?.data ?
                        response?.error?.data.reduce((prev, next) => {
                            return prev += `${(Object.keys(next).reduce(attr => (attr === 'message') && next[attr]))} __ `
                        }, '')
                        : response?.data ?
                            response?.data?.message :
                            `${response?.error?.message} - ${response?.error?.path}`)

                }
            }))
        }

        return response;
    })();
}