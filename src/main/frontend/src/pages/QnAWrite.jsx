// QnAWrite.jsx

import React, { useState,useEffect } from 'react';
import Header from '../pages/Header';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const QnAWrite = () => { 
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // 사용자 정보 상태 추가
    const [QnA, setQnA] = useState({
    qaUserId:'',
    qaTitle:'',
    qaContents:'',
    qaViews:'',
    qaFile:'',
    });

    useEffect(() => {
        // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setUserData(user);
            // 사용자 정보를 가져와서 상태에 설정
            setQnA({
                ...QnA,
                qaUserId: user.id, // 사용자 아이디를 작성자 필드에 설정
            });
        }
    }, [QnA]);

    const changeValue = (e) => { 
    setQnA({ 
        ...QnA, 
            [e.target.name]: e.target.value, 
        }); 
    }; 
 
    const submitQnA = (e) => {
        
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        if (QnA.qaTitle.trim() === '') { // 제목이 빈칸인 경우
            alert('제목을 입력해주세요.');
        } else if(QnA.qaContents.trim() === ''){ // 내용이 빈칸인 경우
            alert('내용을 입력해주세요.');
        }else {
            fetch('http://localhost:8080/qna', { 
                method: 'POST', 
                headers: { 
                'Content-Type': 'application/json; charset-utf-8', 
                }, 
                body: JSON.stringify(QnA), 
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
                    navigate('/qna')
                } else {
                    alert('글 등록에 실패하였습니다.');
                }
            });
        }
    };

    return ( 
        <>
        <Header/>
            <Form onSubmit={submitQnA} style={{marginTop:"10vh"}}> 
                <br/>
                <h2>QnA 글쓰기</h2>
                <br/>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
                    <input type="text" name="qaTitle" onChange={changeValue} className="form-control" style={{width:"900px"}} placeholder="제목을 입력하세요"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">작성자</label>
                    <input type="text" name="qaUserId" className="form-control" style={{width:"900px"}} value={userData ? userData.id : ''} readOnly /> {/* readOnly로 설정하여 사용자가 수정하지 못하게 함 */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
                    <textarea  name="qaContents" onChange={changeValue} className="form-control" style={{width:"900px"}} rows="3"></textarea>
                </div>
                <Link to="/qna"><Buttonstyle>&lsaquo; 뒤로가기</Buttonstyle></Link>
                <ButtonStyle type="submit">글쓰기</ButtonStyle>
            </Form> 
        </>
    ); 
}; 
const Form = styled.form`
    width: 1100px;
    margin: 0 auto;
    padding-left: 100px;
`;


const ButtonStyle = styled.button`
    margin-left: 83vh;
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
export default QnAWrite;