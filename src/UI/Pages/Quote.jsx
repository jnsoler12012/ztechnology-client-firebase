import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Infrastructure";
import { getAllQuote } from "../../Application/Axios/get";
import { CardQuoteTable } from "../Components/Cards";
import { default as imagesProducts } from '../utils/img/product/'

export default function () {
    const [mainContext, setMainContext] = useContext(MainContext)
    const [quotes, setQuotes] = useState([])

    const formatProducts = (arrayQuotes) => {
        return arrayQuotes.reduce((prev, nextQuote) => {
            console.log(nextQuote.products);

            nextQuote.products = nextQuote.products.reduce((prevArray, nextProduct) => {
                console.log(nextProduct);
                if (prevArray.some(p => p.name == nextProduct.name)) {
                    const indeOfProduct = prevArray.indexOf(prevArray.find(p => p.name == nextProduct.name))
                    console.log(prevArray[indeOfProduct]);
                    prevArray[indeOfProduct] = {
                        ...prevArray[indeOfProduct], counter: ++prevArray[indeOfProduct].counter,
                        data: [...prevArray[indeOfProduct].data, nextProduct.id]
                    }
                } else {
                    prevArray.push({
                        name: nextProduct.name, description: nextProduct.description, price: nextProduct.price,
                        type: nextProduct.type, imageSrc: imagesProducts[nextProduct.type][Math.floor(Math.random() * imagesProducts[nextProduct.type].length)], counter: 1,
                        data: [nextProduct.id]
                    })
                }
                console.log(prevArray);
                return prevArray
            }, [])
            prev.push(nextQuote)
            return prev
        }, [])
        console.log(arrayQuoteFormated);
        return arrayQuotes
    }

    useEffect(() => {
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL QUOTE");

        if ((mainContext?.services?.axios && quotes.length <= 0) || mainContext?.reload) {
            console.log("_____________@@QUOTES@@@@@@@@@@@@ ", mainContext);
            (async () => {
                await getAllQuote({ context: { mainContext, setMainContext } })
                    .then((data) => {
                        //console.log(formatImageProduct(data?.data?.data))
                        if (!data?.error)
                            if (data?.data)
                                if (data?.data?.data.length > 0)
                                    setQuotes(formatProducts(data?.data?.data))
                                else
                                    setQuotes([])
                    })
            })()
        }


        return () => {
            console.log("\\RETURN\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL QUOTE");
        }
    }, [mainContext?.product, mainContext?.reload])


    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12">
                    <CardQuoteTable quoteData={quotes} />
                </div>
            </div>
        </>
    )
}