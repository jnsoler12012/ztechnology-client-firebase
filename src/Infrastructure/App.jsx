import React, { createContext, useContext, useEffect, useState } from 'react'
import '../UI/Styles/app.css'
import { AxiosContext, AxiosContextProvider } from './AxiosProvider'
import { RouterProvider } from './RouterProvider'

export const MainContext = createContext(null)
const BASENAME_AXIOS = process.env.BASENAME_AXIOS

export const MainApp = () => {
  console.log("ENTRAMOS", window.localStorage.getItem("TOKENtech")
  )
  // window.localStorage.removeItem("TOKEN")
  // window.localStorage.removeItem("user")

  const infoUser = window.localStorage.getItem("userTech") && window.localStorage.getItem("userTech").split(',').slice(0, -1).reduce((acc, curr) => (typeof acc === 'string' ? ({
    [acc.split('=')[0]]: acc.split('=')[1]
  }) : ({
    ...acc, [curr.split('=')[0]]: curr.split('=')[1]
  })), {})

  const [main, setMain] = useState({
    reloadProducts: true,
    reload: true,
    loading: false,
    user: {
      token: window.localStorage.getItem("TOKENtech") == 'null' ? null : window.localStorage.getItem("TOKENtech"),
      info: infoUser
    },
    data: {},
    products: {
      filter: [],
      data: {}
    },
    services: null,
    notification: {},
    currentQuote: {
      showed: false,
      quoteData: {
        id: Math.floor(Math.random() * (9999 - 1 + 1) + 1),
        state: 'Created',
        discountType: 'Standard',
        discount: 0,
        description: null,
        customer: null,
        deliveryType: 'Standard',
        products: [],
        user: infoUser
      },
      state: 'create'
    }
  })

  useEffect(() => {
    console.log("_____________MAIN A CAMBIADO", main, window.localStorage.getItem("TOKENtech"))

    return () => {
      console.log("_____________RRR MAIN A CAMBIADO", main)
    }
  }, [main])


  return (
    <MainContext.Provider value={[main, setMain]}>
      <AxiosContextProvider contextMain={[main, setMain]} config={{ baseURL: BASENAME_AXIOS }}>
        <RouterProvider config={{ basename: "/v1" }} />
      </ AxiosContextProvider>
    </MainContext.Provider>

  )
}