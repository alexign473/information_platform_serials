import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSerial } from '../store/serial.slice';
import SerialCard from './SerialCard';

const RecomContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  overflow: hidden;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));

  h2 {
    margin-block-start: 50px;
    margin-block-end: 50px;
    font-size: 64px;
  }
`;

export default function Recomendations() {
  const { recomendations } = useSelector(selectSerial);
  return (
    <>
      {recomendations.length > 0 && (
        <>
          <h2 className='mb-3 fw-bold'>Вам так же может понравится</h2>
          <RecomContainer>
            {recomendations?.map((serial) => (
              <SerialCard
                key={serial.id}
                poster={serial.poster_path}
                title={serial.name}
                id={serial.id}
              />
            ))}
          </RecomContainer>
        </>
      )}
    </>
  );
}
