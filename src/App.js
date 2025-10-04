import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css';

function App() {
  
  const logo = "";
  const profile = "";

  return (
    <div className="App">
      <nav>
        <ul>
          <li><img src={logo} alt="Logo" /></li>
          <li><a href="#home-section">Home</a></li>
          <li><a href="#about-section">About</a></li>
          <li><a href="#projects-section">Projects</a></li>
          <li><a href="#contact-section">Contact</a></li>
        </ul>
      </nav>
      <div className="content">
        <HTMLFlipBook width={600} height={450} size='stretch'>
          <div className='empty-page'></div>
          <div className='cover'>
            <h1>Portfolio</h1>
            <p>Hi there, welcome to my cozy corner of the internet 🌸</p>
          </div>
          <div className='page' id='home-section'>
            <h1>Home</h1>
            <div className='home-content'>
              <img src={profile} alt="Profile" />
              <div className='summary'>
                <p>What you'll find here:</p>
                <ul>
                  <li>More about myself</li>
                  <li>My coding projects</li>
                  <li>My contact infos</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='page' id='about-section'>
            <h1>About</h1>
            <p>Hi, and welcome to my little notebook 🌸 This is where I keep pieces of my journey — the things I’ve built, the ideas I love, and the stories behind them. Feel free to flip through the pages, discover my projects, and say hello. Best enjoyed with a warm drink and a curious heart ☕📖.</p>
          </div>
          <div className='page' id='projects-section'>
            <h1>Projects</h1>
            <p>This is the projects page.</p>
          </div>
          <div className='page' id='contact-section'>
            <h1>Contact</h1>
            <p>This is the contact page.</p>
          </div>
          <div className='cover'></div>
          <div className='empty-page'></div>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default App;
