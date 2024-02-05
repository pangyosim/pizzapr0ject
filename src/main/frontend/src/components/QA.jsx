import styled from "styled-components";

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
            <FindQAp>Q&A</FindQAp>
        </Wrapdiv>
    )
}

export default QA;