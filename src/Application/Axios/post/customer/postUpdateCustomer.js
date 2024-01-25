import mainAxios from "../../mainAxios";

export default ({ data, id, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { names, document, email, city, address, phone } = data
    const { idRequired } = id

    return mainAxios({
        context,
        props: {
            url: `/customer/modify/${idRequired}`,
            method: "POST",
            payload: {
                names, document, email, city, address, phone
            }
        }
    }
    );
}