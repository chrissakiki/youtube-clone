import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    background-color: ${({ theme }) => theme.bg};
    display: grid;
    grid-template-columns: auto 1fr;

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }

    .layout {
      width: 100%;
    }
  }
`;
