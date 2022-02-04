import React from 'react';
import { useSelector } from 'react-redux';
import { selectSerial } from '../store/serial.slice';
import SerialCard from './SerialCard';

export default function Recomendations() {
  const { recomendations } = useSelector(selectSerial);
  return (
    <>
      {recomendations.length > 0 && (
        <>
          <h2 className='py-3 fw-bold'>Вам так же может понравится</h2>
          <div className='recomendations'>
            {recomendations?.map((serial) => (
              <SerialCard
                key={serial.id}
                poster={serial.poster_path}
                title={serial.name}
                id={serial.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
