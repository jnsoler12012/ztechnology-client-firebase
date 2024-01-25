import mainAxios from "../../mainAxios";

export default ({ data, id, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { email, password, names, document, roleId, state } = data
    const { idRequester, idRequired } = id

    return mainAxios({
        context,
        props: {
            url: `/user/modify/${idRequired}`,
            method: "POST",
            payload: {
                email, password, names, document, roleId, state, idRequester, idRequired
            }
        }
    }
    );
}