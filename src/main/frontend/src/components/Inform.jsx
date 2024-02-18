import styled from "styled-components";

const Wrapinfo = styled.div`
    margin-top: 4vh;
    background-color: #2c3d50;
    width: 55vh;
    height: 73vh;
`;
const Headerinfo = styled.div`
    padding: 3vh 4vh;
`;
const Headerinfospan = styled.span`
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 25px;
    &:hover{
        text-decoration: underline;
    }
`;
const Headerinfomore = styled.span`
    float: right;
    color: white;
    margin-top: 1.2vh;
    font-size: 15px;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`;
const Inform = () => {

    return (
        <Wrapinfo>
            <Headerinfo>
                <Headerinfospan>공지사항</Headerinfospan>
                <Headerinfomore>더보기</Headerinfomore>
            </Headerinfo>        
        </Wrapinfo>
    )
}
export default Inform;