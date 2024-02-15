
//QnA.jsx

import React, { useEffect, useState, useRef } from 'react';
import QnAItem from '../components/QnAItem';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from './Header';
import styled from "styled-components";

 
const QnA = () => { 
    const [QnAs, setQnAs] = useState([]);
    const [boards, setBoards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [currentPage1, setCurrentPage1] = useState(1); // 현재 페이지 번호
    const [postsPerPage] = useState(5); // 한 페이지 당 보여줄 게시글 수
    const [postsPerPage1] = useState(5); // 한 페이지 당 보여줄 게시글 수
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
    const check = useRef(false);

    useEffect(() => {
        fetchQnAData();
        fetchBoardData();
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

    //============
    // 페이징처리 기능 
    //============

    // 현재 페이지의 게시글을 계산하는 함수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = QnAs ? QnAs.slice(indexOfFirstPost, indexOfLastPost) : [];
    const currentPosts = QnAs.slice(indexOfFirstPost, indexOfLastPost);


    // 페이지 번호를 변경하는 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // 전체 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(QnAs.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

//----------------------------------------------------------------------------
    // 현재 페이지의 게시글을 계산하는 함수
    const indexOfLastPost1 = currentPage1 * postsPerPage1;
    const indexOfFirstPost1 = indexOfLastPost1 - postsPerPage1;
    // const currentPosts = QnAs ? QnAs.slice(indexOfFirstPost, indexOfLastPost) : [];
    const currentPosts1 = QnAs.slice(indexOfFirstPost1, indexOfLastPost1);

    // 페이지 번호를 변경하는 함수
    const paginate1 = (pageNumber1) => {
        setCurrentPage1(pageNumber1);
    }

    // 전체 페이지 수 계산
    const pageNumbers1 = [];
    for (let i = 1; i <= Math.ceil(QnAs.length / postsPerPage1); i++) {
        pageNumbers1.push(i);
    }
    // 검색 결과에 따라 pageNumbers1 업데이트하는 함수 추가
    const updatePageNumbers1 = (searchResults) => {
        const newPageNumbers1 = [];
        for (let i = 1; i <= Math.ceil(searchResults.length / postsPerPage1); i++) {
            newPageNumbers1.push(i);
        }
        setCurrentPage1(1); // 페이지를 1페이지로 설정
    }
//----------------------------------------------------------------------------


    //============
    //   검색기능 
    //============

    // 검색어 입력 시 처리하는 함수
    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
        check.current = false; // 검색어가 변경되면 false로 변경
    }

    // 검색 함수
    const search = () => {
        // 선택한 검색 옵션 가져오기
        const selectedOption = document.querySelector('select').value;

        if (selectedOption === "qaTitle") {
            searchByTitle();
        } else if (selectedOption === "qaUserId") {
            searchByUser();
        }
    }

    // 제목으로 검색하는 함수
    const searchByTitle = () => {
        fetch(`http://localhost:8080/qna/search?qaTitle=${searchKeyword}`)
            .then((res) => res.json())
            .then((res) => {
                const sortedQnAs = res.content.sort((a, b) => b.qaSeq - a.qaSeq);
                setQnAs(sortedQnAs);
                updatePageNumbers1(sortedQnAs); // pageNumbers1 업데이트
                setCurrentPage1(1); // 검색 후 1페이지로 설정
                check.current = true; // 검색 후 true로 변경
            })
            .catch((error) => {
                console.error('Error searching by title:', error);
            });
    }

    // 작성자로 검색하는 함수
    const searchByUser = () => {
        fetch(`http://localhost:8080/qna/search?qaUserId=${searchKeyword}`)
            .then((res) => res.json())
            .then((res) => {
                const sortedQnAs = res.content.sort((a, b) => b.qaSeq - a.qaSeq);
                setQnAs(sortedQnAs);
                updatePageNumbers1(sortedQnAs); // pageNumbers1 업데이트
                setCurrentPage1(1); // 검색 후 1페이지로 설정
                check.current = true; // 검색 후 true로 변경
            })
            .catch((error) => {
                console.error('Error searching by user:', error);
            });
    } 


    // form submit 방지 함수
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    return ( 
    <div> 
        <Header/>
        <Form onSubmit={handleFormSubmit}>
        <Div>
            <h2>QnA 게시판</h2>
        </Div>
        <div style={{float:"right", paddingBottom:"30px"}}>
            <select>
                <option value="qaTitle">제목</option>
                <option value="qaUserId">작성자</option>
            </select>
            <input type='text' name='search' onChange={handleSearchKeywordChange}/>
            <button onClick={search}>검색</button>
        </div>
        <table className="table">
            <thead>
            <tr>
                <Th style={{width:"8%"}}>NO</Th>
                <Th style={{width:"55%"}}>제목</Th>
                <Th style={{width:"10%"}}>작성자</Th>
                <Th style={{width:"10%"}}>조회수</Th>
                <Th style={{width:"14%"}}>작성일</Th>
            </tr>
            </thead>
            <tbody>
            {boards.slice(0, 5).map((board, index) => (
            <tr key={index}>
                <Td>{board.boardSeq}</Td>
                <td><Link to={`/board/${board.boardSeq}`} style={{color:"green",textDecoration:"none"}}>[공지] {board.boardTitle}</Link></td>
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
            <Button variant="warning" style={{float:"right"}}>
            <Link to ="/qnaWrite" className="nav-link">글쓰기</Link>
            </Button>
        </Div>
        <div style={{paddingBottom: "70px"}}>
            <nav aria-label="Page navigation example">
            {check.current ? ( // 검색이 이루어진 경우
    <ul className="pagination">
    <li className="page-item">
        <Link to="#" className="page-link" aria-label="Previous" onClick={() => paginate1(currentPage1 === 1 ? 1 : currentPage1 - 1)} >
            <span aria-hidden="true">&laquo;</span>
        </Link>
    </li>
    {pageNumbers1.map(number => (
        <li key={number} className={`page-item ${number === currentPage1 ? 'active' : ''}`} >
            <Link to="#" className="page-link" onClick={() => paginate1(number)} >
                {number}
            </Link>
        </li>
    ))}
    <li className="page-item">
        <Link to="#" className="page-link" aria-label="Next"  onClick={() => paginate1(currentPage1 === Math.ceil(QnAs.length / postsPerPage1) ? currentPage1 : currentPage1 + 1)} >
            <span aria-hidden="true">&raquo;</span>
        </Link>
    </li>
</ul>
) : ( // 검색이 이루어지지 않은 경우
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
            <Link to="#" className="page-link" aria-label="Next"  onClick={() => paginate(currentPage === Math.ceil(QnAs.length / postsPerPage) ? currentPage : currentPage + 1)} >
                <span aria-hidden="true">&raquo;</span>
            </Link>
        </li>
    </ul>
)}



            </nav>
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
const Td= styled.td`
    text-align: center;
`;

export default QnA;

