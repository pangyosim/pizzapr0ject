import Map from '../components/Map';
import Header from './Header';
import React ,{ useState } from 'react';
import Loading from '../components/Loading'

const MapPage = () => {
    const [isloading, setisloading] = useState(false);
    setTimeout(()=>(setisloading(true)),1500);
    return(
        <>  
            <Header/>
            {isloading ? <Map/> : <Loading/>}
        </>
    )
}
export default React.memo(MapPage);