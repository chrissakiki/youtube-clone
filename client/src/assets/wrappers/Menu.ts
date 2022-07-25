import styled from "styled-components";

export const Wrapper = styled.div`
  width: 250px;
  height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
  z-index: 100;

  background-color: ${({ theme }) => theme.menuBg};
  color: ${({ theme }) => theme.text};

  .NavLink {
    text-decoration: none;
    color: inherit;
  }

  &.showIcons {
    width: 100px;
  }

  @media (max-width: 870px) {
    position: fixed;
    top: 56px;
    display: none;

    &.showIcons {
      display: block;
    }
  }
  .container {
    .menu-items {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      /* align-items: center; */

      &.showIcons {
        .item {
          flex-direction: column;
          gap: 10px;
          padding-left: 10px;

          span {
            font-size: 0.65rem;
          }
        }
      }

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 25px;
        cursor: pointer;
        padding: 12px;
        padding-left: 40px;

        &.active {
          background-color: ${({ theme }) => theme.soft};
        }

        &:hover {
          background-color: ${({ theme }) => theme.soft};
        }

        svg {
          font-size: 1.4rem;
        }

        span {
          font-weight: 500;
        }
      }

      hr {
        margin: 15px 0 15px 0;
        border: 0.5px solid ${({ theme }) => theme.soft};
      }
    }

    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: 40px;
      gap: 10px;

      &.showIcons {
        padding-left: 10px;

        p {
          display: none;
        }

        .btn,
        .btn-logout {
          border: none;
          flex-direction: column;
          font-size: 0.7rem;
          color: ${({ theme }) => theme.text};

          padding: 10px 0 0 18px;

          &:hover {
            color: ${({ theme }) => theme.textSoft};
            transition: all 0.2s ease-in-out;
          }
          svg {
            font-size: 1.4rem;
          }

          span {
          }
        }

        .btn-logout {
          padding: 10px 0 0 14px;
        }
      }

      p {
        font-size: 0.9rem;
        line-height: 1.4;
      }
      .btn,
      .btn-logout {
        padding: 10px 20px;
        background-color: transparent;
        border: 1px solid #3ea6ff;
        outline: none;
        color: #3ea6ff;
        border-radius: 3px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 1rem;

        svg {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
      }
    }
  }
`;
