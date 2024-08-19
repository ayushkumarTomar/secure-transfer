"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaServer, FaLock, FaCubes } from 'react-icons/fa';
import { Manrope } from 'next/font/google';
import Lottie from 'lottie-react';
import paperPlaneAnimation from "../public/paper-plane.json"
const manrope = Manrope({
  subsets: ['latin'],
  weight: ["400"]
});

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 w-full p-4 text-white text-center shadow-md relative overflow-hidden">
        <h1 className={`sm:text-4xl text-2xl font-bold ${manrope.className}`}>    Secure Transfer</h1>
        <div className="absolute top-0  w-24 h-24">
          <Lottie animationData={paperPlaneAnimation} loop={true} />
        </div>
      </header>

      <main className="flex flex-col items-center mt-8 px-4 flex-1">
        <motion.section
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className={`${manrope.className} text-5xl font-semibold mb-4`}>Transfer Files Seamlessly</h2>
          <p className={`text-lg mb-6 text-gray-700 max-w-2xl ${manrope.className}`}>
            Transfer your files securely and efficiently. Divide large files into small chunks, encrypt each chunk, and send them easily using our P2P file transfer service.
          </p>
          <Link href="/send">
            <div className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg shadow hover:bg-blue-700 transition duration-200 transform hover:scale-105">
              Get Started
            </div>
          </Link>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg cursor-pointer shadow-lg transition-shadow duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
          >
            <FaServer className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">P2P, No Server</h3>
            <p className="text-gray-700">Experience serverless, direct peer-to-peer file transfers.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg cursor-pointer shadow-lg transition-shadow duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
          >
            <FaCubes className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">Sent in Chunks</h3>
            <p className="text-gray-700">Divide large files into smaller, manageable chunks for easy transfer.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg cursor-pointer shadow-lg transition-shadow duration-300 transform hover:scale-105 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            //@ts-ignore
            whileHover={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
          >
            <FaLock className="text-blue-600 text-6xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4">Encrypt Chunks</h3>
            <p className="text-gray-700">Securely encrypt each chunk to ensure privacy and security.</p>
          </motion.div>
        </motion.section>

        <motion.section
          className="w-full bg-blue-600 text-white py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto px-6 text-center">
            <h3 className={`${manrope.className} text-3xl font-semibold mb-4`}>Why Choose Secure Transfer?</h3>
            <p className={`max-w-2xl mx-auto text-lg ${manrope.className}`}>
              Our Secure Transfer service ensures that your files are transferred peer-to-peer in chunks and you can also encrypt each chunk to keep your data protected.
            </p>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 w-full p-4 text-white text-center mt-auto">
        <p>&copy; 2024 Secure Transfer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;