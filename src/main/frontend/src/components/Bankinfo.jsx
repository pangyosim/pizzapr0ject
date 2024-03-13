import styled from "styled-components";
import { useEffect, useState } from "react";
import bankstatimg from "../img/bankstateimg.png";
import axios from "axios";
import Loading from "./Loading";
import React from "react";

const Bankbox = styled.div`
    width: 45vh;
    height: 100px;
    background-color: #2c3d50;
    margin-top: 1vh;
    cursor: pointer;
    transition: 0.1s linear;
    &:hover{
        background-color: #384f69;
        transform: scale(1.02);
    }
`;

const Wrapimg = styled.div`
    float: left;
    boxSizing: border-box;
    margin: 4vh 2vh;
`;

const BankStateimg = styled.img`
    width: 2vh;
    height: 2vh;
`;

const Wrapinfo = styled.div`
    float: left;
    boxSizing: border-box;
    margin-top: 1.5vh;
`;

const Bankinfospan = styled.span`
    margin-left: 1vh;
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

const Sumwaitspan = styled.span`
    color: orange;
    font-size: 15px;
    font-weight: bold;
`;

const Waitspan = styled.span`
    margin-left: 1vh;
    color: white;
    font-size: 15px;
    font-weight: bold;
`


const Bankinfo = () => {
    let [arr, setarr] = useState([]);
    let [avgarr, setavgarr] = useState([]);
    let [nearlist, setnearlist] = useState([]);
    const [loading, setloading] = useState(false);
    const [loc, setloc] = useState({
        lat: 0,
        lng: 0
    })

    useEffect(() => {
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
                lat: 37.5035377,
                lng: 127.1353476
            });
            console.log('error lat : ' + loc.lat)
            console.log('error lng : ' + loc.lng)
            alert('네트워크가 불안정합니다,,,')
        }
        if (arr.length === 0){ // axios 한번만 받게,,,
            axios.get("/map")
            .then(response => {setarr(response.data); setloading(true)})
            .catch((error) => {console.log("arr 요청중 에러발생,,,", error)})
        }
        if (avgarr.length === 0){ // axios 한번만 받게,,,
            axios.get("/minwait")
            .then(response => {setavgarr(response.data);})
            .catch((error) => {console.log("avgarr 요청중 에러발생,,,", error)})
        }
        console.log('arr : '+ arr)
        console.log(arr.length)
        console.log('avgarr : ' + avgarr)
        console.log(avgarr.length)
    
        var near_list = []
        if( loc.lat !== 0 ){
            arr.forEach((e)=>{
                e.distance = distance(loc.lat,loc.lng,e.geoy,e.geox)
                near_list.push(e)
            })
            avgarr.forEach((e)=>{
                e.avgdata = Number(e.avg1)+Number(e.avg2)+Number(e.avg3)+Number(e.avg4)+Number(e.avg5)
            })
            if(nearlist.length === 0){
                setnearlist(near_list.sort((a,b) => a.distance - b.distance).slice(0,5));
            }
        }
        //console.log('sort list : '+near_list.sort((a,b) => a.distance - b.distance).slice(0,5))
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
    },[arr,nearlist.length,avgarr,loc.lat,loc.lng])

    //console.log('nearlist : ' + nearlist)

    return(
        <>
            {loading ? nearlist.map((e) => {
                var found = avgarr.find(data => data.addr === e.brncnwbscadr)
                return(
                    <Bankbox key={e.seq}>
                        <Wrapimg>
                            <BankStateimg src={bankstatimg}/>
                        </Wrapimg>
                        <Wrapinfo>
                            <Bankinfospan>IBK기업은행 {e.krnbrm} 지점</Bankinfospan><br></br>
                            <Bankinfospan>{e.brncnwbscadr}</Bankinfospan><br></br>
                            {/* <Bankinfospan> 거리 : {Math.round(e.distance * 100)/100.0} km</Bankinfospan> */}
                            <Waitspan>대기 인원 수 평균 </Waitspan>
                            <Sumwaitspan>&nbsp; {found.avgdata} </Sumwaitspan>
                        </Wrapinfo>
                    </Bankbox>
                )
            }): <Loading/>}
        </>
    )
} 
export default React.memo(Bankinfo);