import React, { useState } from 'react';
import styles from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Find contact"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default Filter;
