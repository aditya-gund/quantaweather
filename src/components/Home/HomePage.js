import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import Map from './Map/Map';
import Card from './Card/Card';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <SearchBar />
      <div className="content">
        <Map />
        <div className="cards-container">
          <div className="card-row">
            <Card index={0} />
            <Card index={1} />
            <Card index={2} />
            <Card index={3} />
            <Card index={4} />
          </div>
          <div className="card-row">
            <Card index={5} />
            <Card index={6} />
            <Card index={7} />
            <Card index={8} />
            <Card index={9} />
          </div>
          <div className="card-row">
            <Card index={10} />
            <Card index={11} />
            <Card index={12} />
            <Card index={13} />
            <Card index={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
