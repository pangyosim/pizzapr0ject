// ReplyItem.jsx
import React from 'react';
import styled from 'styled-components';

const ReplyItem = ({reply}) => {

    return (
        <ul>
            <Li>{reply.replyUserId}</Li>
            <Li>{reply.replyContents}</Li>
            <Li>{reply.replyDate}</Li>
        </ul>
    );
};
const Li = styled.li`
    list-style-type: none;
`;

export default ReplyItem;

