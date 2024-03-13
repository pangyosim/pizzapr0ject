import styled from "styled-components";
import searchimg from "../img/searchimg.png";

const Searchmapbox = styled.div`
    width: 45vh;
    height: 5vh;
    border: 1px solid black;
    border-radius: 15px;
    cursor: pointer;
    &:hover{
        background-color: #e9e9e9;
        border: 1px solid #d8d8d8;
    }
    margin-top: 0;
`;

const Searchimg = styled.img`
    width: 3vh;
    height: 4vh;
    margin-top: 0.5vh;
    margin-left: 1vh;
`;

const Searchp = styled.p`
    color: black;
    margin-left: 5vh;
    font-size: 20px;
    margin-top: -3.8vh;
`;

const Aroundmybank = () => {
    return(
        <Searchmapbox>
                <Searchimg src={searchimg}></Searchimg>
                <Searchp>내 근처 은행 현황</Searchp>
        </Searchmapbox>
    )
}

export default Aroundmybank;