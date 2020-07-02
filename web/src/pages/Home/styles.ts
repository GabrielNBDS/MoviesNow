import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const SideBar = styled.section`
  width: 280px;
  height: 100%;

  padding: 48px;

  background: #000;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
  }
`;

export const GenresContainer = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    outline: 0;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

export const ContentDisplay = styled.section`
  flex: 1;
  padding: 64px 48px;

  background: #222;

  span {
    margin-left: 24px;
    font-size: 36px;
    color: #fff;
  }

  & > div {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
  }
`;
