import styled from 'styled-components';

interface ContentCardProps {
  thumbnail: string;
}

export const Container = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  margin: 24px;

  background-image: url(${(props: ContentCardProps) => props.thumbnail});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
