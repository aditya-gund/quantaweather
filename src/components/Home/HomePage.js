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
          {/* First row with three cards for Today, Yesterday, and Tomorrow */}
          <div className="card-row">
            <Card header="Today" temperature={25} highLow="20-30" humidity={60} rainfall={0} />
            <Card header="Yesterday" temperature={24} highLow="19-28" humidity={65} rainfall={5} />
            <Card header="Tomorrow" temperature={26} highLow="21-31" humidity={55} rainfall={0} />
          </div>

          {/* Additional rows with cards */}
          <div className="card-row">
            <Card header="Today" temperature={22} highLow="18-26" humidity={70} rainfall={3} />
            <Card header="Yesterday" temperature={23} highLow="19-27" humidity={68} rainfall={0} />
            <Card header="Tomorrow" temperature={21} highLow="17-25" humidity={72} rainfall={4} />
          </div>
          <div className="card-row">
            <Card header="Today" temperature={20} highLow="16-24" humidity={75} rainfall={2} />
            <Card header="Yesterday" temperature={19} highLow="15-23" humidity={80} rainfall={6} />
            <Card header="Tomorrow"temperature={18} highLow="14-22" humidity={78} rainfall={1} />
          </div>
       {/* Additional row with two cards for Last 15 Days and Next 15 Days */}
       <div className="card-row">
            <Card header="Last 15 Days Weather" text="Not in free service" />
            <Card header="Next 15 Days Weather" text="Not in free service" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
