import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import myloc from '../img/myloc.png';
import parking from '../img/parking.png';
import locimg from '../img/location.png';
import React from 'react';

const Nearbox = styled.div`
    padding-top: 1vh;
    padding-bottom: 1vh;
    border-top: 1px solid black;
    width: 33vh;
    height: 13vh;
    cursor: pointer;
    &:hover {
        background-color : #b0b0b0;
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
    left: 44vh;
    border-radius: 5px;
    z-index: 999;
    width: 4vh;
    height: 4vh;
    cursor: pointer;
    &:hover{
        background-color: #b0b0b0;
    }
`;

const Park = () => {
    let [arr, setarr] = useState([]);
    let [nearlist, setnearlist] = useState([]);
    const [loc, setloc] = useState({
        lat: 0,
        lng: 0
    })
    const [ map, setmap ] = useState(null);
    const mapRef = useRef(null);

    // useEffect start
    useEffect(()=>{
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
        } // error end

        if( mapRef.current === null){
            mapRef.current = new naver.maps.Map('map', {
                center: mylocation,
                zoom: 17,
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
            axios.get("/getpark")
            .then(response => {setarr(response.data);})
            .catch((error) => {console.log("arr 요청중 에러발생,,,", error)})
        }

        var near_list = []
        if( loc.lat !== 0){
            arr.forEach((e) => {
                const marker = new naver.maps.Marker({
                        position : new naver.maps.LatLng(e.lat, e.lng),
                        map: mapRef.current,
                        icon: {
                            content: [
                                `<style> 
                                .arr {
                                    width: 15vh; 
                                    height: 4.5vh;
                                    background: white; 
                                    border-radius: 10vh; 
                                    border: 2px solid #40b500; 
                                    display: flex; 
                                    transition: 0.1s linear;
                                    align-items: center;
                                    margin-bottom: 3vh;
                                } 
                                .arr:after{ 
                                    border-top: 5px solid #40b500;
                                    border-left: 4px solid transparent;
                                    border-right: 4px solid transparent;
                                    content: "";
                                    position: absolute;
                                    top: 47px;
                                    left: 30px;
                                }
                                .arr:hover{
                                    transform: scale(1.05);
                                }
                                </style>`,
                                `<div class="arr">`,
                                    ` <img src=${parking} style="margin-left: 0.75vh; width: 2.5vh; height: 2.5vh;"/><p style="margin-top: 2vh; margin-left: 1vh; font-size: 12px; font-weight: bold;">${e.pkname} 주차장</p>`,
                                `</div>`
                                ].join(''),
                            scaledSize: new naver.maps.Size(30, 50),
                        }
                })
                e.distance = distance(loc.lat,loc.lng,e.lat,e.lng)
                near_list.push(e)
                if(nearlist.length === 0){
                    setnearlist(near_list.sort((a,b) => a.distance - b.distance).slice(0,6));
                }
                naver.maps.Event.addListener(marker, 'click', () => {
                        // 주차장 : 이름  주소 유료/무료 주차장타입  전화번호 평일 영업시간  공휴일 영업시간  한달이용료
                        const data_arr = [e.pkname,e.pkaddr,e.paytype,e.type,e.tel,e.beginweek,e.endweek,e.beginholi,e.endholi,e.fullmon,e.distance]
                        const new_arr = data_arr.filter((element) => element != null)
                        console.log(new_arr)
                        let content = `<div style="padding: 30px;">`
                        if( new_arr.length > 2){
                            new_arr.map((data,idx) => {
                                if(idx === 0){
                                    return content += `<div style="color: darkblue; font-weight: bold; border-bottom: 1.5px solid black; font-size: 16px; padding-bottom: 5px;">${data}주차장</div>`
                                } else if( idx === 1) {
                                    return content += `<div style="font-size: 14px; padding-top: 5px;">${data}</div>` // 주소
                                } else if( idx === 2){
                                    return content +=  `<div style="border-bottom: 1px solid black; padding-bottom: 5px;"><span style="font-size: 12px; font-weight: bold; color: red;">${data} </span>` // 유/무료
                                } else if( idx === 3){
                                    return content += `<span style="font-size: 12px; font-weight: bold;">${data} </span>` // 주차장타입
                                } else if( idx === 4){
                                    return content += `<span style="font-size: 12px;  padding-bottom: 5px;">${data} </span></div>` // 전화번호
                                } else if( idx === 5){
                                    return content += `<span style="font-size: 12px; ">평일 : ${data}~</span>` // 평일 영업시간
                                } else if( idx === 6){
                                    return content += `<span style="font-size: 12px; ">${data} 시</span><br>`
                                } else if( idx === 7){
                                    return content += `<span style="font-size: 12px; ">공휴일 : ${data}~</span>` // 주말 영업시간
                                } else if( idx === 8){
                                    return content += `<span style="font-size: 12px;">${data} 시</span><br>` 
                                } else if(idx === 9){
                                    return content += `<span style="font-size: 12px; font-weight: bold; ">월 이용료 ${data.toLocaleString('ko-KR')} 원 </span><br>` // 한달 이용료
                                } else {
                                    return content += `<span style="font-size: 12px; font-weight: bold; >거리 ${Math.round(data * 100)/100.0} km</span>` // 거리
                                }
                            })
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
    },[arr,loc.lat,loc.lng,map,nearlist])
    // useEffect end
    console.log(arr)
    return(
        <div style={{marginLeft: "3.5vh",marginTop: "4vh"}}>
            <div style={{position: "absolute", marginLeft:"2vh"}}>
                {nearlist.map((e,idx) => {
                        return (
                        <Nearbox key={idx} onClick={(e)=>{
                            const {naver} = window
                            e.preventDefault()
                            const content = e.currentTarget.textContent;
                            const x_idx = content.indexOf("lat");
                            const y_idx = content.indexOf("lng");
                            const lat = content.substring(x_idx+6,y_idx)/1
                            const lng = content.substring(y_idx+6)/1
                            map.setCenter(new naver.maps.LatLng(lat,lng));
                            map.setZoom(16)
                        }}>
                            <span style={{fontSize: "16px", fontWeight:"bold", marginLeft: "2.5vh", color: "darkblue"}}>{e.pkname} 주차장</span><br></br>
                            <Nearspan>{e.pkaddr}</Nearspan><br></br>
                            <Nearspan>{e.tel}</Nearspan><br></br>
                            <Nearspan style={{fontWeight: "bold"}}>거리 {Math.round(e.distance * 100)/100.0} km</Nearspan>
                            <div style={{display:"none"}}> lat : {e.lat}</div>
                            <div style={{display:"none"}}> lng : {e.lng}</div>
                        </Nearbox>
                )})}
            </div>
            <Mylocbutton onClick={(e)=> {
                    const {naver} = window
                    e.preventDefault()
                    map.setCenter(new naver.maps.LatLng(loc.lat,loc.lng))
                    map.setZoom(17)
                 }}>
                <img src={locimg} style={{width:"3vh", height:"3vh",color:"#0675f4"}} alt="myloc"></img>
            </Mylocbutton>
            <div id='map' style={{ float:"right",width: "130vh", height: '85vh', marginRight: "10vh"}}/>
        </div>
    )
}

export default React.memo(Park)

