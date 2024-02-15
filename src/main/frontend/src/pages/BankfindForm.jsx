// BankfindForm.jsx

import { Container as MapDiv, NaverMap, Marker, useNavermaps, Overlay, Listener } from 'react-naver-maps';
import useGeoLocation from '../components/useGeoLocation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

function Marker2({ geoy, geox, krnbrm, brncnwbscadr }) {
    const navermaps = useNavermaps();
    const [infoWindow, setInfoWindow] = useState(null);
    const [marker] = useState(() => new navermaps.Marker({
        position: { lat: geoy, lng: geox }
    }));

    const handleMarkerClick = () => {
        console.log(krnbrm, brncnwbscadr); // 값이 올바르게 전달되는지 확인
        console.log(infoWindow + ' 클릭후 ');
        if (krnbrm && brncnwbscadr && !infoWindow) { // 값이 비어있지 않고 InfoWindow가 열려있지 않은 경우
            const newInfoWindow = new navermaps.InfoWindow({
                content: `
                    <div>
                        <h2>지점명: ${krnbrm}</h2>
                        <p>주소: ${brncnwbscadr}</p>
                    </div>
                `,
                maxWidth: 200
            });
            
            setInfoWindow(newInfoWindow);
            console.log("InfoWindow 업데이트 확인:", newInfoWindow); // 상태 업데이트 확인
            console.log("newInfoWindow 확인:", newInfoWindow.content); // 상태 업데이트 확인
            newInfoWindow.open(navermaps, marker); // map 변수를 전달
        }
    };

    return (
        <>
            <Overlay element={marker}>
                <Listener type='click' listener={handleMarkerClick} />
            </Overlay>
        </>
    );
}


const BankfindForm = () => {
    const location = useGeoLocation();
    console.log(location.coordinates.latitude);
    console.log(location.coordinates.longitude);
    const [map, setMap] = useState(null);
    let [arr, setarr] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (arr.length === 0) {
            axios.get("/map")
                .then(response => { setarr(response.data); })
                .catch((error) => { console.log("요청중 에러발생,,,", error) })
        }
            // review 데이터 가져오기
            axios.get("/review")
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <h1>내 위치 및 내 근처은행 찾기</h1>
            {location.loaded
                ? JSON.stringify(location)
                : "Location data not available yet."}
            <MapDiv
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '500px',
                    borderRadius: "20px",
                }}
            >
                <NaverMap
                    center={{
                        // 지도의 중심좌표
                        lat: location.coordinates.latitude,
                        lng: location.coordinates.longitude,
                    }}
                    defaultZoom={15}
                    minZoom={7}
                    maxZoom={21}
                    zoomControl={true}
                    onInitialized={(map) => setMap(map)} // Map이 초기화되면 map 상태 업데이트
                >
                    {location.coordinates.latitude && location.coordinates.longitude && (
                        <Marker
                            position={{
                                lat: location.coordinates.latitude,
                                lng: location.coordinates.longitude
                            }}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                size: new window.naver.maps.Size(32, 32),
                                scaledSize: new window.naver.maps.Size(32, 32)
                            }}
                        />
                    )}
                    {arr.map(e => (
                        <Marker2
                            key={e.seq}
                            geox={e.geox}
                            geoy={e.geoy}
                            krnbrm={e.krnbrm}
                            brncnwbscadr={e.brncnwbscadr}
                            review={reviews} // 해당 인덱스에 해당하는 리뷰 데이터 전달
                            map={map}
                        />
                    ))}
                </NaverMap>
            </MapDiv>
        </div>
    );
};

export default BankfindForm;
