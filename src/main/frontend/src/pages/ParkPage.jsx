import Header from "./Header";
import React ,{ useState } from 'react';
import Loading from '../components/Loading'
import Park from "../components/Park";

const ParkPage = () => {
    const [isloading, setisloading] = useState(false);
    setTimeout(()=>(setisloading(true)),1500);
    return(
        <>
            <Header/>
            {isloading ? <Park/> : <Loading/>}
        </>
    )
}
export default React.memo(ParkPage);