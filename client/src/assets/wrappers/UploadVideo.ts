import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;

  .container {
    position: relative;
    width: 600px;
    height: 550px;
    background-color: ${({ theme }) => theme.menuBg};
    color: ${({ theme }) => theme.text};
    margin-top: 40px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    z-index: 10000;

    @media (max-width: 700px) {
      width: 90%;
    }

    .close {
      position: absolute;
      top: 25px;
      right: 20px;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: 500;

      @media (max-width: 460px) {
        top: 21px;
        font-size: 1.3rem;
        font-weight: 400;
      }
    }

    .title {
      text-align: center;
      margin-bottom: 10px;

      @media (max-width: 580px) {
        font-size: 1.7rem;
      }
      @media (max-width: 460px) {
        font-size: 1.3rem;
      }
    }

    label {
      font-size: 1rem;
    }

    input[type="text"],
    input[type="file"],
    textarea {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.soft};
      color: ${({ theme }) => theme.text};
      border-radius: 3px;
      padding: 10px;
      background-color: transparent;
      z-index: 100;
    }
    input[type="file"] {
    }

    textarea {
      resize: none;
    }

    .submit {
      border-radius: 3px;
      border: none;
      padding: 10px 20px;
      font-weight: 500;
      cursor: pointer;
      background-color: ${({ theme }) => theme.soft};
      color: ${({ theme }) => theme.textSoft};

      &:disabled {
      }
    }
  }
`;
