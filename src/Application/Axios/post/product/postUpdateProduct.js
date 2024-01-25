import mainAxios from "../../mainAxios";

export default ({ data, id, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { name, description, price, type, counterProduct, idsAssociated } = data
    const { idRequester, idRequired } = id

    return mainAxios({
        context,
        props: {
            url: `/product/modify/${idRequired}`,
            method: "POST",
            payload: {
                name, description, price, type, counterProduct, idsAssociated, idRequester
            }
        }
    }
    );
}