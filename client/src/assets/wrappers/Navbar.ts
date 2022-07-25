import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.menuBg};
  height: 56px;
  z-index: 1000;
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;

    border-bottom: 0.5px solid ${({ theme }) => theme.soft};

    @media (max-width: 700px) {
      padding: 0;
    }

    .header {
      display: flex;
      padding-left: 20px;
      gap: 20px;
      @media (max-width: 480px) {
        padding-left: 10px;
      }
      .burger {
        margin-top: 4px;
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.text};
      }

      .logo-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        .logo {
          font-size: 2rem;
          color: red;
        }

        span {
          font-size: 1.2rem;
          font-weight: 600;
          color: ${({ theme }) => theme.text};
        }
      }
    }

    .input-container {
      padding: 3px 0;
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      border: 1px solid #ccc;
      border-radius: 3px;
      @media (max-width: 580px) {
        display: none;
        position: absolute;
        top: 50px;
        right: 100px;
        background-color: ${({ theme }) => theme.menuBg};
        width: 60%;
        &.active {
          display: flex;
        }
      }
      input[type="text"] {
        width: 100%;
        background: transparent;
        padding: 5px;
        height: 100%;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.text};

        @media (max-width: 580px) {
          padding: 7px 5px;
        }
      }

      svg {
        margin-right: 5px;
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.textSoft};
      }
    }

    .btn {
      padding: 3px 12px;
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

      @media (max-width: 700px) {
        margin-right: 10px;
      }

      svg {
        font-size: 1.2rem;
        margin-bottom: 5px;
      }
    }

    .right-container {
      margin-right: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      font-weight: 500;
      color: ${({ theme }) => theme.text};

      .search-icon-mobile {
        display: none;

        @media (max-width: 580px) {
          display: flex;
          font-size: 1.5rem;
          color: ${({ theme }) => theme.text};
        }
      }

      svg {
        font-size: 1.7rem;
        cursor: pointer;
      }
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${({ theme }) => theme.textSoft};
        object-fit: cover;
        cursor: pointer;
      }
    }
  }

  .user-navbar {
    position: absolute;
    display: none;
    top: 60px;
    right: 10px;
    background-color: ${({ theme }) => theme.menuBg};
    border-radius: 3px;
    color: ${({ theme }) => theme.textSoft};

    &.show {
      display: block;
    }
    .top {
      display: flex;
      gap: 10px;
      padding: 15px;
      .left {
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: ${({ theme }) => theme.textSoft};
          object-fit: cover;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 0.85rem;

        p:first-child {
          font-weight: 600;
        }
      }
    }

    hr {
      margin-top: 4px;
      border: 0.5px solid ${({ theme }) => theme.soft};
    }

    .bottom {
      display: flex;
      flex-direction: column;
      padding: 5px 0;

      span,
      label {
        padding: 15px;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        &:hover {
          background-color: ${({ theme }) => theme.soft};
        }

        svg {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
