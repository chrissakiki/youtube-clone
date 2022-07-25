import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};

    .username {
      font-size: 0.92rem;
      font-weight: 500;
      align-self: flex-start;

      .date {
        font-size: 0.9rem;
        font-weight: 400;
        color: ${({ theme }) => theme.textSoft};
        margin-left: 5px;
      }
    }

    .text {
      font-size: 0.91rem;
    }

    .action {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 15px;

      .likes {
        display: flex;
        align-items: center;
        gap: 8px;
        span {
          font-size: 0.9rem;
        }

        svg {
          cursor: pointer;
        }
      }
    }
  }
`;
