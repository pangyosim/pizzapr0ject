// ReviewItem.jsx
import React from 'react';
import styled from 'styled-components';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
 
const ReviewItem = ({review}) => {   
    const navigate = useNavigate();
  
    const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.starRating);
    const remainder = review.starRating - fullStars;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} color="orange" />);
    }

    // Render half star if remainder is greater than 0 but less than 1
    if (remainder > 0 && remainder < 1) {
        stars.push(<FaStarHalf key="half" color="orange" />);
    }

    return stars;
    };

    // 게시글 삭제하기 
    const reviewDelete = () => {
      fetch('http://localhost:8080/review/' + review.reviewSeq, {
          method: 'DELETE',
      })
          .then((res) => res.text())
          .then((res) => {
          if (res === 'delete') {
              navigate('/reviewList');
          } else {
              alert('삭제실패');
          }
          });
      };
  
    return ( 
    <div >
        <Ul> 
            <Li>지점마다 들어갈 내용 </Li>
            <Li>{review.reviewContents}</Li> 
            <Li style={{fontSize:"13px"}}>{review.reviewDate}</Li>
            <Li style={{fontSize:"13px"}}>{review.reviewUserId}</Li>
            <Li style={{fontSize:"13px"}}>{renderStars()} {review.starRating}</Li>
            <button onClick={reviewDelete}>
            삭제
            </button>
        </Ul>
    </div> 
    ); 
}; 
const Ul = styled.ul`
    width: 270px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
`;
const Li = styled.li`
    list-style-type: none;
`;

 
export default ReviewItem;