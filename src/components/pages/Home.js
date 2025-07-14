import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const games = [
  { name: "Main Game 1", path: "main-game-1" },
  { name: "Main Game 2", path: "main-game-2" },
  { name: "Game 1", path: "game-1" },
  { name: "Game 2", path: "game-2" },
  { name: "Game 3", path: "game-3" },
  { name: "Game 4", path: "game-4" },
  { name: "Game 5", path: "game-5" },
  { name: "Game 6", path: "game-6" },
];

// The Home component now accepts a 'navigate' prop
function Home({ navigate }) {
    return (
        <div className="home min-h-screen flex flex-col items-center justify-center p-4">
            <div className="flex flex-col justify-center items-center w-auto p-8 md:p-20 text-center transform transition-all duration-500">
                <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 mb-10 leading-tight ">
                    First Meet
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {games.map((game) => (
                        <button
                            key={game.path}
                            className="w-full py-3 px-4 bg-[#2EAEFE] text-white text-3xl font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => navigate(game.path)}
                        >
                            {game.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;