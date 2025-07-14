import './App.css';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your page components
import MainGame1 from './components/pages/MainGame1';
import MainGame2 from './components/pages/MainGame2';

import Game from './components/pages/Game';
import Item from './components/pages/Item';
import Home from './components/pages/Home';

function App() {
  // 1. Use state to manage the current page. We start on 'home'.
  const [currentPage, setCurrentPage] = useState('home');

  // 2. Define the navigation function (optional, but useful if pages need to navigate)
  // We can pass this function down as a prop if needed.
  const navigate = (pageName) => {
    setCurrentPage(pageName);
  };

  // 3. Define a render function using switch/case
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        // Pass the navigate function to the Home component if needed
        return <Home navigate={navigate} />; 
      case 'main-game-1':
        return <MainGame1 navigate={navigate} />;
      case 'main-game-2':
        return <MainGame2 navigate={navigate} />;
      case 'game-1':
        return <Game game={"Game 1"} navigate={navigate} />;
      case 'game-2':
        return <Game game={"Game 2"} navigate={navigate} />;
      case 'game-3':
        return <Game game={"Game 3"} navigate={navigate} />;
      case 'game-4':
        return <Game game={"Game 4"} navigate={navigate} />;
      case 'game-5':
        return <Game game={"Game 5"} navigate={navigate} />;
      case 'game-6':
        return <Game game={"Game 6"} navigate={navigate} />;
      case 'item':
        return <Item navigate={navigate} />;
      default:
        // Optional: A fallback for unrecognized paths (e.g., 404 page)
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {/* 4. Implement simple navigation buttons (e.g., in a navbar) */}
      <nav className="navbar">
        <button onClick={() => navigate('home')}>Home</button>
        {/* Add more buttons for other pages as needed */}
      </nav>

      {/* 5. Render the currently selected page */}
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;