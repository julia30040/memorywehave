'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Partner {
  id: number;
  image: string;
  hoverImage: string;
  message: string;
}

const partners: Partner[] = [
  {
    id: 1,
    image: 'https://picsum.photos/200?random=1',
    hoverImage: 'https://picsum.photos/200?random=2',
    message: 'Thank you all for the wonderful memories!'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200?random=3',
    hoverImage: 'https://picsum.photos/200?random=4',
    message: 'It was a pleasure working with everyone!'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200?random=5',
    hoverImage: 'https://picsum.photos/200?random=6',
    message: 'I will miss you all!'
  }
];

const FarewellPartners = () => {
  const [selectedPartner, setSelectedPartner] = React.useState<Partner | null>(null);

  const handleClick = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  return (
    <div className="flex justify-center items-center gap-8">
      {partners.map((partner) => (
        <div key={partner.id} className="relative">
          <Image
            src={partner.image}
            alt={`Partner ${partner.id}`}
            width={200}
            height={200}
            className="transition-transform duration-300 hover:scale-105"
            onClick={() => handleClick(partner)}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Image
              src={partner.hoverImage}
              alt={`Partner ${partner.id} Hover`}
              width={200}
              height={200}
            />
          </motion.div>
        </div>
      ))}

      {selectedPartner && (
        <motion.div
          className="fixed inset-0 bg-white flex justify-center items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">A Message from Partner {selectedPartner.id}</h2>
            <p>{selectedPartner.message}</p>
            <button onClick={() => setSelectedPartner(null)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FarewellPartners; 