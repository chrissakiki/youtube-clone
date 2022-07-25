import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  padding: 20px;

  @media (max-width: 580px) {
    padding: 10px 15px;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
  }

  hr {
    margin: 20px 0 15px 0;
    border: 0.2px solid ${({ theme }) => theme.soft};
  }
  .content {
    flex: 5;

    .video-wrapper {
      video {
        max-height: 500px;
        width: 100%;

        object-fit: cover;

        @media (max-width: 580px) {
          height: 350px;
        }
      }
    }

    .title {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 20px 0 10px 0;
      color: ${({ theme }) => theme.text};
    }

    .info-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* display: none; */
      @media (max-width: 600px) {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .info {
        color: ${({ theme }) => theme.textSoft};
      }

      .button-container {
        display: flex;
        gap: 20px;
        color: ${({ theme }) => theme.text};
        @media (max-width: 600px) {
          width: 100%;
          gap: 0;
          justify-content: space-between;
        }
        .btn {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;

          .likes {
            font-size: 1.05rem;
          }

          svg {
            font-size: 1.5rem;

            @media (max-width: 600px) {
              font-size: 1rem;
            }
          }
        }
      }
    }

    hr {
      margin: 25px 0 15px 0;
      border: 0.2px solid ${({ theme }) => theme.soft};
    }

    .channel {
      .channel-info {
        display: flex;
        gap: 20px;
        .img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
        }

        .channel-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          color: ${({ theme }) => theme.text};

          .main-channel {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .dir-col {
              display: flex;
              flex-direction: column;
              .channel-name {
                font-weight: 500;
              }

              .channel-counter {
                font-size: 0.8rem;
                font-weight: 400;
                color: ${({ theme }) => theme.textSoft};
                margin: 5px 0 20px 0;
              }
            }

            .subscribe {
              background-color: #cc0000;
              font-weight: 500;
              text-transform: uppercase;
              color: #fff;
              border: none;
              border-radius: 3px;
              height: max-content;
              cursor: pointer;
              padding: 10px 20px;
            }
          }

          .description {
            font-size: 0.9rem;
            @media (max-width: 600px) {
              font-size: 0.85rem;
            }
          }
        }
      }
    }
  }
`;
