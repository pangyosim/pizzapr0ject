import styled from "styled-components";
import bankstatimg from "../img/bankstateimg.png";
import Bankinfo from "./Bankinfo";
const Bankbox = styled.div`
    width: 100%;
    height: 100px;
    background-color: #2c3d50;
    margin-top: 18px;
    cursor: pointer;
    &:hover{
        background-color: #384f69;
    }
`;

const Wrapimg = styled.div`
    float: left;
    boxSizing: border-box;
    margin: 9% 3%;
`;

const BankStateimg = styled.img`
    width: 20px;
    height: 20px;
`;

const Wrapinfo = styled.div`
    float: left;
    boxSizing: border-box;
    margin-top: 4%;
`;

const AroundBankbox = () => {
    return(
        <Bankbox>
            <Wrapimg>
                <BankStateimg src={bankstatimg}/>
            </Wrapimg>
            <Wrapinfo>
                <Bankinfo/>
            </Wrapinfo>
        </Bankbox>
    )
}
export default AroundBankbox;