import styled from "styled-components";

const HorizontalCardItem = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  .cardSubHor {
    border-radius: 2px;
    background-color: #222222;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
    text-align: left;
    width: 40rem;
    height: 12rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
    margin: 0rem 2rem 2rem 2rem;
    border-radius: 0.7rem;
  }

  .imgSubHor {
    border-radius: 0.7rem 0rem 0rem 0.7rem;
    border-right: 0.3rem solid #3273c5;
    width: 12rem;
    height: 12rem;
    margin-right: 2rem;
    object-fit: cover;
  }

  .infoSubHor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: normal;
    .infoName {
      padding-bottom: 1rem;
    }
  }

  .imgErrSubHor {
    border-radius: 0.7rem 0rem 0rem 0.7rem;
    border-right: 0.3rem solid #3273c5;
    width: 12rem;
    height: 12rem;
    margin-right: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    object-fit: cover;
  }
`;

export default HorizontalCardItem;
