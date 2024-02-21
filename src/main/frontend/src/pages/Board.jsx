// Board.jsx
import React, { useEffect,useState } from 'react';
import Header from '../pages/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BoardItem from '../components/BoardItem';

const Board = () => {
    
    const [boards, setBoards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [postsPerPage] = useState(5); // 한 페이지 당 보여줄 게시글 수  
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가

    useEffect(() => { 
    fetch('http://localhost:8080/board') 
        .then((res) => res.json()) 
        .then((res) => { 
            const sortedBoards = res.sort(function(a, b) {
                return new Date(a.boardDate).getTime() - new Date(b.boardDate).getTime()}).reverse();
            setBoards(sortedBoards);
        }); 

        const fetchUserData = async () => {
            try {
                // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
                const user = JSON.parse(localStorage.getItem('userData'));
                if (user) {
                    setUserData(user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []); 


    // 현재 페이지의 게시글을 계산하는 함수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = boards.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호를 변경하는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 전체 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(boards.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <div>
        <Header/>
        <Form>
        <div style={{paddingBottom:"50px"}}>
            <h2>공지사항</h2>
        </div>
        <div>
            {currentPosts.map((board) => ( 
                <BoardItem key={board.boardSeq} board={board}/>
            ))} 
        </div>
        {userData && userData.role === 'ROLE_ADMIN' && ( // ROLE_ADMIN일 때만 버튼 표시
        <Div>
            <ButtonStyle style={{float:"right"}}>
                <Link to ="/boardWrite" className="nav-link">글쓰기</Link>
            </ButtonStyle>
        </Div>
        )}
        <div style={{paddingBottom: "70px"}}>
        {pageNumbers.length > 0 && (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <Link to="#" className="page-link" aria-label="Previous" onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <Link to="#" className="page-link" onClick={() => paginate(number)}>
                                {number}
                            </Link>
                        </li>
                        ))}
                    <li className="page-item">
                        <Link to="#" className="page-link" aria-label="Next" onClick={() => paginate(currentPage === Math.ceil(boards.length / postsPerPage) ? currentPage : currentPage + 1)}>
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
    width: 950px;
    margin-left:auto; 
    margin-right:auto;
    margin-top: 10vh;
`;
const Div = styled.div`
    padding-bottom: 70px;
`;
const ButtonStyle = styled.button`
    width: 11vh;
    height: 4.5vh;
    border: none;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 17px;
    font-weight: bold;
    font-style: normal;
    color: white;
    cursor: pointer;
    background-color: darkblue;
    transition: 0.1s linear;
    text-decoration: none;
    &:hover {
        background-color: #0002ab;
        transform: scale(1.02);
        text-decoration: none;
    }
`

export default Board;

