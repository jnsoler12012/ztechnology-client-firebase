import * as yup from 'yup';

export default () => {

    return (
        yup
            .object()
            .shape({
                document: yup.string().required('Document required').matches(/^\d{10}$/, 'Document must be 10 digits only'),
                role: yup.mixed().oneOf(['ADMIN', 'USER']),
                state: yup.mixed().oneOf(['Active', 'Inactive']),
                password: yup.string().required('Password required if is gonna be changed').matches(/^[a-zA-Z0-9* ]{1,20}$/, 'Password max 20 digis with no special characters'),
                email: yup.string().required('Email required').email('Must be a email string').min(2, 'Min length 4'),
                names: yup.string().required('Name required').min(4, 'Min length 4').max(20, 'Max length 20'),
            })
            .required()
    )
}