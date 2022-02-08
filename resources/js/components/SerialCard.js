import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ImEyePlus, ImEyeBlocked } from 'react-icons/im';
import * as ROUTES from '../constants/routes';
import { useWatchlist, useWatchlistItem } from '../hooks/useWatchlist';
import { StatusFilters } from '../store/filters.slice';

const CardContainer = styled.div`
  margin: 0px 20px 20px 20px;

  img {
    box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.397);
    border-radius: 2px;
    width: 210px;
  }

  @media (max-width: 480px) {
    img {
      width: 100%;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 210px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Name = styled.h3`
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
  display: flex;
  flex-shrink: 1;
`;

const AddIcon = styled(motion.span)`
  font-size: 22px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #8a2be2;
  }
`;

const iconVariant = {
  rest: { opacity: 0, ease: 'easeOut', duration: 0.1, type: 'tween' },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

export default function SerialCard({ poster, title, id }) {
  const { watchlistItem } = useWatchlistItem(id);
  const { addToWatchlist, removeFromWatchlist } = useWatchlist();

  const onAddToWatchlist = () => {
    if (!watchlistItem) {
      const storeSerial = {
        id,
        name: title,
        status: StatusFilters.Active,
        rating: null,
      };
      addToWatchlist(storeSerial);
    } else {
      removeFromWatchlist(id);
    }
  };

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
    <CardContainer>
      <motion.div initial='rest' whileHover='hover' animate='rest'>
        <Link to={`${ROUTES.SERIALS}/${id}`}>
          <img
            src={
              poster
                ? `https://image.tmdb.org/t/p/original${poster}`
                : 'http://via.placeholder.com/210x315?text=No poster'
            }
            alt=''
          />
        </Link>
        <TitleContainer className='mt-1'>
          {/* <h3 className='m-0' title={title}>
            {titleDelimited}
          </h3> */}
          <Name>{titleDelimited}</Name>
          <AddIcon
            variants={iconVariant}
            className='me-2'
            onClick={onAddToWatchlist}
          >
            {!watchlistItem ? <ImEyePlus /> : <ImEyeBlocked />}
          </AddIcon>
        </TitleContainer>
      </motion.div>
    </CardContainer>
  );
}
