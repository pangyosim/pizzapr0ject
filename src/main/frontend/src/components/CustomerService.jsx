import styled from "styled-components";

const Wrapdiv = styled.div`
    width: 20vh;
    height: 9.5vh;
    margin-top: 7vh;
    margin-left: 3vh;
    background-color: #aaaaaa;
    cursor: pointer;
    border-radius: 10px;
    transition: 0.1s linear;
    &:hover{
        background-color: #b3b3b3;
        transform: scale(1.02);
    }
    display: flex;
    align-items: center;
`;
const CustomerServicep = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: white;
    margin: 0 auto;
`;
const CustomerService = () => {

    return(
        <Wrapdiv>
            <CustomerServicep>About</CustomerServicep>
        </Wrapdiv>
    )
}

export default CustomerService;