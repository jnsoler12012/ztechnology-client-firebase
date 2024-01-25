import mainAxios from "../../mainAxios";

export default ({ data, usersId, context }) => {
    console.log("CREATE USER")
    const { idUserRequester, discountType, discount, deliveryType, state } = data

    console.log(idUserRequester, discountType, discount, deliveryType, state);

    return mainAxios({
        context,
        props: {
            url: `/quote/get/`,
            method: "POST",
            payload: {
                idUserRequester, discountType, discount, deliveryType, state
            }
        }
    }
    );
}