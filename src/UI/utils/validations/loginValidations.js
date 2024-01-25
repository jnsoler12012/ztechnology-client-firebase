export default (defaultFunction) => {
    return ({
        email: {
            name: "email",
            ...defaultFunction('email', {
                validate: {
                    matchPattern: async (v) =>
                        !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)) &&
                        "Email address must be a valid address",
                    required: async (v) => !v && 'Email is required',
                },
            })
        },
        password: {
            name: "password",
            ...defaultFunction('password', {
                validate: {
                    required: async (v) => !v && 'Password is required',
                }
            })
        }
    })
}