import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import { Container, SideBar, GenresContainer, ContentDisplay } from './styles';

import ContentCard from '../../components/ContentCard';

interface Content {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

interface Genres {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    api.get('/genres').then((response) => setGenres(response.data));
  }, []);

  useEffect(() => {
    api.get('/content').then((response) => setContents(response.data));
  }, []);

  return (
    <Container>
      <SideBar>
        <img src={logo} alt="MoviesNow" />

        <GenresContainer>
          {genres.map((genre) => (
            <button key={genre.id} type="button">
              {genre.name}
            </button>
          ))}
        </GenresContainer>
      </SideBar>
      <ContentDisplay>
        <span>Últimos adicionados:</span>
        <div>
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              thumbnailUrl={content.thumbnail}
            />
          ))}
        </div>
      </ContentDisplay>
    </Container>
  );
};

export default Home;
