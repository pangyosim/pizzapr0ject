import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const BoardItem = ({board}) => {
    return (
        <>   
            <Ul>
                <Li style={{fontWeight:"bold"}}><Link to={`/board/${board.boardSeq}`} className="nav-link">{board.boardTitle}</Link></Li>
                <Li>작성일 : {board.boardDate} | 작성자 : {board.boardUserId} | 조회수 {board.boardViews} </Li>
            </Ul>
        </>
    );
};
const Ul = styled.ul`
    width: 950px;
    border-bottom: 1px solid rgb(224, 224, 224);
    padding-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
`;
const Li = styled.li`
    list-style-type: none;
`;

export default BoardItem;

