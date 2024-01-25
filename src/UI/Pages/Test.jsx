
import React, { Fragment, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { QuotePDFComponent } from '../Components/PDF';


export default () => {

    const object = {
        "id": 2020,
        "description": "Quote for abc a",
        "discountType": "Percentage",
        "discount": 20,
        "total": 16025,
        "subTotal": 16000,
        "deliveryType": "Premium",
        "state": "Completed",
        "createdAt": "2024-01-22T05:54:15.000Z",
        "updatedAt": "2024-01-22T08:26:02.000Z",
        "customerId": 3,
        "userId": 3,
        "user": {
            "id": 3,
            "names": "regular",
            "document": "1231233219",
            "email": "userRegular@gmail.com",
            "roleId": 2,
            "role": {
                "name": "USER",
                "description": "Regular user with actions with no priviligies"
            }
        },
        "customer": {
            "id": 3,
            "names": "CLiente Abc",
            "document": "1233212322",
            "city": "citylights",
            "address": "calle 22 s",
            "phone": "2323132123",
            "email": "customerAbc@gmail.com"
        },
        "products": [
            {
                "name": "Panasonic",
                "description": "power supply panasonic 1",
                "price": 20000,
                "type": "powerSupply",
                "imageSrc": "/assets/4e5390e18aef9a369513535e909a64b9.jpg",
                "counter": 1,
                "data": [
                    4
                ]
            }
        ]
    }

    return (
        <>
            <div>
                testts


                <QuotePDFComponent data={object} />


            </div>
        </>
    );
}