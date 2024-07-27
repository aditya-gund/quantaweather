import React from 'react';
import './Card.css';

const Card = ({ index }) => {
  return (
    <div className="card">
      Card {index + 1}
    </div>
  );
};

export default Card;
