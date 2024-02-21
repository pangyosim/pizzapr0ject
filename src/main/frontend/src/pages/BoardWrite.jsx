// BoardWrite.jsx

import React, { useState,useEffect } from 'react';
import Header from '../pages/Header';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => { 
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // 사용자 정보 상태 추가
    const [board, setBoard] = useState({
        boardUserId:'',
        boardTitle:'',
        boardContents:'',
        boardViews:'',
        boardFile:'',
    });

    useEffect(() => {
        // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setUserData(user);
            // 사용자 정보를 가져와서 상태에 설정
            setBoard({
                ...board,
                boardUserId: user.id, // 사용자 아이디를 작성자 필드에 설정
                
            });
        }
    }, [board]);
    
    const changeValue = (e) => { 
        setBoard({ 
        ...board, 
            [e.target.name]: e.target.value, 
        }); 
    }; 
 
    const submitBoard = (e) => {
        
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        if (board.boardTitle.trim() === '') { // 제목이 빈칸인 경우
            alert('제목을 입력해주세요.');
        } else if(board.boardContents.trim() === ''){ // 내용이 빈칸인 경우
            alert('내용을 입력해주세요.');
        }else {
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
        }
    };

    return ( 
        <>
        <Header/>
            <Form onSubmit={submitBoard} style={{margin:"10vh 50vh"}}> 
                <Div>
                    <h2>공지사항 작성</h2>
                </Div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
                    <input type="text" name="boardTitle" onChange={changeValue} className="form-control" style={{width:"900px"}} placeholder="제목을 입력하세요"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">작성자</label>
                    <input type="text" name="qaUserId" className="form-control" style={{width:"900px"}} value={userData ? userData.id : ''} readOnly /> {/* readOnly로 설정하여 사용자가 수정하지 못하게 함 */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
                    <textarea  name="boardContents" onChange={changeValue} className="form-control" style={{width:"900px"}} rows="3"></textarea>
                </div>
                <Div>
                    <ButtonStyle type="submit">글쓰기</ButtonStyle> 
                </Div>
            </Form> 
        </>
    ); 
}; 
const Form = styled.form`
    width: 1100px;
    margin-left:auto;
`;
const Div = styled.div`
    padding-top: 10px;
    text-align: center;
    padding-right: 200px;
`;
const ButtonStyle = styled.button`
    width: 11vh;
    height: 4.5vh;
    border: none;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 17px;
    font-weight: bold;
    font-style: normal;
    color: white;
    cursor: pointer;
    background-color: darkblue;
    transition: 0.1s linear;
    text-decoration: none;
    &:hover {
        background-color: #0002ab;
        transform: scale(1.02);
        text-decoration: none;
    }
`

export default BoardWrite;