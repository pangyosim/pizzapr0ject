import Header from "./Header";
import styled from "styled-components";
import Aroundmybank from "../components/Aroundmybank";
import AroundBankbox from "../components/AroundBankbox";
import Inform from "../components/Inform";
import Bankfind from "../components/Bankfind";
import Parkingfind from "../components/Parkingfind";
import QA from "../components/QA";
import CustomerService from "../components/CustomerService";
import Sitemap from "../components/Sitemap";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
//------------------------------------------------------------------------------------------
// Main div box
const Wrapper = styled.div`
    width: 90%;
    height: 800px;
    margin: 10px auto;
`;
const WrapWaitBox = styled.div`
    float: left;
    width:25%;
    height: 700px;
    boxSizing: border-box;
`;

const CenterBox = styled.div`
    float: left;
    margin-left: 5%;
    width:35%;
    height: 700px;
    boxSizing: border-box;
`;

const LastBox = styled.div`
    border: 1px solid blue;
    float: right;
    width:30%;
    height: 700px;
    boxSizing: border-box;
`;
//------------------------------------------------------------------------------------------
// wrap

const Wrapdiv = styled.div`
    display: flex;
`;

const Navstyle = styled(NavLink)`
    text-decoration: none;
    margin-left: 3%;
`;


//------------------------------------------------------------------------------------------

const Main = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setUserData(user);
            console.log(user);
        }
    }, []);

    return(
        <>
            <Header/>
            <Wrapper>
                <WrapWaitBox>  
                    <Aroundmybank/>
                    <AroundBankbox/>
                    <AroundBankbox/>
                    <AroundBankbox/>
                    <AroundBankbox/>
                    <AroundBankbox/>
                </WrapWaitBox>
                <CenterBox>
                    <Inform/>
                    <Wrapdiv>
                        <Navstyle to="/map">
                            <Bankfind/>
                        </Navstyle>
                        <Navstyle to="/">
                            <Parkingfind/>
                        </Navstyle>
                    </Wrapdiv>
                    <Wrapdiv>
                        <QA/>
                        <CustomerService/>
                        <Sitemap/>
                    </Wrapdiv>
                </CenterBox>
                <LastBox>
                    <h1>last_box</h1>
                </LastBox>
            </Wrapper>
            {/* {members.map((member) => ( 
            <MemberItem key={member.id} member={member} /> 
        ))}  */}
        </>
    )

}
export default Main;