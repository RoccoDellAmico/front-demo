import React from 'react';
import Card from './Card';
import './Card.css';
const CardList = () => {
  const cardsData = [
    { imageUrl: 'https://d22fxaf9t8d39k.cloudfront.net/eea2ae69c48d82f8869e307f7a1a12765cbe5a27edd1812637f3cb007910231f213472.jpg', description: 'Ferro Titular 2024', price: '$50000' },
    { imageUrl: 'https://celadasa.vtexassets.com/arquivos/ids/266792-800-auto?v=638460356860200000&width=800&height=auto&aspect=true', description: 'Argentina Titular 2024', price: '$120000' },
    { imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_741465-MLA50774924294_072022-O.webp', description: 'Campeón 2024', price: '$200' },
    { imageUrl: 'https://tiendariver.vtexassets.com/arquivos/ids/170986/HT3679_1.png?v=638453369418300000', description: 'River Plate', price: '$90000' },
  ];

  return (
    <div className="card-list">
      {cardsData.map((card, index) => (
        <Card 
            key={index}
            imageUrl={card.imageUrl}
            description={card.description}
            price={card.price}
        />
      ))}
    </div>
  );
}

export default CardList;