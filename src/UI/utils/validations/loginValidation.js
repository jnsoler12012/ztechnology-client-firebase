import * as yup from 'yup';

export default () => (
    yup
        .object()
        .shape({
            email: yup.string().required('Email required').email('Must be a email string'),
            password: yup.string().required('Password required'),
        })
        .required()
)