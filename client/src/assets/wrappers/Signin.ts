import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;

  justify-content: center;
  color: ${({ theme }) => theme.text};

  .container {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.menuBg};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 30px 50px;
    gap: 15px;
    box-shadow: 8px 8px 22px rgba(0, 0, 0, 0.2);

    @media (max-width: 480px) {
      width: 95%;
      padding: 30px 25px;
    }

    .btn-google {
      border: none;
      border-bottom: 1px solid #999;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.menuBg};
      padding: 10px 5px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      color: ${({ theme }) => theme.textSoft};
      cursor: pointer;
      box-shadow: 8px 8px 22px rgba(0, 0, 0, 0.2);

      svg {
        font-size: 1.5rem;
      }
    }

    .or {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
      font-size: 0.85rem;
      margin-top: 10px;
      span:first-child,
      span:last-child {
        height: 1px;
        width: 100%;
        background-color: #999;
        opacity: 0.5;
      }
    }

    .title {
      font-size: 2rem;
      margin-bottom: 20px;

      font-weight: 400;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;

      input[type="text"],
      input[type="password"],
      input[type="email"] {
        width: 100%;
        border: 1px solid ${({ theme }) => theme.soft};
        border-radius: 3px;
        padding: 10px;
        background-color: transparent;
        outline: none;
        color: ${({ theme }) => theme.textSoft};
      }
    }

    .btn {
      border-radius: 3px;
      border: none;
      padding: 12px 24px;
      cursor: pointer;
      font-weight: 500;
      background-color: ${({ theme }) => theme.soft};
      color: ${({ theme }) => theme.textSoft};
      font-size: 1rem;
    }

    .loading {
      font-size: 16px;
      animation: spinner 2s linear infinite;
    }

    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }

    p {
      margin-top: 10px;
      font-size: 0.8rem;

      span {
        color: #3ea6ff;
        cursor: pointer;
      }
    }
  }
`;
