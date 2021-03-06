
import styled from "styled-components";


const CardItem = ({ children, id, pressed }) => {
  const clickItem = () => {
    pressed(id);
  };

  return <Wrapper onClick={clickItem}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 0.1rem 0rem 0.1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background-color: #222222;
  text-align: left;
  margin-bottom: 2rem;
  width: 60rem;
  border-radius: 0.7rem;

  &:hover {
    background-color: #333333;
    cursor: pointer;
  }
`;

export default CardItem;

