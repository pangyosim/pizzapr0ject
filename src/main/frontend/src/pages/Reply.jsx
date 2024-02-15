// Reply.jsx
import React, { useState, useEffect } from 'react';
import ReplyItem from '../components/ReplyItem';

const Reply = ({QnA}) => {
    // console.log(QnA.qaSeq);
    const [replys, setReplys] = useState([]); 
    
    useEffect(() => {
        console.log(QnA.qaSeq);
        fetch('http://localhost:8080/qna/'+ QnA.qaSeq)
            .then((res) => res.json())
            .then((res) => {
                setReplys(res);
            });
    }, []);

    return (
        <div>
            <form>
            <div>
                <h2>댓글 리스트</h2>
            </div>
            <div>
                    {Array.isArray(replys) && replys.map((reply) => (
                        <ReplyItem key={reply.replySeq} reply={reply} />
                    ))}
            </div>
            </form>
        </div>
    );
};

export default Reply;

