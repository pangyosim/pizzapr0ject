// ReplyItem.jsx
import React from 'react';
import styled from 'styled-components';

const Spanstyle = styled.span`
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    font-style: normal;
`
const ReplyItem = ({reply}) => {

    return (
        <ul>
            <Spanstyle style={{fontFamily:"Ubuntu"}}>{reply.replyUserId}</Spanstyle><br></br>
            <span>{reply.replyContents}</span><br></br>
            <span>{reply.replyDate}</span>
        </ul>
    );
};

export default ReplyItem;

