import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const QnAItem = ({QnA}) => {
   
    return (
        <>
        <tr>
            <Td>{QnA.qaSeq}</Td>
            <td><Link to={`/qna/${QnA.qaSeq}`} className="nav-link"> {QnA.qaTitle}</Link></td>
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

