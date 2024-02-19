// src/pages/Logout.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';  // Firebase 파일의 경로에 맞게 수정

const Logout = () => {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('로그아웃 성공');
            // 로그아웃 후 홈 페이지로 이동
            history.push('/');
        } catch (error) {
            console.error('로그아웃 실패', error);
        }
    };

    return (
        <>
            <h2>로그아웃 페이지</h2>
            <p>정말로 로그아웃하시겠습니까?</p>
            <button onClick={handleLogout}>로그아웃</button>
        </>
    );
};

export default Logout;