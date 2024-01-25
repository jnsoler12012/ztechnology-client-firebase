import mainAxios from "../mainAxios";

export default ({ data, userId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idCustomer } = data
    const { idUserRequester } = userId

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