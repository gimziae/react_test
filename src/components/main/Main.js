import Header from "../common/Header";
import Visual from "./VIsual";
import News from "./News";
import Intro from "./Intro";


export default function Main(){
    return(
        <>
            <Header type={"main"} />
            <Visual />
            <Intro />
            <News />         
        </>  
    )
}
