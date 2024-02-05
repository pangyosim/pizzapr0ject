import styled from "styled-components";

const Wrapinfo = styled.div`
    background-color: #2c3d50;
    width: 100%;
    height: 35%;
`;
const Headerinfo = styled.div`
    padding: 3% 5%;
`;
const Headerinfospan = styled.span`
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 20px;
    &:hover{
        text-decoration: underline;
    }
`;
const Headerinfomore = styled.span`
    float: right;
    color: white;
    font-size: 10px;
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