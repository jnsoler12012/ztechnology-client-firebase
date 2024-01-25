import mainAxios from "../../mainAxios";

export default ({ data, id, context }) => {
    console.log("CREATE USER")
    const { name, description, price, type, counterProduct } = data
    const { idRequester } = id

    return mainAxios({
        context,
        props: {
            url: `/product/create`,
            method: "POST",
            payload: {
                name, description, price, type, counterProduct, idRequester
            }
        }
    }
    );
}