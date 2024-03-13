import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Maptest = () => {
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    // 네이버 지도 API 스크립트를 동적으로 로드합니다.
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=f6bxajszzm`;
    script.onload = async () => {
      try {
        const response = await axios.get('http://openapi.seoul.go.kr:8088/7a706d586e72616934307852567176/json/GetParkInfo/1/1000/');
        setParkingData(response.data['GetParkInfo']['row']);
      } catch (error) {
        console.error('Error fetching parking data:', error);
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (parkingData.length > 0) {
      // 네이버 지도 API가 로드된 후 실행할 코드를 작성합니다.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const mapOptions = {
            center: new window.naver.maps.LatLng(latitude, longitude),
            zoom: 15
          };

          const map = new window.naver.maps.Map('map', mapOptions);
          const userMarker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(latitude, longitude),
            map: map
          });

          parkingData.forEach(parking => {
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(parseFloat(parking['LAT']), parseFloat(parking['LNG'])),
              map: map
            });

            const infowindow = new window.naver.maps.InfoWindow({
              content: `<div>${parking['PARKING_NAME']}</div>`
            });

            window.naver.maps.Event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
          });
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [parkingData]);

  return (
    <>
      <h2>주차장</h2>
      <div id="map" style={{ width: '1000px', height: '400px', textAlign: 'left' }}></div>
    </>
  );
};

export default Maptest;