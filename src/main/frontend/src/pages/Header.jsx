import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Contact from "../components/Contact";
const Wrapper = styled.div`
    padding: 4vh;
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
            <Sidebar width={350}>
                <Contact/>
            </Sidebar>
            <Atag href="">Bookmark</Atag>
            {!isLoggedIn && <Atag href="/Login">Login</Atag>}
            {isLoggedIn && <Atag href="#" onClick={handleLogout}>Logout</Atag>}
            <Atag href="/"> Home</Atag>
        </Wrapper>
    )
}
export default Header;
