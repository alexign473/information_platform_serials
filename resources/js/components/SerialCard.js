import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import * as ROUTES from '../constants/routes';

export default function SerialCard({ poster, title, id }) {
  const dispatch = useDispatch();
  const stringDelimiter = (str, limit) => {
    let splitStr = str.split(' ');
    if (splitStr.length <= limit) {
      return str;
    } else {
      return splitStr.slice(0, limit).join(' ') + '...';
    }
  };

  const titleDelimited = stringDelimiter(title, 2);

  return (
    <div className='serial'>
      {/* <motion.div initial='rest' whileHover='hover' animate='rest'> */}
      <Link to={`${ROUTES.SERIALS}/${id}`}>
        <img
          className='serial-img'
          src={
            poster
              ? `https://image.tmdb.org/t/p/original${poster}`
              : 'http://placehold.it/210x315&text=No poster'
          }
          alt=''
          width='210'
        />
      </Link>
      <h1 className='title mt-2' title={title}>
        {titleDelimited}
      </h1>
      {/* </motion.div> */}
    </div>
  );
}
