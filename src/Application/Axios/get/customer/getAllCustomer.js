import mainAxios from "../../mainAxios";


export default ({ context }) => {
    console.log("GET ALL CUSTOMERS")
    
    return mainAxios({
        context,
        props: {
            url: "/customer/getAll",
            method: "GET",
        }
    }
    );
}