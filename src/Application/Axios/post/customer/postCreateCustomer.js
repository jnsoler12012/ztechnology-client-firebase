import mainAxios from "../../mainAxios";



export default ({ data, id, context }) => {
    console.log("CREATE USER")
    const { names, document, email, city, address, phone } = data
    const { idRequester } = id

    return mainAxios({
        context,
        props: {
            url: `/customer/create`,
            method: "POST",
            payload: {
                names, document, email, city, address, phone, idRequester
            }
        }
    }
    );
}