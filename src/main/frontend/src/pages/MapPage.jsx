import Map from '../components/Map';
import Header from './Header';
import React ,{ useState } from 'react';
import Loading from '../components/Loading'

const MapPage = () => {
    const [isloading, setisloading] = useState(false);
    setTimeout(()=>(setisloading(true)),1000);
    return(
        <>  
            <Header/>
            {isloading ? <Map/> : <Loading/>}
        </>
    )
}
export default MapPage;