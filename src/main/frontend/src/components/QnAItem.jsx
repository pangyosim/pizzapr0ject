import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const QnAItem = ({QnA}) => {

    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        fetchCommentCount(QnA.qaSeq);
    }, [QnA.qaSeq]);

    const fetchCommentCount = (qaSeq) => {
        fetch(`http://localhost:8080/reply/count/${qaSeq}`)
            .then((res) => res.json())
            .then((data) => {
                setCommentCount(data);
            })
            .catch((error) => {
                console.error('Error fetching comment count:', error);
            });
    };

    return (
        <>
        <tr>
            <Td>{QnA.qaSeq}</Td>
            <td><Link to={`/qna/${QnA.qaSeq}`} className="nav-link"> {QnA.qaTitle}&nbsp;{commentCount > 0 && `[${commentCount}]`}</Link></td>
            <Td>{QnA.qaUserId}</Td>
            <Td>{QnA.qaViews}</Td>
            <Td>{QnA.qaDate}</Td>
        </tr>
        </>
    );
};
const Td= styled.td`
    text-align: center;
`;

export default QnAItem;

