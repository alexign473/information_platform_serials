import React from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import MoonLoader from 'react-spinners/MoonLoader';
import SearchCard from './SearchCard';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 3em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 3px rgba(0, 0, 0, 0.14);
  position: absolute;
  z-index: 999;
  width: 100%;
`;

const SearchInputContainer = styled.div`
  min-height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 19px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 22px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 22px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const containerVariants = {
  expanded: {
    height: '28em',
  },
  collapsed: {
    height: '3em',
  },
};

const containerTransition = {
  type: 'spring',
  damping: 22,
  stifness: 155,
};

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 22px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSearchBar = ({
  isExpanded,
  isLoading,
  isEmpty,
  parentref,
  inputRef,
  expandContainer,
  collapseContainer,
  searchQuery,
  changeHandler,
  serials,
}) => (
  <SearchBarContainer
    animate={isExpanded ? 'expanded' : 'collapsed'}
    variants={containerVariants}
    transition={containerTransition}
    ref={parentref}
  >
    <SearchInputContainer>
      <SearchIcon>
        <IoSearch />
      </SearchIcon>
      <SearchInput
        placeholder='Поиск сериалов'
        onFocus={expandContainer}
        ref={inputRef}
        value={searchQuery}
        onChange={changeHandler}
      />
      <AnimatePresence>
        {isExpanded && (
          <CloseIcon
            key='close-icon'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={collapseContainer}
          >
            <IoClose />
          </CloseIcon>
        )}
      </AnimatePresence>
    </SearchInputContainer>
    {isExpanded && <LineSeparator />}
    {isExpanded && (
      <SearchContent>
        {isLoading && (
          <LoadingWrapper>
            <MoonLoader loading color='#000' size={20} />
          </LoadingWrapper>
        )}
        {!isLoading && !isEmpty && (
          <>
            {serials.map((serial) => (
              <SearchCard
                key={serial.id}
                id={serial.id}
                poster={serial.poster_path}
                name={serial.name}
                rating={serial.vote_average}
              />
            ))}
          </>
        )}
        {!isLoading && isEmpty && (
          <WarningMessage>Нет сериалов...</WarningMessage>
        )}
      </SearchContent>
    )}
  </SearchBarContainer>
);
