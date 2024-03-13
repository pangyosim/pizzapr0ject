import styled from "styled-components";

const Menutitle = styled.p`
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    margin-left: 1.5vh;
`;

const Menucontent = styled.a`
    color: black;
    font-size: 15px;
    text-decoration: none;
    margin-left: 1.5vh;
    cursor : pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const Contact = () => {
    return(
        <div style={{width:"35vh", height:"80vh"}}>
            <Menutitle>안내</Menutitle>
            <hr></hr>
            <Menucontent href="/board">공지사항</Menucontent><br></br>
            <Menucontent href="/qna"> Q&A</Menucontent>
            <br></br><br></br><br></br><br></br>
            <Menutitle>은행</Menutitle>
            <hr></hr>
            <Menucontent href="/map">내 근처 은행</Menucontent>
            <br></br><br></br><br></br><br></br>
            
            <Menutitle>주차장</Menutitle>
            <hr></hr>
            <Menucontent href="/park">내 근처 주차장</Menucontent>
        </div>
    )
}
export default Contact;