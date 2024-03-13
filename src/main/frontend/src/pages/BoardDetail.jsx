
// BoardDetail.jsx

import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../pages/Header';

const Buttonstyle = styled.button`
    border: none;
    background: none;
    font-family: "Ubuntu", sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    color: black;
    cursor: pointer;
    transition: 0.1s linear;
    &:hover {
        text-decoration: underline;
        color: #bdbebd;
        transform: scale(1.05);
    }
`;

const BoardDetail = () => {
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가
    const navigate = useNavigate();
    const { boardSeq } = useParams();

    const [board, setBoard] = useState({
      boardUserId:'',
      boardTitle:'',
      boardContents:'',
      boardViews:'',
      boardFile:'',
    });

    useEffect(() => {
    console.log(boardSeq);
    fetch("http://localhost:8080/board/" + boardSeq)
    .then((res) => {
        if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => {
      setBoard(res);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });

    const fetchUserData = async () => {
        try {
            // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
            const user = JSON.parse(localStorage.getItem('userData'));
            if (user) {
                setUserData(user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();

    },[boardSeq]);
    

    // 게시글 삭제하기 
    const BoardDelete = () => {
    fetch('http://localhost:8080/board/' + boardSeq, {
        method: 'DELETE',
    })
        .then((res) => res.text())
        .then((res) => {
        if (res === 'delete') {
            window.history.replaceState(null, null, '/board');
            navigate('/board');
        } else {
            alert('삭제실패');
        }
        });
    };

    // 게시글 수정페이지로 
    const BoardUpdate = () => {
    navigate('/BoardUpdate/' + boardSeq);
    };

    //목록으로 가기 
    const BoardList = () => {
        navigate('/board');
    };

  return (
    <div>
    <Header/>
        <form>
        <div style={{textAlign:"center", paddingBottom:"50px",margin:"8vh auto"}}>
            <h2>공지사항 상세보기</h2>
        </div>
        <Table>
            <tbody>
            <Tr>
                <Th>제목</Th>
                <Td>{board.boardTitle}</Td>
                <Th>조회수</Th>
                <Td style={{width:"8%"}}>{board.boardViews}</Td>
            </Tr>
            <Tr>
                <Th>작성자</Th>
                <Td colSpan={4}>{board.boardUserId}</Td>
            </Tr>
            <Tr>
                <Th>내용</Th>
                <Td colSpan={4} height={100}>{board.boardContents}</Td>
            </Tr>
            </tbody>
        </Table>
        <Div>
        {userData && userData.role === 'ROLE_ADMIN' && ( // ROLE_ADMIN일 때만 버튼 표시
            <Buttonstyle onClick={BoardUpdate}>
                수정
            </Buttonstyle>
        )}
            &nbsp;
        {userData && userData.role === 'ROLE_ADMIN' && ( // ROLE_ADMIN일 때만 버튼 표시
            <Buttonstyle onClick={BoardDelete}>
                삭제
            </Buttonstyle>
        )}
            &nbsp;
            <Buttonstyle onClick={BoardList}>
                목록
            </Buttonstyle>
        </Div>
        </form>
    </div>
  );
};

//==============
// 게시글
//==============
const Table = styled.table`
	width: 1200px;
	padding-bottom: 50px;
	margin: 0 auto; /*가운데 정렬*/
`;
const Tr = styled.tr`
    border: 1px solid rgb(149, 149, 149);
`;
const Th = styled.th`
    border: 1px solid rgb(149, 149, 149);
    text-align: center;
    width: 70px;
`;
const Td = styled.td`
    border: 1px solid rgb(149, 149, 149);
    height: 50px;
    padding-left: 10px;
`;
const Div = styled.div`
    padding-top: 10px;
    text-align: center;
`;

export default BoardDetail;

