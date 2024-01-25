import React, { useContext, useEffect, useState } from 'react'
import { CardCustomerTable } from '../Components/Cards'
import { MainContext } from '../../Infrastructure'
import { getAllCustomer } from '../../Application/Axios/get'
import { CustomCreateDropdown } from '../Components/Dropdowns'

export default function SystemUsers() {

    const [customers, setCustomers] = useState([])
    const [mainContext, setMainContext] = useContext(MainContext)
    const attributesCustomerValidated = {
        names: {
            value: 'names',
            pattern: {
                value: /^[a-zA-Z0-9\s]{1,20}$/,
                message: 'Max 1-20 char with no special'
            },
        },
        document: {
            value: 'document',
            pattern: {
                value: /^\d{10}$/,
                message: 'Only 10 digits'
            },
        },
        city: {
            value: 'city',
            pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{1,20}$/,
                message: 'Must only be 1-20 size no special char'
            },
        },
        address: {
            value: 'address',
            pattern: {
                value: /^(?=.*[a-zA-Z\d]).{5,10}$/,
                message: 'Must only be 5-10 size char'
            },
        },
        phone: {
            value: 'phone',
            pattern: {
                value: /^\d{1,10}$/,
                message: 'Only numbers, max 10 digits'
            },
        },
        email: {
            value: 'email',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email must be email format'
            },
        }
    }

    const formatAttributes = (customerData) => {
        //console.log(customerData);
        const customerAttribuesFormated = customerData.reduce((prevCustomers, nextCustomer) => {
            //console.log(nextCustomer, prevCustomers);
            const singleCustomer = Object.keys(nextCustomer).reduce((prev, next) => {
                //console.log(prev, next, nextCustomer?.id);
                if (next == 'id' || next == 'createdAt') {
                    return Object.defineProperty(prev, `${next}`, {
                        value: {
                            idAttr: `${nextCustomer?.id}-${next}`,
                            value: nextCustomer[next],
                        },
                        enumerable: true
                    })
                } else if (next == 'user') {
                    return Object.defineProperty(prev, `${next}`, {
                        value: {
                            idAttr: `${nextCustomer?.id}-${next}`,
                            value: nextCustomer[next],
                        },
                        enumerable: true
                    })
                } else {
                    Object.keys(attributesCustomerValidated).map((attribute) => {
                        //console.log(attribute, prev);
                        if (attribute == next) {
                            console.log('SUCUCUCUS');
                            return (Object.defineProperty(prev, `${next}`, {
                                value: {
                                    idAttr: `${nextCustomer?.id}-${next}`,
                                    value: nextCustomer[next],
                                    pattern: attributesCustomerValidated[attribute].pattern
                                },
                                enumerable: true
                            }))
                        }

                    })
                    //console.log(prev);
                    return prev
                }

            }, {})

            Object.defineProperty(singleCustomer, 'settings', {
                value: {
                    idAttr: `${singleCustomer?.id?.value}-settings`,
                },
                enumerable: true
            })
            //console.log(prevCustomers, singleCustomer);
            prevCustomers.push(singleCustomer)

            return prevCustomers
        }, [])
        setCustomers(customerAttribuesFormated)
        console.log("RESULTADO FINAL", customerAttribuesFormated);
    }


    useEffect(() => {
        console.log("000000000000000000 CUSTOMER EFFECT", mainContext, customers, mainContext?.services?.axios && customers.length >= 0 && mainContext?.reload);

        if ((mainContext?.services?.axios && customers.length <= 0) || mainContext?.reload ) {
            console.log("@@CLIENTS@@@@@@@@@@@@ ", mainContext);
            const getCustomerFunction = async () => {
                await getAllCustomer({ context: { mainContext, setMainContext } })
                    .then((data) => {
                        console.log(data)
                        if (!data.error)
                            if (data?.data)
                                if (data?.data?.data.length > 0)
                                    formatAttributes(data.data.data)
                                else
                                    setCustomers([])

                    })
            }
            getCustomerFunction()
        }

        return () => {
            console.log("+OUT000000000000000000 CUSTOMER EFFECT", mainContext);

            setMainContext((prevState) => ({
                ...prevState,
                notification: {}
            }))

        }
    }, [mainContext?.services, mainContext?.reload])

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardCustomerTable customerData={customers} />
                    <CustomCreateDropdown type='Customers' />
                </div>
            </div>
        </>
    )
}