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
    
    return(
        <Wrapper>
            <Sidebar width={350}>
                <Contact/>
            </Sidebar>
            <Atag href="">Bookmark</Atag>
            <Atag href="/">Login</Atag>
            <Atag href="/"> Home</Atag>
        </Wrapper>
    )
}
export default Header;
