import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css';
import profile from './assets/profile.jpeg';

function App() {

  return (
    <div className="App">
      <div className="content">
        <h1>Portfolio</h1>
        <div className='flipbook-container'>
          <HTMLFlipBook className='flipbook' width={450} height={600}>
            <div className='empty-page'></div>
            <div className='cover'>
              <div className='page-content'>
                <img src="" alt="Logo" />
                <p>Hi there, welcome to my cozy corner of the internet 🌸</p>
              </div>
            </div>
            <div className='page' id='home-section'>
              <div className='page-content'>
                <h1>Home</h1>
                <div className='home-content'>
                  <img className='profile' src={profile} alt="Profile" />
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
            </div>
            <div className='page' id='about-section'>
              <div className='page-content'>
                <h1>About</h1>
                <p>Hi, and welcome to my little notebook 🌸 This is where I keep pieces of my journey — the things I’ve built, the ideas I love, and the stories behind them. Feel free to flip through the pages, discover my projects, and say hello. Best enjoyed with a warm drink and a curious heart ☕📖.</p>
              </div>
            </div>
            <div className='page' id='projects-section'>
              <div className='page-content'>
                <h1>Projects</h1>
                <div className='project-grid'>
                  <div className='project'>
                    <h3>Spirited Work</h3>
                    <img src="" alt="Spirited Work" />
                    <p>A cozy Spirited Away themed Pomodoro timer!</p>
                  </div>
                  <div className='project'>
                    <h3>Jay's Garden</h3>
                    <img src="" alt="Garden" />
                    <p>A garden like drawing album!</p>
                  </div>
                  <div className='project'>
                    <h3>Warm Winds</h3>
                    <img src="" alt="Warm Winds" />
                    <p>A weather app, presented by Calcifer!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='page' id='contact-section'>
              <div className='page-content'>
                <h1>Contact</h1>
                <p>If you have any questions, concerns, or just want to say hi, don't hesitate to reach out!</p>
                <ul>
                  <li><i class="fa-brands fa-github fa-2x"></i></li>
                </ul>
              </div>
            </div>
            <div className='cover'></div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

export default App;
