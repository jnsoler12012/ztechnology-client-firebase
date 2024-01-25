import mainAxios from "../mainAxios";

export default ({ data, userTechId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idSystemUser } = data
    const { idUserRequester } = userTechId

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