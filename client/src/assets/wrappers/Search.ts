import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  min-height: calc(100vh - 96px);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 580px) {
    padding: 0 20px;
    grid-template-columns: 1fr;
  }

  h2 {
    color: ${({ theme }) => theme.textSoft};
  }
`;

// add comment to ui real time
///search reponsive navbar
//tozbit type mn home
//responsive add video, and retry
// user navigation bar
// do not allow user to subcribe to himself
// maybe add like dislike comments
//save video
// categories
//sort comments
