import * as yup from 'yup';

export default () => {

    return (
        yup
            .object()
            .shape({
                available: yup.boolean(),
                price: yup.number().required('Price required').min(0, 'Min length 4').max(200000000, 'Max length 200000000'),
                type: yup.mixed().oneOf([
                    'motherboard',
                    'ram',
                    'cpu',
                    'powerSupply',
                    'graphicCard'
                ]),
                description: yup.string().required('Name required').min(4, 'Min length 4').max(30, 'Max length 30'),
                name: yup.string().required('Name required').min(4, 'Min length 4').max(20, 'Max length 20'),
            })
            .required()
    )
}