/* eslint-disable react/jsx-pascal-case */
import {Container as MapDiv, NaverMap, useNavermaps, useListener, Overlay } from 'react-naver-maps';
import { useState,useEffect } from 'react';
import axios from 'axios';
function Marker2 ({geoy,geox,krnbrm,brncnwbscadr}) {
    const navermaps = useNavermaps();
    const [marker] = useState(() => new navermaps.Marker({
        position: { lat: geoy, lng: geox}
    }))
    useListener(marker, 'click', () => {window.alert(
    `
    지점명 : ${krnbrm}
    주소 : ${brncnwbscadr}
    `)
    // getElement();
    })
    // function getElement() {
    //     return(
    //         `<div>`

    //         `</div>`
    //     )
    // }
    return(
        <>
            <Overlay element={marker}/>
        </>
    )
}
const Map = () => {
    let [arr, setarr] = useState([]);
    const navermaps = useNavermaps();
    useEffect(() => {
        if (arr.length === 0){
            axios.get("/map")
            .then(response => {setarr(response.data);})
            .catch((error) => {console.log("요청중 에러발생,,,", error)})
        }

    })
    return(
        <MapDiv
            style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            borderRadius: "20px",
            }}
            >
            <NaverMap
                 defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                 defaultZoom={15}
                 minZoom={7}
                 maxZoom={21}
                 zoomControl={true}
            >
                {arr.map(e =>(
                    <Marker2 key={e.seq} geox={e.geox} geoy={e.geoy} krnbrm={e.krnbrm} brncnwbscadr={e.brncnwbscadr}/>
                ))}
            </NaverMap>
        </MapDiv>
    );
}
export default Map;