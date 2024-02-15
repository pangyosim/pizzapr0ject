import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';

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
const BoardList = styled.div`
    color: white;
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
                {boards.slice(0, 6).map(board => (
                    <ul key={board.boardSeq}>
                        <Li><Link to={`/board/${board.boardSeq}`}style={{ color:"white", textDecoration: "none"}}>{board.boardTitle}</Link>
                        <span style={{ float: "right", color: "white", paddingRight: "15px"}}>
                            {board.boardDate} {/* 예시: 공지사항의 생성일자 */}
                        </span>
                        </Li>
                    </ul>
                ))}
            </BoardList>
        </Wrapinfo>
    )
}
const Li = styled.li`
    height: 12px;
`;

export default Inform;