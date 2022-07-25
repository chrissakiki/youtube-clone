import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 20px;

  .comment-length {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }
  .new-comment {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-bottom: 30px;
    .input-container {
      display: flex;
      align-items: center;
      gap: 10px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      input {
        width: 100%;
        background: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.soft};
        padding: 5px;
        font-size: 1.05rem;
        color: ${({ theme }) => theme.text};
      }
    }

    .button-container {
      display: none;
      gap: 20px;
      align-self: flex-end;

      &.show {
        display: flex;
      }

      .cancel-btn {
        font-size: 0.9rem;
        font-weight: 600;
        border: none;
        background: transparent;
        color: ${({ theme }) => theme.textSoft};
        cursor: pointer;

        text-transform: uppercase;
      }
      .comment-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
        font-weight: 600;
        border: none;

        background: #3ea6ff;
        color: #111;
        cursor: pointer;
        text-transform: uppercase;
      }
    }
  }

  .comment-login {
    margin: 25px 0 40px 0;
    color: ${({ theme }) => theme.textSoft};

    .link {
      color: #3ea6ff;
    }
  }
`;
