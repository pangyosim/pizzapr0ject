import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';


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
    color: white;
    font-weight: bold;
    font-size: 25px;
    
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
const BoardList = styled.div`
    color: white;
    margin-left: 2vh;
`;
const Li = styled.li`
    height: 12px;
    &:hover{
        text-decoration: underline;
    }
`;

const Inform = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/board')
            .then((res) => res.json())
            .then((res) => {
                const sortedBoards = res.sort((a, b) => b.boardSeq - a.boardSeq);
                setBoards(sortedBoards);
            });
    }, []);

    return (
        <Wrapinfo>
            <Headerinfo>
                <Headerinfospan>공지사항</Headerinfospan>
                <Link to="/board"><Headerinfomore>더보기</Headerinfomore></Link>
            </Headerinfo>
            <BoardList>
                {boards.map(board => (
                    <ul key={board.boardSeq}>
                        <Li><Link to={`/board/${board.boardSeq}`}style={{ color:"white", textDecoration: "none",fontSize:"14px"}}><span style={{color:"red"}}>[공지]</span> {board.boardTitle}</Link>
                        <span style={{ float: "right", color: "white", paddingRight: "4vh",fontSize:"14px"}}>
                            {board.boardDate} {/* 예시: 공지사항의 생성일자 */}
                        </span>
                        </Li>
                    </ul>
                ))}
            </BoardList>    
        </Wrapinfo>
    )
}
export default Inform;