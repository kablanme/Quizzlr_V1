import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #f1c111;
  padding: 20px;
  text-align: center;

  p {
    font-size: 1.5rem;
    color:#212f55;
    margin:100px 25px;
    text-align: left;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userSwiped: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1.25rem;
    font-weight:bold;
    text-align:left;
    width: 450px;
    min-height: 70px;
    margin: 0.5px 0;
    margin-left: -100px;
    padding: 2px 2px 2px 150px;
    transform: rotate(-15deg);
    background: ${({ correct, userSwiped }) =>
      correct
        ? '#212f55'
        : !correct && userSwiped
        ? '#ff0000'
        : '#f1c111'};
    border: 3px solid #212f55;
    border-radius: 20px;
    color: ${({ correct, userSwiped }) =>
    correct
      ? '#ffffff'
      : !correct && userSwiped
      ? '#212f55'
      : '#212f55'};
      animate: ${({ correct, userSwiped }) =>
      correct
        ? 'x:0'
        : !correct && userSwiped
        ? 'x:-25px'
        : 'x:-100px'};
  }
`;
