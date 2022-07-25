import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 50px;
  @media (max-width: 580px) {
    margin-top: 60px;
  }

  .container {
    padding: 20px;
    min-height: calc(100vh - 96px);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 15px;
    @media (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 870px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 580px) {
      padding: 0 20px;
      grid-template-columns: 1fr;
    }

    .not-found {
      color: ${({ theme }) => theme.textSoft};
      font-size: 1.4rem;
    }
  }
`;
