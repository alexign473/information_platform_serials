import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const CardContainer = styled(Link)`
  width: 100%;
  height: 6em;
  color: #000;
  text-decoration: none;
  display: flex;
  border-bottom: 1px solid #d8d8d878;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.2;

  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 16px;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Rating = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`;

export default function SearchCard({ id, name, poster, rating }) {
  return (
    <CardContainer to={`${ROUTES.SERIALS}/${id}`} target='_blank'>
      <Thumbnail>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w200${poster}`
              : 'http://via.placeholder.com/210x315?text=No poster'
          }
          alt={name}
        />
      </Thumbnail>
      <Name>{name}</Name>
      <Rating>{rating || '-'}</Rating>
    </CardContainer>
  );
}
