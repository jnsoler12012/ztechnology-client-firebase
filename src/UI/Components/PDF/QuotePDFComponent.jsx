import React from 'react'
import { Document, Page, StyleSheet, div, View } from '@react-pdf/renderer'

export default function ({ data }) {

    const { id, createdAt, deliveryType, description, discount, discountType, products, state, subTotal, total, customer, user } = data
    const { address, city, document, email, names, phone } = customer
    const { document: documentUser, email: emailUser, names: namesUser, role } = user
    console.log(data);
    return (
        <div >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#ffffff',
            }}>
                <div style={{ width: '100%', margin: '20px', backgroundColor: 'rgba(255, 255, 255, 1)', border: '0.5mm solid #000' }}>
                    <div style={{ width: 'auto', fontSize: '8mm', textAlign: 'center', fontWeight: '700', letterSpacing: '.2rem' }}>ZTECHNOLOGY</div>
                    <div style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '10px' }}>
                        <div style={{ width: '27%', fontSize: '7mm', fontWeight: '600' }}>Quote #{id}</div>
                        <div style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: '10px', display: 'flex', flexDirection: 'col' }}>

                            <div style={{ width: '45%', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '2.5%' }}>
                                <div style={{ width: 'auto', fontSize: '6mm' }}>Created At:  {new Date(createdAt).toDateString()}</div>
                                <div style={{ width: 'auto', fontSize: '6mm' }}>State: {state}</div>
                                <div style={{ width: 'auto', fontSize: '6mm' }}>User Creator:</div>
                                <div style={{ width: 'auto', backgroundColor: 'rgba(238, 238, 238, 0.48)', padding: '2%', display: 'block', border: '0.4mm solid #000' }}>
                                    <div style={{ width: 'auto', fontSize: '5mm' }}>Role: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{role?.name}</div> </div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '2%' }}>Names: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{namesUser}</div> </div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '2%' }}>Email: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{emailUser}</div></div>
                                </div>
                            </div>
                            <div style={{ width: '45%', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '2.5%' }}>
                                <div style={{ width: 'auto', fontSize: '6mm' }}>Customer Destinatary:</div>
                                <div style={{ width: 'auto', backgroundColor: 'rgba(238, 238, 238, 0.48)', padding: '2%', display: 'block', border: '0.4mm solid #000' }}>
                                    <div style={{ width: 'auto', fontSize: '5mm' }}>Names: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{names}</div> </div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '1%' }}>Email: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{email}</div></div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '1%' }}>Document: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{document}</div></div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '1%' }}>City: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{city}</div></div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '1%' }}>Address: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{address}</div></div>
                                    <div style={{ width: 'auto', fontSize: '5mm', marginTop: '1%' }}>Phone: <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{phone}</div></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: '15px', display: 'block', flexDirection: 'col' }}>
                            <div style={{ width: 'auto', fontSize: '6mm', marginTop: '1%' }}>Quote description:</div>

                            <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)', margin: '10px' }}>{description}</div>
                        </div>
                    </div>
                    <div style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '10px', display: 'block', flexDirection: 'col' }}>
                        <div style={{ width: 'auto', fontSize: '6mm', marginTop: '1%', marginLeft: '1%' }}>Products:</div>

                        <div style={{ width: 'auto', backgroundColor: 'rgba(238, 238, 238, 0.48)', margin: '10px', border: '0.5mm solid black' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderTop: '0.4mm solid black',
                                paddingTop: 8,
                                paddingBottom: 8,
                                fontWeight: 'bold',
                                borderTop: 'none',
                            }}>
                                <div style={{ width: '14.6%', fontSize: '5mm', textAlign: 'center', borderRight: '0.4mm solid black' }}>Name</div>
                                <div style={{ width: '12.6%', fontSize: '5mm', textAlign: 'center', borderRight: '0.4mm solid black' }}>Type</div>
                                <div style={{ width: '18.6%', fontSize: '5mm', textAlign: 'center', borderRight: '0.4mm solid black' }}>Description</div>
                                <div style={{ width: '20.6%', fontSize: '5mm', textAlign: 'center', borderRight: '0.4mm solid black' }}>Unit. Price</div>
                                <div style={{ width: '11.6%', fontSize: '5mm', textAlign: 'center', borderRight: '0.4mm solid black' }}>Counter</div>
                                <div style={{ width: '19.6%', fontSize: '5mm', textAlign: 'center', }}>Total</div>
                            </div>
                            {
                                products.map((product, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        borderTop: '0.4mm solid black',
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                    }} wrap={false}>
                                        <div style={{ width: '14.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{product.name}</div>
                                        <div style={{ width: '12.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{product.type}</div>
                                        <div style={{ width: '18.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{product.description}</div>
                                        <div style={{ width: '20.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{
                                            new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(product.price)
                                        }</div>
                                        <div style={{ width: '11.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{product.counter}</div>
                                        <div style={{ width: '19.6%', fontSize: '4mm', textAlign: 'center', color: 'rgba(76, 76, 76, 1)' }}>{
                                            new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(product.price * product.counter)
                                        }</div>
                                    </div>
                                ))
                            }
                        </div >
                    </div>

                    <div style={{ width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: '10px', display: 'flex', flexDirection: 'col' }}>
                        <div style={{ width: '45%', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '2.5%' }}>
                            <div style={{ width: 'auto', fontSize: '6mm', textAlign: 'center' }}>Delivery Type:  <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{deliveryType}</div></div>
                            <div style={{ width: 'auto', fontSize: '6mm', textAlign: 'center', margin: '3%' }}>Price:  <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>$-{
                                (deliveryType == 'Standard') ? 10 : (deliveryType == 'Paid') ? 15 : 25
                            }</div></div>
                        </div>
                        <div style={{ width: '45%', backgroundColor: 'rgba(255, 255, 255, 1)', margin: '2.5%' }}>
                            <div style={{ width: 'auto', fontSize: '6mm', textAlign: 'center' }}>Discount:  <div style={{ width: 'auto', fontSize: '5mm', color: 'rgba(76, 76, 76, 1)' }}>{
                                (discountType == 'Standard') ? '$-' : '%-'
                            }{discount}</div></div>
                        </div>
                    </div>

                    <div style={{ width: 'auto', backgroundColor: 'rgba(238, 238, 238, 0.48)', marginTop: '10px', display: 'block', flexDirection: 'col' }}>

                        <div style={{ width: 'auto', fontSize: '7mm', textAlign: 'right', margin: '2%' }}>Sub total:  <div style={{ width: 'auto', fontSize: '6mm', color: 'rgba(76, 76, 76, 1)' }}>{
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(subTotal)
                        }</div></div>

                        <div style={{ width: 'auto', fontSize: '7mm', textAlign: 'right', margin: '2%' }}>Total:  <div style={{ width: 'auto', fontSize: '6mm', color: 'rgba(76, 76, 76, 1)' }}>{
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(total)
                        }</div></div>
                    </div>

                </div>

            </div>
        </div>

    )
}