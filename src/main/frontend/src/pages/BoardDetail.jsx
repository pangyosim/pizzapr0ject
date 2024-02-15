
// BoardDetail.jsx

import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

const BoardDetail = () => {
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

    },[]);
    

    // 게시글 삭제하기 
    const BoardDelete = () => {
    fetch('http://localhost:8080/board/' + boardSeq, {
        method: 'DELETE',
    })
        .then((res) => res.text())
        .then((res) => {
        if (res === 'delete') {
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
        <div>
            <h2>board 상세보기</h2>
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
                <Th>파일</Th>
                <Td colSpan={4}>{board.boardFile}</Td>
            </Tr>
            <Tr>
                <Th>내용</Th>
                <Td colSpan={4} height={100}>{board.boardContents}</Td>
            </Tr>
            </tbody>
        </Table>
        <Div>
            <Button variant="warning" onClick={BoardUpdate}>
                수정
            </Button>
            &nbsp;
            <Button variant="danger" onClick={BoardDelete}>
                삭제
            </Button>
            &nbsp;
            <Button variant="primary" onClick={BoardList}>
                목록
            </Button>
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

