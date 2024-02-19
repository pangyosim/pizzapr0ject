// BoardUpdate.jsx

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../pages/Header';

const BoardUpdate = () => {
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
    fetch('http://localhost:8080/board/' + boardSeq)
        .then((res) => res.json())
        .then((res) => {
            setBoard(res);
        });

    }, [boardSeq]);

    const changeValue = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    };
    //목록으로 가기 
    const boardDetail = () => {
        navigate(`/board/${boardSeq}`);
    };

    const submitUpdate = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        fetch('http://localhost:8080/board/' + boardSeq, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(board),
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .then((res) => {
            if (res !== null) {
                navigate('/board/' + boardSeq);
            } else {
                alert('글 수정에 실패하였습니다.');
            }
        });
  };
  
  return (
    <>
    <Header/>
    <Form onSubmit={submitUpdate}>
    <Div>
        <h2>공지사항 수정</h2>
    </Div>
    <br/>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
            <input type="text" name="boardTitle" value={board.boardTitle} onChange={changeValue} className="form-control" style={{width:"900px"}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">작성자</label>
            <input type="text" className="form-control" style={{width:"900px"}} readOnly value={board.boardUserId}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
            <textarea  name="boardContents" value={board.boardContents} onChange={changeValue} className="form-control" style={{width:"900px"}} rows="3"></textarea>
        </div>
        <Div>
            <Button variant="primary" type="botton" onChange={changeValue}>
                수정
            </Button>
            &nbsp;
            <Button variant="warning" type="botton" onChange={boardDetail}>
                뒤로
            </Button>
        </Div>
    </Form>
    </>
  );
};
const Form = styled.form`
    width: 1100px;
    margin-left:auto;
    padding-left: 50px;
`;
const Div = styled.div`
    padding-top: 10px;
    text-align: center;
    padding-right: 200px;
`;

export default BoardUpdate;