import styled from "styled-components";
import categoryimg from '../img/category.png';

const Wrapper = styled.div`
    padding: 30px;
`;
const Imgtag = styled.img`
    width:35px;
    height: 35px;
    cursor: pointer;
    &:hover{
        
    }
`;
const Atag = styled.a`
    font-family: sans-serif;
    float: right;
    justify-content: space-between;
    color: black;
    text-decoration: none;
    font-size: 25px;
    cursor: pointer;
    &:hover {
        color: #bdbebd;
    }
    margin-right: 100px;
`;

const Header = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const handleLogout = () => {
     // 모든 localStorage 데이터 제거
     localStorage.clear();
     window.location.reload();
    };
    return(
        <Wrapper>
            <Atag href="">Bookmark</Atag>
            {!isLoggedIn && <Atag href="/Login">Login</Atag>}
            {isLoggedIn && <Atag href="#" onClick={handleLogout}>Logout</Atag>}
            <Atag href="/"> Home</Atag>
            <Imgtag src={categoryimg}></Imgtag>
        </Wrapper>
    )
}
export default Header;