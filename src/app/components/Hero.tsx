'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className='pt-20 container mx-auto'>
      <div className='flex flex-col items-center justify-center gap-12'>
        <motion.div
          animate={{
            y: [15, -15, 0],
            x: [-15, 15, 0],
            rotateZ: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        >
          <Image
            src='/dron.webp'
            alt='Dron hovering in the air'
            width={600}
            height={400}
            priority
          />
        </motion.div>

        <div>
          <h1 className='text-6xl text-center font-bungee font-bold'>
            Skull<span className='text-primary'>Frame</span>
          </h1>

          <p className='text-center text-2xl font-semibold text-black mt-6'>
            La tienda de drones digitales más grande del Perú.
          </p>
        </div>
      </div>
    </section>
  );
};
