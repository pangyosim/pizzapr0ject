// ReviewList.jsx

import React, { useEffect, useState } from 'react'; 
import ReviewItem from '../components/ReviewItem'; 
 
const ReviewList = () => { 
  const [reviews, setReviews] = useState([]); 
 
  useEffect(() => { 
    fetch('http://localhost:8080/review') 
      .then((res) => res.json()) 
      .then((res) => { 
        setReviews(res); 
      }); 
  }, [reviews]); 
 
  return ( 
    <div> 
      <br/>
      <h2>리뷰 리스트</h2>
      <br/>
      {reviews.map((review) => ( 
        <ReviewItem key={review.reviewSeq} review={review} /> 
      ))} 
    </div> 
  ); 
}; 
 
export default ReviewList;