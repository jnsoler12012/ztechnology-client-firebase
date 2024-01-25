import mainAxios from "../../mainAxios";

export default ({ data, usersId, context }) => {
    console.log("CREATE USER")
    const { id, description, discountType, discount, total, subTotal, deliveryType, state, products, } = data
    const { emailCustomerRequester, idUserRequester } = usersId

    console.log(id, description, discountType, discount, total, subTotal, deliveryType, state, products, emailCustomerRequester, idUserRequester);

    return mainAxios({
        context,
        props: {
            url: `/quote/create`,
            method: "POST",
            payload: {
                id, description, discountType, discount, total, subTotal, deliveryType, state, products, idUserRequester, emailCustomerRequester
            }
        }
    }
    );
}