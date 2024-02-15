import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapdiv = styled.div`
    width: 25%;
    height: 80px;
    margin-top: 10%;
    margin-left: 6%;
    background-color: #aaaaaa;
    cursor: pointer;
    border-radius: 10px;
    &:hover{
        background-color: #b3b3b3;
    }
    display: flex;
    align-items: center;
`;
const FindQAp = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: white;
    margin: 0 auto;
`;
const QA = () => {

    return(
        <Wrapdiv>
            <FindQAp><Link to="/qna" style={{color:"white",textDecoration : "none" }}>Q&A</Link></FindQAp>
        </Wrapdiv>
    )
}

export default QA;