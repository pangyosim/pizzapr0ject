import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1.5rem;
  color: lightgray;

  ${({ isHalf }) =>
    isHalf &&
    css`
      position: absolute;
      width: 12px;
      overflow: hidden;

      &:nth-of-type(10) {
        transform: translate(-108px);
      }
      &:nth-of-type(8) {
        transform: translate(-84px);
      }
      &:nth-of-type(6) {
        transform: translate(-60px);
      }
      &:nth-of-type(4) {
        transform: translate(-36px);
      }
      &:nth-of-type(2) {
        transform: translate(-12px);
      }
    `}
`;

const StarInput = ({ onClickRating, value, isHalf }) => {
  const handleClickRatingInput = (value) => {
    console.log(isHalf);
    console.log("StarInput",value);
    onClickRating(value);
  };

  return (
    <>
      <Input type="radio" name="rating" id={`star${value}`} value={value} />
      <Label
        // onClick={handleClickRatingInput} 이렇게 쓰면 안되는 이유 작성하기
        onClick={() => handleClickRatingInput(value)}
        isHalf={isHalf}
        htmlFor={`star${value}`}
      >
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </Label>
    </>
  );
};

export default StarInput;
