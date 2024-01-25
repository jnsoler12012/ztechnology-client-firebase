import mainAxios from "../../mainAxios";


export default ({ data, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { email, password } = data
    return mainAxios({
        context,
        props: {
            url: "/auth/login",
            method: "POST",
            payload: {
                email,
                password
            }
        }
    }
    );
}