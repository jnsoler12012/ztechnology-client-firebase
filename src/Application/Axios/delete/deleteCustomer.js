import mainAxios from "../mainAxios";

export default ({ data, userTechId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idCustomer } = data
    const { idUserRequester } = userTechId

    console.log(idCustomer, idUserRequester);

    return mainAxios({
        context,
        props: {
            url: `/customer/delete/${idCustomer}`,
            method: "DELETE",
            payload: {
                idUserRequester
            }
        }
    }
    );
}