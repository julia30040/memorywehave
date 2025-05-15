'use client'

import React, { useState, useEffect } from 'react';
import { Masonry } from 'masonic';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const images = [  
  { src: 'https://picsum.photos/800/840?random=1', id: 1 , name: 'Image 1', description: 'Description for Image 1' },
  { src: 'https://picsum.photos/800/600?random=2', id: 2 , name: 'Image 2', description: 'Description for Image 2' },
  { src: 'https://picsum.photos/800/800?random=3', id: 3 , name: 'Image 3', description: 'Description for Image 3' },
  { src: 'https://picsum.photos/600/500?random=4', id: 4 , name: 'Image 4', description: 'Description for Image 4' },
  { src: 'https://picsum.photos/700/600?random=5', id: 5 , name: 'Image 5', description: 'Description for Image 5' },
  { src: 'https://picsum.photos/800/700?random=6', id: 6, name: 'Image 6', description: 'Description for Image 6' }
];


const ImageWall = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnWidth, setColumnWidth] = useState(300); // Default column width
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setColumnWidth(Math.floor(window.innerWidth / 4));
    };

    handleResize(); // Set initial column width
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderImage = ({ index, data }: { index: number; data: { src: string } }) => (
    <div onClick={() => { setIsOpen(true); setCurrentIndex(index); }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.src}
        width="100%"
        alt={`Gallery image ${index + 1}`}
        className="cursor-pointer object-cover"
      />
    </div>
  );


  return (
    <div className="px-4">
      <Masonry
        items={images}
        columnGutter={8}
        columnWidth={columnWidth - 16}
        render={renderImage}
      />
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={currentIndex}
          slides={images.map(({ src, description }) => ({ src, description }))}
        />
      )}
    </div>
  );
};

export default ImageWall; 