import Header from "./Header";
import styled from "styled-components";
import Aroundmybank from "../components/Aroundmybank";
import Inform from "../components/Inform";
import Bankfind from "../components/Bankfind";
import Parkingfind from "../components/Parkingfind";
import QA from "../components/QA";
import CustomerService from "../components/CustomerService";
import { NavLink } from "react-router-dom";
import Bankinfo from "../components/Bankinfo";

//------------------------------------------------------------------------------------------
// Main div box
const Wrapper = styled.div`
    width: 180vh;
    height: 680px;
    margin: 4vh 13vh;
`;
const WrapWaitBox = styled.div`
    float: left;
    width: 55vh;
    height: 700px;
    boxSizing: border-box;
`;

const CenterBox = styled.div`
    margin-top: 8vh;
    float: left;
    margin-left: 3vh;
    width: 60vh;
    height: 700px;
    boxSizing: border-box;
`;

const LastBox = styled.div`
    float: right;
    width: 45vh;
    height: 700px;
    boxSizing: border-box;
    margin-right: 15vh;
    margin-top: 2vh;
`;
//------------------------------------------------------------------------------------------
// wrap

const Wrapdiv = styled.div`
    display: flex;
`;

const Navstyle = styled(NavLink)`
    margin-left: 1vh;
    text-decoration: none;
    &:hover{
        text-decoration: none;
    }
`;


//------------------------------------------------------------------------------------------

const Main = () => {

    return(
        <>
            <Header/>
            <Wrapper>
                <WrapWaitBox>  
                    <Inform/>
                </WrapWaitBox>
                <CenterBox>
                    <Wrapdiv>
                        <Navstyle to="/map">
                            <Bankfind/>
                        </Navstyle>
                        <Navstyle to="/park">
                            <Parkingfind/>
                        </Navstyle>
                    </Wrapdiv>
                    <Wrapdiv>
                        <Navstyle to="/qna">
                            <QA/>
                        </Navstyle>
                        <Navstyle to="/About">
                            <CustomerService/>
                        </Navstyle>
                    </Wrapdiv>
                </CenterBox>
                <LastBox>
                    <Navstyle to="/map">
                        <Aroundmybank/>
                    </Navstyle>
                    <Navstyle to="/map">
                        <Bankinfo/>
                    </Navstyle>
                </LastBox>
            </Wrapper>
        </>
    )

}
export default Main;