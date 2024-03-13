import Header from "./Header";
import React from "react";
import Aboutlogo from '../img/Aboutlogo.png'
const AboutPage = () => {

    return(
        <> 
            <Header/>
            <div class="container mt-5 mb-5" style={{paddingTop:"5vh"}}>
                <div class="row mb-5">
                    <div class="col-md-12">
                        <img src={Aboutlogo} class="img-fluid" alt="plachold"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <h1>Don't worry Be banking</h1>
                        <hr></hr>
                        <p style={{fontSize:"20px", fontWeight:"bold"}}>DWBB에 대해 소개하자면?</p>
                        <p>
                            은행 업무를 볼 때, 근처에 있는 은행이 대기인원이 몇 명이 있는지 궁금하신 경험이 있으시지 않나요? 그렇다면 저희 서비스를 이용해 보시면, 창구별 주변 은행 대기 인원이 몇 명인지 알 수 있습니다.
                            또한, 근처에 있는 주차장 정보도 알 수 있어, 차를 가지고 오셨다면, 주차장정보로 합리적인 선택을 할 수 있게 도와드립니다.<br></br>
                            현재는 공공데이터 IBK 중소기업은행 대기현황 API를 사용해, 한정적으로 제공하고 있으나, 이 후 다른 은행, 주차장 데이터를 가지고 서비스할 예정입니다...
                        </p>
                        <p> React, SpringBoot, JPA, JSQL, OracleDB, NaverMapAPI를 사용하였습니다 </p>
                        <span style={{fontWeight:"bold"}}>깃허브 주소 : </span><a href="https://github.com/pangyosim/pizzapr0ject">https://github.com/pangyosim/pizzapr0ject</a>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default React.memo(AboutPage);