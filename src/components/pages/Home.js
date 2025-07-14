import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// The Home component now accepts a 'navigate' prop
function Home({ navigate }) {
    return (
        <div className="home bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="container max-w-4xl bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 hover:scale-[1.02] border border-gray-200">
                <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 mb-6 leading-tight ">
                    First Meet
                </h1>

                <div className="grid grid-cols-1 gap-6">
                    {/* Main Game 1 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('main-game-1')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Main Game 1
                        </button>
                    </div>

                    {/* Main Game 2 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('main-game-2')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Main Game 2
                        </button>
                    </div>

                    {/* Game 1 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-1')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 1
                        </button>
                    </div>

                    {/* Game 2 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-2')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 2
                        </button>
                    </div>

                    {/* Game 3 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-3')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 3
                        </button>
                    </div>

                    {/* Game 4 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-4')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 4
                        </button>
                    </div>

                    {/* Game 5 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-5')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 5
                        </button>
                    </div>

                    {/* Game 6 Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('game-6')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            Game 6
                        </button>
                    </div>

                    {/* Item Page Card */}
                    <div className="col">
                        <button
                            onClick={() => navigate('item')}
                            className="btn btn-primary w-[10vw] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-100"
                        >
                            item
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;