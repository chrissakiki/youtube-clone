import styled from "styled-components";

type Props = {
  rec?: string;
};
export const Wrapper = styled.div<Props>`
  margin-bottom: ${(props) => (props.rec === "rec" ? "10px" : "15px")};
  cursor: pointer;
  display: ${(props) => props.rec === "rec" && "flex"};
  gap: 10px;
  .poster {
    width: 100%;
    height: 170px;
    background-color: #999;
    height: ${(props) => props.rec === "rec" && "100px"};
    gap: 10px;
    flex: 1;

    @media (max-width: 580px) {
      height: ${(props) => props.rec !== "rec" && "220px"};
    }
  }

  .details {
    display: flex;
    margin-top: ${(props) => props.rec !== "rec" && "10px"};
    gap: 12px;
    flex: 1;
    @media (max-width: 1100px) {
      flex: 3;
    }

    .channel {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #999;
      display: ${(props) => props.rec === "rec" && "none"};
      object-fit: cover;
    }

    .text-content {
      h1 {
        font-size: ${(props) => (props.rec === "rec" ? "0.9rem" : "1rem")};
        font-weight: 500;
        color: ${({ theme }) => theme.text};
      }

      h2 {
        color: ${({ theme }) => theme.textSoft};
        margin: 8px 0;
        font-size: ${(props) => (props.rec === "rec" ? "0.8rem" : "0.9rem")};
        text-transform: capitalize;
      }

      .info {
        color: ${({ theme }) => theme.textSoft};
        font-size: ${(props) => (props.rec === "rec" ? "0.85rem" : "0.9rem")};
      }
    }
  }
`;
