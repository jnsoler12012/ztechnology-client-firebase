import mainAxios from "../../mainAxios";


export default ({ context }) => {
    console.log("GET ALL QUOTES")

    return mainAxios({
        context,
        props: {
            url: "/quote/getAll",
            method: "GET",
        }
    }
    );
}