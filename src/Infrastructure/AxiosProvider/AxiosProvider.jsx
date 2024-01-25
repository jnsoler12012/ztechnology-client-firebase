import axios from "axios";
import React, { createContext, useEffect, useRef } from "react";
import { decode } from "../utils";

export const AxiosContext = createContext(null);

export const AxiosContextProvider = ({
    contextMain,
    config = {},
    requestInterceptors = [],
    responseInterceptors = [],
    children,
}) => {

    console.log(contextMain)
    const [mainContext, setMainContext] = contextMain

    const instanceRef = useRef(axios.create(config));

    useEffect(() => {

        instanceRef.current.interceptors.request.use(
            async (config) => {

                if (mainContext?.user?.token && config.headers) {
                    console.log("inceramosssdad");
                    config.headers[`Authorization`] = `Bearer ${decode(mainContext?.user?.token)}`
                }
                console.log("PPPPPPPPPPPPPPPPETITION_REQ", config, mainContext?.user?.token);
                return config;
            }
        );

        instanceRef.current.interceptors.response.use(
            async (config) => {

                console.log("RRRRRRRRRRRRRRRRRESPONSE_RESPONSE", config);
                return config;
            }
        );
    }, [mainContext.user]);

    return (
        <AxiosContext.Provider value={instanceRef.current}>
            {children}
        </AxiosContext.Provider>
    );
};