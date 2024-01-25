import mainAxios from "../mainAxios";

export default ({ data, userId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idSystemUser } = data
    const { idUserRequester } = userId

    console.log(idSystemUser, idUserRequester);

    return mainAxios({
        context,
        props: {
            url: `/user/delete/${idSystemUser}`,
            method: "DELETE",
            payload: {
                idUserRequester
            }
        }
    }
    );
}