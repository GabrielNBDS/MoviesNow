import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface ContentProps {
  id: number;
  thumbnailUrl: string;
}

const Content: React.FC<ContentProps> = ({
  thumbnailUrl,
  id,
}: ContentProps) => (
  <Link to={`/details/${id}`}>
    <Container thumbnail={thumbnailUrl} />
  </Link>
);

export default Content;
