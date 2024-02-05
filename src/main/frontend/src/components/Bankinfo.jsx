import styled from "styled-components";

const Bankinfospan = styled.span`
    margin-left: 10px;
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

const Bankinfo = () => {

    return(
        <>
            <Bankinfospan>IBK기업은행 선릉점</Bankinfospan><br></br>
            <Bankinfospan>서울특별시 강남구 역삼동 테헤란로 328</Bankinfospan><br></br>
            <Bankinfospan>대기 : 1명</Bankinfospan>
        </>
    )
} 
export default Bankinfo;