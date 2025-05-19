'use client'

import React, { useState, useEffect } from 'react';
import { Masonry } from 'masonic';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';


const images = Array.from({ length: 221 }, (_, index) => ({
  src: `/memory-${index+1}.jpeg`,
  srcSm: `/memory-${index+1}-lg.jpeg`,
  id: index + 1,
  name: `Image ${index + 1}`,
  description: `Description for Image ${index + 1}`
}));


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
    <div onClick={() => { setIsOpen(true); setCurrentIndex(index); }} className='overflow-hidden'>
      {/* TODO: 修正寬度 */}
      <Image
        src={data.src}
        alt={`Gallery image ${index + 1}`}
        width={700}
        height={500}
        className="cursor-pointer object-cover hover:scale-105 transition-all duration-640"
      />
    </div>
  );


  return (
    <div className="px-4">
      <Masonry
        items={images.map((image) => ({ ...image, src: image.srcSm || image.src }))}
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