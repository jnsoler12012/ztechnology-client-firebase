import * as yup from 'yup';

export default () => {

    return (
        yup
            .object()
            .shape({
                phone: yup.string().required('Phone required').matches(/^\d{10}$/, 'Phone must be 10 digits only'),
                address: yup.string().required('Address required').matches(/^(?=.*[a-zA-Z\d]).{5,10}$/, 'Must only be 5-10 size char'),
                city: yup.string().required('City required').matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{1,20}$/, 'Must only be 1-20 size no special char'),
                email: yup.string().required('Email required').email('Must be a email string').min(2, 'Min length 4'),
                document: yup.string().required('Document required').matches(/^\d{10}$/, 'Document must be 10 digits only'),
                names: yup.string().required('Name required').min(4, 'Min length 4').max(20, 'Max length 20'),
            })
            .required()
    )
}