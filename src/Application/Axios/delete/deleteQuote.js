import mainAxios from "../mainAxios";

export default ({ data, userTechId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idQuote } = data
    const { idUserRequester } = userTechId

    console.log(idQuote, idUserRequester);

    return mainAxios({
        context,
        props: {
            url: `/quote/delete/${idQuote}`,
            method: "DELETE",
            payload: {
                idUserRequester
            }
        }
    }
    );
}