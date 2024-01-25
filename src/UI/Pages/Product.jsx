import React, { useContext, useEffect, useState } from 'react'
import { CardProductDisplayer } from '../Components/Cards'
import { MainContext } from '../../Infrastructure'
import { getAllProduct } from '../../Application/Axios/get'
import { default as imagesProducts } from '../utils/img/product/'
const { cpu, graphicCard, motherboard, powerSupply, ram } = imagesProducts

export default function () {
    const [mainContext, setMainContext] = useContext(MainContext)
    const [products, setProducts] = useState([])

    const formatImageProduct = (data) => {
        console.log(data);

        let dataFormatedArray = []

        for (let x = 0; x < data.length; x++) {
            //console.log(data[x], 'Array final', [...dataFormatedArray]);
            let elementAdded = -1
            let copyProduct = Object.assign({}, data[x])

            for (let y = 0; y <= dataFormatedArray.length; y++) {
                //console.log(dataFormatedArray[y], 'dentro de array', y, copyProduct.name);
                if (dataFormatedArray[y]?.name == copyProduct.name) {
                    elementAdded = y
                    break
                }
            }
            if (elementAdded !== -1) {
                //console.log('ya esta en la lista', elementAdded);
                if (copyProduct?.available)
                    dataFormatedArray[elementAdded].data = [...dataFormatedArray[elementAdded].data, { ...copyProduct }]
                else
                    dataFormatedArray[elementAdded].data = [...dataFormatedArray[elementAdded].data]
            } else {
                Object.keys(imagesProducts).map(keyImage => {
                    if (keyImage == copyProduct.type)
                        copyProduct[`imageSource`] = imagesProducts[keyImage][Math.floor(Math.random() * imagesProducts[keyImage].length)]   
                })

                if (copyProduct?.available)
                    copyProduct['data'] = [{ ...copyProduct }]
                else
                    copyProduct['data'] = []
                dataFormatedArray.push({ ...copyProduct })
            }
            //console.log('final iteraciones');
        }
        console.log(dataFormatedArray);
        return dataFormatedArray
    }


    useEffect(() => {
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL PRODUCT");

        if ((mainContext?.services?.axios && products.length <= 0) || mainContext?.reload) {
            console.log("@@CLIENTS@@@@@@@@@@@@ ", mainContext);
            (async () => {
                await getAllProduct({ context: { mainContext, setMainContext } })
                    .then((data) => {
                        //console.log(formatImageProduct(data?.data?.data))
                        if (!data?.error)
                            if (data?.data)
                                if (data?.data?.data.length > 0)
                                    setProducts(formatImageProduct(data?.data?.data))
                                else
                                    setProducts([])
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
                <div className="w-full mb-12">
                    <CardProductDisplayer context={[mainContext, setMainContext]} productData={products} />
                </div>
            </div>
        </>
    )
}