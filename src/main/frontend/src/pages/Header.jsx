import styled from "styled-components";
import categoryimg from '../img/category.png';
import { NavLink } from "react-router-dom";

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
    return(
        <Wrapper>
            <Atag href="">Bookmark</Atag>
            <Atag href="/">Login</Atag>
            <Atag href="/"> Home</Atag>
            <NavLink to={"/map"}>
                <Imgtag src={categoryimg}></Imgtag>
            </NavLink>
        </Wrapper>
    )
}
export default Header;