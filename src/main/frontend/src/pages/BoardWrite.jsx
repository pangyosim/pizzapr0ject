// BoardWrite.jsx

import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import Header from './Header';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => { 
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        boardUserId:'',
        boardTitle:'',
        boardContents:'',
        boardViews:'',
        boardFile:'',
    });

    const changeValue = (e) => { 
        setBoard({ 
        ...board, 
            [e.target.name]: e.target.value, 
        }); 
    }; 
 
    const submitBoard = (e) => {
        
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        fetch('http://localhost:8080/board', { 
            method: 'POST', 
            headers: { 
            'Content-Type': 'application/json; charset-utf-8', 
            }, 
            body: JSON.stringify(board), 
        }) 
        .then((res) => {
            if (res.status === 201) {
            return res.json();
            } else {
            return null;
            }
        })
        .then((res) => {
            // Catch는 여기서 오류가 나야 실행됨.
            if (res !== null) {
                navigate('/board')
            } else {
                alert('글 등록에 실패하였습니다.');
            }
        });
    };

    return ( 
        <>
        <Header/>
            <Form onSubmit={submitBoard}> 
                <br/>
                <h2>공지사항 글쓰기</h2>
                <br/>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
                    <input type="text" name="boardTitle" onChange={changeValue} className="form-control" style={{width:"900px"}} placeholder="제목을 입력하세요"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">작성자</label>
                    <input type="text" name="boardUserId" className="form-control" style={{width:"900px"}} onChange={changeValue} placeholder="로그인한 작성자"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">파일</label>
                    <input type="file" name="board" className="form-control" style={{width:"900px"}} onChange={changeValue} placeholder="로그인한 작성자"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
                    <textarea  name="boardContents" onChange={changeValue} className="form-control" style={{width:"900px"}} rows="3"></textarea>
                </div>
                <Button  variant="primary" type="submit">글쓰기</Button> 
            </Form> 
        </>
    ); 
}; 
const Form = styled.form`
    width: 1100px;
    margin-left:auto;
`;

export default BoardWrite;