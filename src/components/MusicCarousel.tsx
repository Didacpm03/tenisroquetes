import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // ✅ Solo esto si usas motion.img

import song1 from "../assets/musica/08-Ronda-del-silbidito.mp3";
import song2 from "../assets/musica/10-El-Payador.mp3";
import song3 from "../assets/musica/14-Triste-y-sola-Fonseca.mp3";
import song4 from "../assets/musica/15-Barcarola-Wien.mp3";
import song5 from "../assets/musica/16-Campanera-Wien.mp3";

import cover1 from "../assets/png/austria1.jpg";
import cover2 from "../assets/png/austria2.jpg";
import cover3 from "../assets/png/austria4.jpg";
import cover4 from "../assets/png/austria5.jpg";
import cover5 from "../assets/png/austria6.jpg";

const songs = [
  { title: "Ronda del silbidito", artist: "Canción 1", src: song1, img: cover1 },
  { title: "El Payador", artist: "Canción 2", src: song2, img: cover2 },
  { title: "Triste y sola Fonseca", artist: "Canción 3", src: song3, img: cover3 },
  { title: "Barcarola Wien", artist: "Canción 4", src: song4, img: cover4 },
  { title: "Campanera Wien", artist: "Canción 5", src: song5, img: cover5 },
];

const MusicCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[current].src;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [current, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const prevSong = () => {
    setCurrent((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };
  const nextSong = () => {
    setCurrent((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  return (
<div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 border-animated">
      <div className="relative flex items-center justify-center h-64 overflow-hidden mb-6">
  {songs.map((song, index) => {
    const isActive = index === current;
    const isPrev = index === (current - 1 + songs.length) % songs.length;
    const isNext = index === (current + 1) % songs.length;

    let className = "absolute transition-all duration-500 ease-in-out";
    let style = {
      transform: "scale(0.8)",
      filter: "blur(4px)",
      opacity: 0.5,
      zIndex: 0,
      left: "50%",
      top: "0",
      translateX: "-50%",
    };

    if (isActive) {
      className += " scale-100";
      style = {
        transform: "scale(1)",
        filter: "none",
        opacity: 1,
        zIndex: 10,
        left: "50%",
        top: "0",
        translateX: "-50%",
      };
    } else if (isPrev) {
      style = {
        transform: "translateX(-120%) scale(0.8)",
        filter: "blur(3px)",
        opacity: 0.5,
        zIndex: 1,
      };
    } else if (isNext) {
      style = {
        transform: "translateX(120%) scale(0.8)",
        filter: "blur(3px)",
        opacity: 0.5,
        zIndex: 1,
      };
    } else {
      return null; // oculta los que no están cerca
    }

    return (
      <motion.img
        key={index}
        src={song.img}
        alt={song.title}
        className={className + " rounded-xl shadow-lg object-cover h-full w-auto"}
        initial={{ opacity: 0 }}
        animate={{ opacity: style.opacity, transform: style.transform, filter: style.filter, zIndex: style.zIndex }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute" }}
      />
    );
  })}
</div>

      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{songs[current].title}</h3>
        <p className="text-gray-500 text-sm">{songs[current].artist}</p>
      </div>

      <audio ref={audioRef} />

      <div className="flex items-center justify-center space-x-6 mb-4">
        <button onClick={prevSong} aria-label="Anterior">
          <svg className="w-8 h-8 text-gray-600 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>

        <button onClick={nextSong} aria-label="Siguiente">
          <svg className="w-8 h-8 text-gray-600 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M15 8.25V15.75C15 16.1642 15.3358 16.5 15.75 16.5H17.25C17.6642 16.5 18 16.1642 18 15.75V8.25C18 7.83579 17.6642 7.5 17.25 7.5H15.75C15.3358 7.5 15 7.83579 15 8.25Z" />
        </svg>
      </div>
    </div>
  );
};

export default MusicCarousel;
