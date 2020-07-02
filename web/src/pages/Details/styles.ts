import styled from 'styled-components';

interface ContentImage {
  url: string;
}

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const SideImage = styled.img`
  height: 100%;
  width: 100%;
  max-width: 900px;

  background-image: url(${(props: ContentImage) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MovieDescription = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  min-width: 500px;
  padding: 40px;

  background: #000;

  color: #fff;

  a {
    color: #fff;
    font-size: 32px;

    &:nth-of-type(1) {
      margin-bottom: 120px;
      margin-left: auto;
    }

    &:nth-of-type(2) {
      margin-top: auto;
    }
  }

  h1 {
    font-size: 48px;
    margin-bottom: 26px;
  }

  p {
    font-size: 32px;
    max-width: 450px;
  }
`;
