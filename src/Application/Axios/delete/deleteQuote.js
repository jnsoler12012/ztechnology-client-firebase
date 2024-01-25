import mainAxios from "../mainAxios";

export default ({ data, userId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idQuote } = data
    const { idUserRequester } = userId

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