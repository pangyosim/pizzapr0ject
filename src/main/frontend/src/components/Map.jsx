import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import myloc from '../img/myloc.png';
import ibk from '../img/ibk.png';
import locimg from '../img/location.png';
import React from 'react';

const Nearbox = styled.div`
    padding-top: 2vh;
    border-top: 1px solid black;
    width: 33vh;
    height: 12vh;
    cursor: pointer;
    &:hover {
        background-color : #f2f2f2;
    }
`;

const Nearspan = styled.span`
    font-size : 15px;
    margin-left : 2.5vh;
`;

const Mylocbutton = styled.button`
    padding: 0;
    margin: 0;
    border: 1px solid black;
    background-color: white;
    position:absolute;
    top: 90vh;
    left: 49vh;
    border-radius: 5px;
    z-index: 999;
    width: 4vh;
    height: 4vh;
    cursor: pointer;
    &:hover{
        background-color: #f2f2f2;
    }
`;

const Map = () => {
    let [arr, setarr] = useState([]);
    let [nearlist, setnearlist] = useState([]);
    const [loc, setloc] = useState({
        lat: 0,
        lng: 0
    })
    const [ map, setmap ] = useState(null);
    const mapRef = useRef(null);
   
    useEffect(() => {
        const {naver} = window
        const mylocation = new naver.maps.LatLng(loc.lat,loc.lng)

        if (navigator.geolocation !== null) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        
        function success(position) {
            setloc({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            console.log('success lat :' + loc.lat)
            console.log('success lng :' + loc.lng)
        } // success end
      
        function error() {
            setloc({
                lat: 37.3595704,
                lng: 127.105399
            });
            alert('네트워크가 불안정합니다,,,')
        }

        if( mapRef.current === null){
            mapRef.current = new naver.maps.Map('map', {
                center: mylocation,
                zoom: 15,
                zoomControl: true,
                customcontrol: true
            }) 
            setmap(mapRef.current);
        }
        // set mylocation
        if( loc.lat !== 0){
            map.setCenter(new naver.maps.LatLng(loc.lat, loc.lng));
        }
        new naver.maps.Marker({
            position : mylocation,
            map: map,
            icon: {
                content: [
                `<img src="${myloc}" style="width: 2.5vh; height: 2.5vh;"/>`].join(''),
                anchor: new naver.maps.Point(11, 11),
              }
        })
        if (arr.length === 0){ // axios 한번만 받게,,,
            axios.get("/map")
            .then(response => {setarr(response.data);})
            .catch((error) => {console.log("arr 요청중 에러발생,,,", error)})
        }
        var near_list = []
        if( loc.lat !== 0){
            arr.forEach((e) => {
                const marker = new naver.maps.Marker({
                        position : new naver.maps.LatLng(e.geoy, e.geox),
                        map: mapRef.current,
                        icon: {
                            content: [
                                `<style> 
                                .arr {
                                    width: 15vh; 
                                    height: 4.5vh;
                                    background: white; 
                                    border-radius: 10vh; 
                                    border: 1.5px solid #0675f4; 
                                    display: flex; 
                                    align-items: center;
                                    transition: 0.1s linear;
                                } 
                                .arr:after{ 
                                    border-top: 5px solid #0675f4;
                                    border-left: 4px solid transparent;
                                    border-right: 4px solid transparent;
                                    content: "";
                                    position: absolute;
                                    top: 44px;
                                    left: 30px;
                                }
                                .arr:hover{
                                    transform: scale(1.02);
                                }
                                </style>`,
                                `<div class="arr">`,
                                    ` <img src=${ibk} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-left: 1vh; font-size: 12px; font-weight: bold;"> IBK기업은행 <br>${e.krnbrm}</p>`,
                                `</div>`
                                ].join(''),
                            scaledSize: new naver.maps.Size(30, 50),
                        }
                })
                e.distance = distance(loc.lat,loc.lng,e.geoy,e.geox)
                near_list.push(e)
                if(nearlist.length === 0){
                    setnearlist(near_list.sort((a,b) => a.distance - b.distance).slice(0,6));
                }
                naver.maps.Event.addListener(marker, 'click', () => {
                        map.setZoom(16)
                        const data_arr = [e.krnbrm,e.brncnwbscadr,e.trwntgn1,e.waitcuscnt1,e.trwntgn2,e.waitcuscnt2,e.trwntgn3,e.waitcuscnt3,e.trwntgn4,e.waitcuscnt4,e.waitcuscnt5,e.waitcuscnt5]
                        const new_arr = data_arr.filter((element) => element != null)
                        console.log(new_arr)
                        let content = `<div class="wrapdata" style="padding: 20px;"><div style="color: darkblue; font-weight: bold; border-bottom: 1.5px solid black; font-size: 18px; padding-bottom: 5px;">IBK기업은행</div>`
                        if( new_arr.length > 2){
                            new_arr.map((data,idx) => {
                                if(idx === 0){
                                    return content += `<div style="font-size: 15px; padding-top: 5px;">${data}지점</div>`
                                } else if( idx === 1) {
                                    return content += `<div style="font-size: 15px; padding-bottom: 5px; border-bottom: 1px solid black;">${data}</div>`
                                } else if( idx % 2 === 0){
                                    return content += `<div style="font-size: 15px; text-align: center; padding-top: 5px;">${data} | 대기인원 `
                                } else {
                                    return content += `${data} </div>`
                                } 
                            })
                        } else {
                            new_arr.map((data,idx) => {
                                if(idx === 0){
                                    return content += `<div style="margin-top: 1vh;">${data}지점</div>`
                                } else {
                                    return content += `<div style="margin-bottom: 2vh;">${data}</div>`
                                } 
                            })
                            content += `<div style="color: red; font-size: 15px; font-weight: bold; text-align: center; margin-bottom: 1vh;"> 영업시간이 아닙니다. </div>`
                            content += `<div style="font-size: 15px; text-align: center;  margin-bottom: 1vh; "> 평일 09:00~16:00 </div>`
                        }
                        content += `</div>`
                        const infowindow = new naver.maps.InfoWindow({
                            content : content
                    })
                    infowindow.open(map,marker)
                })
            }) // arr_forEach end
        }
        // Haversine formula
        function distance(lat1, lon1, lat2, lon2) {
            const R = 6371; 
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c; 
            return distance;
        }
        function deg2rad(deg) {
            return deg * (Math.PI/180);
        }
        // Haversine formula end
    },[arr,loc.lat,loc.lng,map,nearlist]) // useEffect end
    console.log(nearlist)
    return(
        <div style={{marginLeft: "3.5vh",marginTop: "4vh"}}>
            <div style={{position: "absolute", marginLeft:"2vh"}}>
                {nearlist.map((e,idx) => {
                        return (
                        <Nearbox key={idx} onClick={(e)=>{
                            const {naver} = window
                            e.preventDefault()
                            const content = e.currentTarget.textContent;
                            const x_idx = content.indexOf("geox");
                            const y_idx = content.indexOf("geoy");
                            const geox = content.substring(x_idx+7,y_idx)/1
                            const geoy = content.substring(y_idx+7)/1
                            map.setCenter(new naver.maps.LatLng(geoy,geox));
                            map.setZoom(16)
                        }}>
                            <span style={{marginLeft: "2.5vh",fontSize: "18px", color: "darkblue",fontWeight:"bold"}}>IBK기업은행</span><br></br>
                            <Nearspan>{e.krnbrm}지점</Nearspan><br></br>
                            <Nearspan>{e.brncnwbscadr}</Nearspan><br></br>
                            <Nearspan style={{fontWeight: "bold"}}>거리 {Math.round(e.distance * 100)/100.0} km</Nearspan>
                            <div style={{display:"none"}}> geox : {e.geox}</div>
                            <div style={{display:"none"}}> geoy : {e.geoy}</div>
                        </Nearbox>
                )})}
            </div>
            <Mylocbutton onClick={(e)=> {
                    const {naver} = window
                    e.preventDefault()
                    map.setCenter(new naver.maps.LatLng(loc.lat,loc.lng))
                 }}>
                <img src={locimg} style={{width:"3vh", height:"3vh",marginTop:"0.5vh",color:"#0675f4"}} alt="myloc"></img>
            </Mylocbutton>
            <div id='map' style={{ float:"right",width: "150vh", height: '85vh', marginRight: "8vh"}}/>
        </div>
    );
    
}

export default React.memo(Map);