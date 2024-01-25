import mainAxios from "../../mainAxios";


export default ({ context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    
    return mainAxios({
        context,
        props: {
            url: "/user/getAll",
            method: "GET",
        }
    }
    );
}