import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 56px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.menuBg};

  .categories-container {
    position: relative;
    width: 100%;
    height: 50px;
    .go-left,
    .go-right {
      position: absolute;
      top: 0;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.text};
      background: ${({ theme }) => theme.menuBg};
      opacity: 0.9;
      padding: 10px;
      z-index: 10;
      cursor: pointer;
    }

    .go-left {
    }

    .go-right {
      right: 100px;

      @media (max-width: 870px) {
        right: 0;
      }
    }

    .categories {
      display: flex;
      gap: 15px;
      padding: 15px 20px;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-x: hidden;
      overflow-y: hidden;
      scroll-behavior: smooth;
      span {
        padding: 6px 12px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.categories};
        color: ${({ theme }) => theme.text};
        border: 1px solid ${({ theme }) => theme.soft};
        font-size: 0.87rem;
        cursor: pointer;
        transition: all s ease-in-out;
        &:hover {
          background-color: ${({ theme }) => theme.soft};
        }
      }
    }
  }
`;
