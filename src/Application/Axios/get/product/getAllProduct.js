import mainAxios from "../../mainAxios";


export default ({ context }) => {
    console.log("GET ALL PRODUCTS")

    return mainAxios({
        context,
        props: {
            url: "/product/getAll",
            method: "GET",
        }
    }
    );
}