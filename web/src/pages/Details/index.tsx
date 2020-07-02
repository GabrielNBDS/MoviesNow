import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, SideImage, MovieDescription } from './styles';

interface RouteParam {
  id: string;
}

interface genre {
  id: number;
  name: string;
}

interface ContentProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<RouteParam>();

  const [movie, setMovie] = useState<ContentProps>({} as ContentProps);

  useEffect(() => {
    async function getData() {
      const { data } = await api.get(`/content/${params.id}`);
      setMovie(data);
    }

    getData();
  }, [params.id]);

  return (
    <>
      <Container>
        <SideImage url={movie.thumbnail} />
        <MovieDescription>
          <Link to="/">Voltar</Link>
          <h1>{movie.name}</h1>
          <p>{movie.description}</p>
          <Link to="/watch">Assistir agora</Link>
        </MovieDescription>
      </Container>
    </>
  );
};

export default Details;
