import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
import { useDebounce } from '../../hooks/useDebounce';
import serialsAxios, { API_KEY } from '../../api/serialsAxios';
import { StyledSearchBar } from './StyledSearchBar';

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parentref, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [serials, setSerials] = useState([]);
  const isEmpty = !serials || serials.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setIsExpanded(true);
  };
  const collapseContainer = () => {
    setIsExpanded(false);
    setSearchQuery('');
    setSerials([]);

    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `search/tv?api_key=${API_KEY}&language=ru-RU&query=${query}&include_adult=false`;
    return encodeURI(url);
  };

  const searchSerials = async () => {
    if (!searchQuery || searchQuery.trim() === '') return;
    setLoading(true);

    const URL = prepareSearchQuery(searchQuery);

    const { data } = await serialsAxios.get(URL).catch((err) => {
      console.log('Error', err);
    });
    if (data) {
      setSerials(data.results);
    }
    setLoading(false);
  };

  useDebounce(searchQuery, 300, searchSerials);

  return (
    <StyledSearchBar
      isExpanded={isExpanded}
      isLoading={isLoading}
      isEmpty={isEmpty}
      parentref={parentref}
      inputRef={inputRef}
      expandContainer={expandContainer}
      collapseContainer={collapseContainer}
      searchQuery={searchQuery}
      changeHandler={changeHandler}
      serials={serials}
    />
  );
}
