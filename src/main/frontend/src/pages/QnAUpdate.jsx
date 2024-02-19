// QnAUpdate.jsx

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../pages/Header';

const QnAUpdate = () => {
    const navigate = useNavigate();
    const { qaSeq } = useParams();

    const [QnA, setQnA] = useState({
        qaUserId:'',
        qaTitle:'',
        qaContents:'',
        qaViews:'',
        qaFile:'',
      });

    useEffect(() => {
    fetch('http://localhost:8080/qna/' + qaSeq)
        .then((res) => res.json())
        .then((res) => {
        setQnA(res);
        });
    }, [qaSeq]);

    const changeValue = (e) => {
        setQnA({
            ...QnA,
            [e.target.name]: e.target.value,
        });
    };
    //목록으로 가기 
    const QnADetail = () => {
        navigate(`/qna/${qaSeq}`);
    };

    const submitUpdate = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.

        fetch('http://localhost:8080/qna/' + qaSeq, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(QnA),
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
                navigate('/qna/' + qaSeq);
            } else {
                alert('글 수정에 실패하였습니다.');
            }
        });
  };
  
  return (
    <>
    <Header/>
    <Form onSubmit={submitUpdate}>
    <br/>
        <h2>QnA 수정</h2>
    <br/>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
            <input type="text" name="qaTitle" value={QnA.qaTitle} onChange={changeValue} className="form-control" style={{width:"900px"}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">작성자</label>
            <input type="text" className="form-control" style={{width:"900px"}} readOnly value={QnA.qaUserId}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
            <textarea  name="qaContents" value={QnA.qaContents} onChange={changeValue} className="form-control" style={{width:"900px"}} rows="3"></textarea>
        </div>
        <Div>
            <Button variant="primary" type="botton" onChange={changeValue}>
                수정
            </Button>
            &nbsp;
            <Button variant="warning" type="botton" onChange={QnADetail}>
                뒤로
            </Button>
        </Div>
    </Form>
    </>
  );
};
const Form = styled.form`
    width: 900px;
    margin-left:auto;
    margin-right:auto;
`;
const Div = styled.div`
    padding-top: 10px;
    text-align: center;
`;

export default QnAUpdate;