import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css';
import background from './assets/background.jpg';
import title from './assets/title.png';
import profile from './assets/profile.jpeg';
import pomodoro from './assets/pomodoro.png';
import garden from './assets/jays-garden.png';
import weather from './assets/warm-winds.png';
import sticker from './assets/stickers/sticker.png';
import oops from './assets/stickers/oops.png';
import cassette from './assets/stickers/cassette.png';
import flower1 from './assets/stickers/flower 1.png';
import flower2 from './assets/stickers/flower 2.png';
import star1 from './assets/stickers/star 1.png';
import star2 from './assets/stickers/star 2.png';
import spiderman from './assets/stickers/spiderman.png';
import hornet from './assets/stickers/hornet.png';

// replace with static loaders that webpack can resolve at build time
function importAll(ctx) {
  // ctx is a require.context result; return objects with the module URL and the original filename (ctx key)
  try {
    return ctx.keys().sort().map((k) => {
      const m = ctx(k);
      const src = (m && m.default) ? m.default : m;
      // ctx keys are like './File Name.mp3' — keep the original filename for display
      const name = k.replace(/^\.\//, '');
      return { src, name };
    });
  } catch (e) {
    return [];
  }
}

// static contexts per album folder (must match folder names exactly)
const bewitchedTracks = importAll(require.context('./assets/musics/Bewitched', false, /\.mp3$/));
const bewitchedImgs = importAll(require.context('./assets/musics/Bewitched', false, /\.(png|jpe?g|svg)$/));
const bewitchedCoverObj = bewitchedImgs.find((s) => /cover/i.test(s.name)) || bewitchedImgs[0] || null;
const bewitchedCover = bewitchedCoverObj ? bewitchedCoverObj.src : null;
const bewitched = { cover: bewitchedCover, tracks: bewitchedTracks };

const flowerBoyTracks = importAll(require.context('./assets/musics/Flower Boy', false, /\.(mp3)$/));
const flowerBoyImgs = importAll(require.context('./assets/musics/Flower Boy', false, /\.(png|jpe?g|svg)$/));
const flowerBoyCoverObj = flowerBoyImgs.find((s) => /cover/i.test(s.name)) || flowerBoyImgs[0] || null;
const flowerBoyCover = flowerBoyCoverObj ? flowerBoyCoverObj.src : null;
const flowerBoy = { cover: flowerBoyCover, tracks: flowerBoyTracks };

const hitMeTracks = importAll(require.context('./assets/musics/HIT ME HARD AND SOFT', false, /\.mp3$/));
const hitMeImgs = importAll(require.context('./assets/musics/HIT ME HARD AND SOFT', false, /\.(png|jpe?g|svg)$/));
const hitMeCoverObj = hitMeImgs.find((s) => /cover/i.test(s.name)) || hitMeImgs[0] || null;
const hitMeCover = hitMeCoverObj ? hitMeCoverObj.src : null;
const hitMeHardAndSoft = { cover: hitMeCover, tracks: hitMeTracks };

const whoCaresTracks = importAll(require.context('./assets/musics/Who Really Cares', false, /\.mp3$/));
const whoCaresImgs = importAll(require.context('./assets/musics/Who Really Cares', false, /\.(png|jpe?g|svg)$/));
const whoCaresCoverObj = whoCaresImgs.find((s) => /cover/i.test(s.name)) || whoCaresImgs[0] || null;
const whoCaresCover = whoCaresCoverObj ? whoCaresCoverObj.src : null;
const whoReallyCares = { cover: whoCaresCover, tracks: whoCaresTracks };

// Playlist component (minimal, self-contained)
function Playlist({ title, cover, tracks = [] }) {
  const audioRef = useRef(null);
  const idRef = useRef(Math.random().toString(36).substr(2, 9));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  // progress/time state removed because the progress bar has been deleted

  // derive a friendly display name from the imported file URL
  // format name based on the original filename from require.context (tracks provide .name)
  function formatName(trackObj) {
    if (!trackObj) return 'Unknown track';
    try {
      let name = trackObj.name || '';
      // remove extension
      name = name.replace(/\.(mp3|wav|ogg|m4a)$/i, '');
      // remove leading ./ if present
      name = name.replace(/^\.\//, '');
      // decode common url-encoded sequences if any
      try { name = decodeURIComponent(name); } catch (e) { /* ignore */ }
      // remove parenthetical or bracketed segments that mention featured artists
      name = name.replace(/\s*[(\[{][^)\]}]*\b(?:feat|ft|featuring)\b[^)\]}]*[)\]}]\s*/gi, '');
      // remove inline "feat" or "ft" segments (e.g. "Song feat. Artist" or "Song - feat Artist")
      name = name.replace(/\s*(?:-|–|—)?\s*\b(?:feat|ft|featuring)\b[.:]?\s*.*$/i, '');
      // replace common separators with spaces
      name = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
      return name;
    } catch (e) {
      return trackObj.name || '';
    }
  }

  function formatTime(s) {
    if (!s && s !== 0) return '--:--';
    const sec = Math.floor(s || 0);
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const ss = (sec % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  }

  useEffect(() => {
    // reset when tracks list changes
    setIndex(0);
    setPlaying(false);
  }, [tracks]);

  useEffect(() => {
    // when index changes, load & optionally play
    if (audioRef.current) {
      audioRef.current.load();
      if (playing) audioRef.current.play().catch(() => {});
    }
  }, [index, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // we only need the ended handler now (no time/progress tracking)
    function onEnded() {
      // auto-advance to next track
      setIndex((i) => (tracks.length ? (i + 1) % tracks.length : 0));
      setPlaying(true);
    }

    audio.addEventListener('ended', onEnded);

    // cleanup
    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioRef, tracks.length]);

  // Listen for other playlists starting playback. When another playlist
  // dispatches 'playlist-play' we pause this one.
  useEffect(() => {
    function onExternalPlay(e) {
      const otherId = e && e.detail;
      if (!otherId || otherId === idRef.current) return;
      // pause regardless of whether we think we're playing; safe and idempotent
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (err) { /* ignore */ }
      }
      setPlaying(false);
    }

    window.addEventListener('playlist-play', onExternalPlay);
    return () => window.removeEventListener('playlist-play', onExternalPlay);
  }, []);

  // When this playlist begins playing, notify others so they can pause.
  useEffect(() => {
    if (playing) {
      try {
        const ev = new CustomEvent('playlist-play', { detail: idRef.current });
        window.dispatchEvent(ev);
      } catch (e) {
        // older browsers may not support CustomEvent constructor
        const ev = document.createEvent && document.createEvent('CustomEvent');
        if (ev && ev.initCustomEvent) {
          ev.initCustomEvent('playlist-play', true, true, idRef.current);
          window.dispatchEvent(ev);
        }
      }
    }
  }, [playing]);

  function togglePlay() {
    if (!audioRef.current || tracks.length === 0) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  function next() {
    if (tracks.length === 0) return;
    setIndex((i) => (i + 1) % tracks.length);
    setPlaying(true);
  }

  function prev() {
    if (tracks.length === 0) return;
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  }

  return (
    <div className="playlist">
      {cover ? <img className="album-cover" src={cover} alt={`${title} cover`} /> : null}
      <h3>{title}</h3>
      <audio ref={audioRef} className="audio-player audio-hidden">
        <source src={(tracks[index] && tracks[index].src) || ''} />
        Your browser does not support the audio element.
      </audio>

      {/* progress UI removed intentionally */}

      <div className="playlist-controls compact-controls">
        <button onClick={prev} aria-label="previous">◀</button>
        <button onClick={togglePlay} aria-label="play-pause">{playing ? '⏸' : '▶'}</button>
        <button onClick={next} aria-label="next">▶</button>
      </div>

      <ul className="track-list">
        {tracks.length === 0 ? (
          <li className="track">No tracks found</li>
        ) : (
          // concise: only show the currently selected/playing track
          <li
            className={`track active`}
            onClick={() => { /* clicking the track toggles play/pause */ togglePlay(); }}
          >
            {formatName(tracks[index])}
          </li>
        )}
      </ul>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <div className="background">
        <img id='background' src={background} alt="Background" />
      </div>
      <div className="content">
        <h1 id='title'>Moss n' Markup</h1>
        <div className='flipbook-container'>
          <HTMLFlipBook className='flipbook' width={400} height={550} showCover={true}>
            <div className='cover moss'>
              <div className='page-content'>
                <img className='title' src={title} alt="Title" style={{width: '350px', height: '350px'}} />
              </div>
            </div>
            <div className='cover simple'></div>
            <div className='page' id='home-section'>
              <div className='page-content'>
                <img className='sticker bottom-right' src={sticker} alt="Sticker" style={{width: '150px', height: '150px', bottom: '2px', right: '10px', transform: 'rotate(-10deg)'}} />
                <img className='sticker top-left' src={flower1} alt="Sticker" style={{width: '100px', height: '250px', top: '10px', left: '10px', transform: 'rotate(5deg)'}} />
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
                <img className='sticker bottom-left' src={flower2} alt="Sticker" style={{width: '150px', height: '150px', bottom: '10px', left: '10px', transform: 'rotate(5deg)'}} />
                <h1>About</h1>
                <p>Hi and welcome to my cozy corner of the internet! My name is <strong>Ilyass</strong> and I'm a <strong>self-taught web developer</strong> who loves to mess up with code and computer stuff. Even though I'm still a <strong>highschooler</strong>, I have a strong passion for coding and I'm always looking for new opportunities to learn and grow. I hope you'll find something interesting here!</p>
              </div>
            </div>
            <div className='page' id='playlist-section'>
              <div className='page-content'>
                <img className='sticker top-right' src={cassette} alt="Sticker" style={{width: '70px', height: '130px', top: '5px', right: '40px', transform: 'rotate(-70deg)'}} />
                <h1>Playlists</h1>
                <div className="playlist-grid">
                  <Playlist title="Bewitched" cover={bewitched.cover} tracks={bewitched.tracks} />
                  <Playlist title="Flower Boy" cover={flowerBoy.cover} tracks={flowerBoy.tracks} />
                  <Playlist title="HIT ME HARD AND SOFT" cover={hitMeHardAndSoft.cover} tracks={hitMeHardAndSoft.tracks} />
                  <Playlist title="Who Really Cares" cover={whoReallyCares.cover} tracks={whoReallyCares.tracks} />
                </div>
              </div>
            </div>
            <div className='page' id='skills-section'>
              <div className='page-content'>
                <img className='sticker bottom-left' src={star2} alt="Sticker"  style={{width: '100px', height: '100px', bottom: '10px', left: '10px'}}/>
                <h1>Skills</h1>
                <div className='skill-grid'>
                  <div className='skill'>
                    <i className="fa-brands fa-html5"></i>
                    <p>HTML</p>
                  </div>
                  <div className='skill'>
                    <i className="fa-brands fa-css3-alt"></i>
                    <p>CSS</p>
                  </div>
                  <div className='skill'>
                    <i className="fa-brands fa-js"></i>
                    <p>JavaScript</p>
                  </div>
                  <div className='skill'>
                    <i className="fa-brands fa-react"></i>
                    <p>React</p>
                  </div>
                  <div className='skill'>
                    <i className="fa-brands fa-git-alt"></i>
                    <p>Git</p>
                  </div>
                  <div className='skill'>
                    <i className="fa-brands fa-github"></i>
                    <p>GitHub</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='page' id='projects-section'>
              <div className='page-content'>
                <img className='sticker bottom-right' src={spiderman} alt="Sticker" style={{width: '200px', height: '250px', bottom: '0', right: '0', marginBottom: '-20px', marginRight: '-10px'}} />
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
                <img className='sticker bottom-left' src={hornet} alt="Sticker" style={{width: '125px', height: '125px', bottom: '10px', left: '10px', transform: 'rotate(5deg)'}} />
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
            <div className='cover simple'></div>
            <div className='cover moss'></div>
          </HTMLFlipBook>
          <img src={oops} alt='Sticker' style={{width: '75px', height: '75px', position: 'fixed', zIndex: '-1', left: '900px'}} />
        </div>
      </div>
    </div>
  );
}

export default App;
