import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../Infrastructure'
import { CardGraphicBars } from '../Components/Cards'
import { getQuoteWhere } from '../../Application/Axios/get'

export default () => {
    const [mainContext, setMainContext] = useContext(MainContext)
    const [quotesUser, setQuotesUser] = useState([])

    const formatQuoteDataToGraphicData = (quotes) => {
        var beforeSevenDaysDate = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
        console.log(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(beforeSevenDaysDate - (7 * 24 * 60 * 60 * 1000)).getDay()]);

        const totalIDQuote = []
        const formatedData = []
        console.log(quotes, beforeSevenDaysDate);
        const lastSevenDaysQuotes = quotes.filter(quote => new Date(quote['createdAt']) > beforeSevenDaysDate)

        const formated = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((data, i) => {
            //console.log(data, i);
            let dayData = {
                day: data
            }
            lastSevenDaysQuotes.map(quote => {
                const quoteDate = new Date(quote['createdAt'])
                if (quoteDate.getDay() == i) {
                    dayData[`${quote.id}`] = quote.total
                    dayData[`${quote.id}Color`] = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
                    totalIDQuote.push(quote.id)
                }
                //console.log(quoteDate.getDay());
            })
            formatedData.push(dayData)
        })
        return ([formatedData, totalIDQuote]);
    }


    useEffect(() => {
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL PRODUCT");


        if ((mainContext?.services?.axios && quotesUser.length <= 0) || mainContext?.reload) {
            console.log("@@DASHBOARD@@@@@@@@@@@@ ", mainContext);
            (async () => {
                await getQuoteWhere({
                    data: {
                        idUserRequester: mainContext?.user?.info?.id
                    },
                    context: { mainContext, setMainContext }
                }).then((data) => {

                    if (!data?.error)
                        if (data?.data)
                            if (data?.data?.data.length > 0) {
                                console.log(data, formatQuoteDataToGraphicData(data?.data?.data));
                                setQuotesUser(formatQuoteDataToGraphicData(data?.data?.data))
                            }

                            else
                                setQuotesUser([])
                })
            })()
        }

        return () => {
            console.log("\\RETURN\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL PRODUCT");
        }
    }, [mainContext?.product, mainContext?.reload])

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <h3 className='text-center font-[700] text-[1.4rem]'>Total Quotes Made by {mainContext?.user?.info?.names} the last 7 days</h3>
                    <CardGraphicBars quoteUser={quotesUser} />
                </div>
            </div>

        </>
    )
}