import styled from "styled-components";

const Wrapdiv = styled.div`
    width: 40%;
    height: 130px;
    margin-top: 7%;
    margin-left: 6.5%;
    background-color: #2980b9;
    cursor: pointer;
    border-radius: 10px;
    &:hover{
        background-color: #538AB9;
    }
`;

const Findbankp = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: white;
    padding: 5px 15px;
`;

const Findbanksub = styled.p`
    font-size: 15px;
    color: white;
    font-weight: bold;
    margin-left: 15px;
`;

const Parkingfind = () => {

    return(
        <Wrapdiv>
            <Findbankp>주차장 찾기</Findbankp>
            <Findbanksub>근처 주차장 및 혼잡도를 알려드려요.</Findbanksub>
        </Wrapdiv>
    )
}
export default Parkingfind;