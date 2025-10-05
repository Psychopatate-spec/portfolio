import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css';
import profile from './assets/profile.jpeg';
import pomodoro from './assets/pomodoro.png';
import garden from './assets/jays-garden.png';
import weather from './assets/warm-winds.png';

function App() {

  return (
    <div className="App">
      <div className="content">
        <h1>My Cozy Archive</h1>
        <div className='flipbook-container'>
          <HTMLFlipBook className='flipbook' width={450} height={600} showCover={true}>
            <div className='cover'>
              <div className='page-content'>
                <h1>My Cozy Archive</h1>
                <p>Hi there, welcome to my cozy corner of the internet 🌸</p>
              </div>
            </div>
            <div className='cover'></div>
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
            <div className='page' id='projects-section1'>
              <div className='page-content'>
                <h1>Projects</h1>
                <div className='project-grid'>
                  <div className='project'>
                    <a href='https://spiritedwork.vercel.app' target='_blank' rel='noreferrer'>
                      <img className='project-image' src={pomodoro} alt="Spirited Work" />
                      <h3>Spirited Work</h3>
                    </a>
                  </div>
                  <div className='project'>
                    <a href='https://psychopatate-spec.github.io/Jays-Drawing-Album/' target='_blank' rel='noreferrer'>
                      <img className='project-image' src={garden} alt="Garden" />
                      <h3>Jay's Garden</h3>
                    </a>
                  </div>
                  <div className='project'>
                    <a href='https://psychopatate-spec.github.io/weather-app/' target='_blank' rel='noreferrer'>
                      <img className='project-image' src={weather} alt="Warm Winds" />
                      <h3>Warm Winds</h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='page' id='contact-section'>
              <div className='page-content'>
                <h1>Contact</h1>
                <p>If you have any questions, concerns, or just want to say hi, don't hesitate to reach out!</p>
                <ul className='contact-list'>
                  <li>
                    <a href='https://github.com/Psychopatate-spec' target='_blank' rel='noreferrer'>
                      <i className="fa-brands fa-github fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.instagram.com/ilys_khtb/' target='_blank' rel='noreferrer'>
                      <i className="fa-brands fa-instagram fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href='https://discordapp.com/users/810124625396629525' target='_blank' rel='noreferrer'>
                      <i className="fa-brands fa-discord fa-2x"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='cover'></div>
            <div className='cover'></div>
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

export default App;
