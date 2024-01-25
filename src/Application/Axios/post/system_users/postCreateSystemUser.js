import mainAxios from "../../mainAxios";



export default ({ data, id, context }) => {
    console.log("CREATE USER")
    const { email, password, names, document, role, state } = data
    const { idRequester } = id

    return mainAxios({
        context,
        props: {
            url: `/user/create`,
            method: "POST",
            payload: {
                email, password, names, document, role, state, idRequester
            }
        }
    }
    );
}