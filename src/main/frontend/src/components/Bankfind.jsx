import styled from "styled-components";

const Wrapdiv = styled.div`
    width: 28vh;
    height: 35vh;
    margin-top: 6vh;
    background-color: #2980b9;
    cursor: pointer;
    border-radius: 15px;
    transition: 0.1s linear;
    &:hover{
        background-color: #538AB9;
        transform: scale(1.02);
    }
`;

const Findbankp = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: white;
    padding: 8vh 2.25vh 0;
`;

const Findbankwrap = styled.div`
    margin-top: 5vh;
`

const Findbanksub = styled.p`
    font-size: 20px;
    color: white;
    font-weight: bold;
    margin-left: 2.25vh;
`;

const Bankfind = () => {

    return(
        <Wrapdiv>
            <Findbankp>은행 찾기</Findbankp>
            <Findbankwrap>
                <Findbanksub>근처 은행과 대기번호를 </Findbanksub>
                <Findbanksub>알려드려요.</Findbanksub>
            </Findbankwrap>
        </Wrapdiv>
    )
}
export default Bankfind;