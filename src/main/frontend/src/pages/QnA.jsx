import React, { useEffect, useState } from 'react';
import QnAItem from '../components/QnAItem';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../pages/Header';
import styled from "styled-components";

const QnA = () => {
    const [QnAs, setQnAs] = useState([]);
    const [boards, setBoards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [postsPerPage] = useState(5); // 한 페이지 당 보여줄 게시글 수
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [searchType, setSearchType] = useState('qaTitle'); // 검색 타입
    // eslint-disable-next-line
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가


    useEffect(() => {
        fetchQnAData();
        fetchBoardData();
        
        const fetchUserData = async () => {
            try {
                // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
                const user = JSON.parse(localStorage.getItem('userData'));
                if (user) {
                    setUserData(user);
                    console.log(user.role); // role 값 확인
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);

    const fetchQnAData = () => {
        fetch('http://localhost:8080/qna')
            .then((res) => res.json())
            .then((res) => {
                const sortedQnAs = res.sort((a, b) => b.qaSeq - a.qaSeq);
                setQnAs(sortedQnAs);
            });
    }

    const fetchBoardData = () => {
        fetch('http://localhost:8080/board')
            .then((res) => res.json())
            .then((res) => {
                const sortedBoards = res.sort((a, b) => b.boardSeq - a.boardSeq);
                setBoards(sortedBoards);
            });
    }


    // 게시글 필터링 함수
    const filteredPosts = QnAs.filter((QnA) => {
        if (searchTerm.trim() === '') {
            return true;
        }
        const trimmedSearchTerm = searchTerm.trim().toLowerCase(); 
        if (searchType === 'qaTitle') {
            return (
                QnA.qaTitle &&
                QnA.qaTitle.trim().toLowerCase().includes(trimmedSearchTerm)
            );
        } else if (searchType === 'qaUserId') {
            return (
                QnA.qaUserId &&
                QnA.qaUserId.trim().toLowerCase().includes(trimmedSearchTerm)
            );
        } else if (searchType === 'qaContents') {
            return (
                QnA.qaContents &&
                QnA.qaContents.trim().toLowerCase().includes(trimmedSearchTerm)
            );
        }
        return false;
    });
    
    // 현재 페이지의 게시글을 계산하는 함수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호를 변경하는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 전체 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 검색 타입 변경 핸들러
    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    }

    // form submit 방지 함수
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Header />
            <Form onSubmit={handleFormSubmit}>
                <Div>
                    <h2>QnA 게시판</h2>
                </Div>
                <div style={{ float: "right", paddingBottom: "30px" }}>
                    <select value={searchType} onChange={handleSearchTypeChange}>
                        <option value="qaTitle">제목</option>
                        <option value="qaUserId">작성자</option>
                        <option value="qaContents">내용</option>
                    </select>
                    <input type='text' name='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <Th style={{ width: "8%" }}>NO</Th>
                            <Th style={{ width: "55%" }}>제목</Th>
                            <Th style={{ width: "10%" }}>작성자</Th>
                            <Th style={{ width: "10%" }}>조회수</Th>
                            <Th style={{ width: "14%" }}>작성일</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.slice(0, 5).map((board, index) => (
                            <tr key={index}>
                                <Td>{board.boardSeq}</Td>
                                <td><Link to={`/board/${board.boardSeq}`} style={{ color: "green", textDecoration: "none" }}>[공지] {board.boardTitle}</Link></td>
                                <Td>{board.boardUserId}</Td>
                                <Td>{board.boardViews}</Td>
                                <Td>{board.boardDate}</Td>
                            </tr>
                        ))}
                        {currentPosts.map((QnA) => (
                            <QnAItem key={QnA.qaSeq} QnA={QnA} />
                        ))}
                    </tbody>
                </table>
                <Div>
                    <Button variant="warning" style={{ float: "right" }}>
                        <Link to="/qnaWrite" className="nav-link">글쓰기</Link>
                    </Button>
                </Div>
                <div style={{ paddingBottom: "70px" }}>
                {pageNumbers.length > 0 && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <Link to="#" className="page-link" aria-label="Previous" onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)} >
                                    <span aria-hidden="true">&laquo;</span>
                                </Link>
                            </li>
                            {pageNumbers.map(number => (
                                <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                                    <Link to="#" className="page-link" onClick={() => paginate(number)} >
                                        {number}
                                    </Link>
                                </li>
                            ))}
                            <li className="page-item">
                                <Link to="#" className="page-link" aria-label="Next" onClick={() => paginate(currentPage === Math.ceil(QnAs.length / postsPerPage) ? currentPage : currentPage + 1)} >
                                    <span aria-hidden="true">&raquo;</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
                </div>
            </Form>
        </div>
    );
};

const Form = styled.form`
    width: 1100px;
    margin-left:auto;
    margin-right:auto;
`;
const Div = styled.div`
    padding-bottom: 50px;
`;
const Th = styled.th`
    text-align: center;
`;
const Td = styled.td`
    text-align: center;
`;

export default QnA;
