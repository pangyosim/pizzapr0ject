// ReviewWrite.jsx

import React, { useState } from 'react'; 
import { Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import StarInput from '../components/StarInput';

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;
 
const ReviewWrite = (props) => { 

  const navigate = useNavigate();
  const [review, setReview] = useState({
    reviewUserId:'',
    reviewContents:'',
    krnbrm:'',
  }); 
  const [rating, setRating] = useState(0);
  
  const handleClickRating = (value) => {
    setRating(value);
    setReview({
        ...review,
        starRating: value // 클릭한 별점 값을 review 객체의 starRating에 설정
    });
  };
 
  const changeValue = (e) => { 
    setReview({ 
      ...review, 
      [e.target.name]: e.target.value, 
    }); 
  }; 
 
  const submitReview = (e) => { 
    e.preventDefault(); 
    fetch('http://localhost:8080/review', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json; charset-utf-8', 
      }, 
      body: JSON.stringify(review), 
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
        navigate('/reviewList');
      } else {
        alert('글 등록에 실패하였습니다.');
      }
    });
};
 
  return ( 
    <div>
        <br/>
        <h2>리뷰작성</h2>
        <br/>
        <form onSubmit={submitReview}> 
            <div> 
                <label>아이디</label> 
                <input type='text' name="reviewUserId" onChange={changeValue} /> 
            </div>            
            <div> 
                <label>지점</label> 
                <input type='text' name="krnbrm" onChange={changeValue} /> 
            </div>
            <div>
                <label>별점</label>
                <Base>
                    <RatingField>
                        <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
                        <StarInput onClickRating={handleClickRating} value={4.5} isHalf={true} />
                        <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />
                        <StarInput onClickRating={handleClickRating} value={3.5} isHalf={true} />
                        <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />
                        <StarInput onClickRating={handleClickRating} value={2.5} isHalf={true} />
                        <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />
                        <StarInput onClickRating={handleClickRating} value={1.5} isHalf={true} />
                        <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
                        <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} />
                    </RatingField>
                    <RatingValue>{rating}</RatingValue>
                </Base>
            </div>
            <div> 
                <label>내용</label> 
                <textarea 
                rows={3} 
                name="reviewContents" 
                onChange={changeValue} 
                /> 
            </div> 
            <Button type="submit">글쓰기</Button> &nbsp;&nbsp;
            <Button type="reset">취소</Button> 
        </form> 
    </div>
  ); 
}; 
 
export default ReviewWrite;