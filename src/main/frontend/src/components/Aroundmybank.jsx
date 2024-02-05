import styled from "styled-components";
import searchimg from "../img/searchimg.png";

const Searchmapbox = styled.div`
    width: 100%;
    height: 40px;
    border: 1px solid black;
    border-radius: 15px;
    cursor: pointer;
    &:hover{
        background-color: #e9e9e9;
        border: 1px solid #d8d8d8;
    }
    margin: 0 auto;
`;

const Searchimg = styled.img`
    width: 30px;
    height: 40px;
    margin-left: 12px;
    vertical-align: middle;
`;

const Searchspan = styled.span`
    color: d3d3d3;
    margin-left: 20px;
    font-size: 20px;
`;

const Aroundmybank = () => {
    return(
        <Searchmapbox>
                <Searchimg src={searchimg}></Searchimg>
                <Searchspan>내 근처 은행 대기 현황</Searchspan>
        </Searchmapbox>
    )
}

export default Aroundmybank;