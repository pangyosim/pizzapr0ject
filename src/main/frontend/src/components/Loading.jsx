import React from 'react';
import Spinner from "../img/Loading.gif"

const Loading = () => {
    return (
        <div style={{textAlign:"center", marginTop: "20vh"}}>
            <img src={Spinner} alt="로딩" style={{width:"10vh",height:"10vh"}}/>
        </div>
    )
}
export default Loading;