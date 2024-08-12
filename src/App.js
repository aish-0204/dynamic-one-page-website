import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isBannerVisible, setBannerVisible] = useState(true);
  const [bannerDescription, setBannerDescription] = useState('Welcome to our website!');
  const [bannerTimer, setBannerTimer] = useState(60); // Timer in seconds
  const [bannerLink, setBannerLink] = useState('https://media.istockphoto.com/id/1733442081/video/white-3d-studio-abstract-background-clean-and-bright-space-with-lights-motion.mp4?s=mp4-640x640-is&k=20&c=ABMY6ui9pPB_7dD1PIhxVSc4doboqra52RW5nL-tckU=');
  const [timeRemaining, setTimeRemaining] = useState(bannerTimer);

  // Fetch banner settings from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/banner')
      .then(response => response.json())
      .then(data => {
        setBannerDescription(data.description);
        setBannerTimer(data.timer);
        setBannerLink(data.link);
        setTimeRemaining(data.timer);
      })
      .catch(error => console.error('Error fetching banner settings:', error));
  }, []);

  // Timer and visibility logic
  useEffect(() => {
    let interval;
    if (isBannerVisible && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    if (timeRemaining <= 0) {
      setBannerVisible(false);
    }
    return () => clearInterval(interval);
  }, [isBannerVisible, timeRemaining]);

  const handleBannerVisibilityChange = () => {
    setBannerVisible(!isBannerVisible);
    if (!isBannerVisible) setTimeRemaining(bannerTimer); // Reset timer when banner is shown
  };

  const handleBannerDescriptionChange = (event) => {
    setBannerDescription(event.target.value);
  };

  const handleBannerTimerChange = (event) => {
    setBannerTimer(Number(event.target.value));
    setTimeRemaining(Number(event.target.value)); // Reset timer to new value
  };

  const handleBannerLinkChange = (event) => {
    setBannerLink(event.target.value);
  };

  const handleBannerUpdate = () => {
    fetch('http://localhost:5000/api/banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: bannerDescription,
        timer: bannerTimer,
        link: bannerLink,
      }),
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
    })
    .catch(error => console.error('Error updating banner settings:', error));
  };

  return (
    <div className="App">
      <div className="dashboard">
        <h2>Internal Dashboard</h2>
        <label>
          Banner On/Off:
          <input
            type="checkbox"
            checked={isBannerVisible}
            onChange={handleBannerVisibilityChange}
          />
        </label>
        <label>
          Banner Description:
          <input
            type="text"
            value={bannerDescription}
            onChange={handleBannerDescriptionChange}
          />
        </label>
        <label>
          Banner Timer (seconds):
          <input
            type="number"
            value={bannerTimer}
            onChange={handleBannerTimerChange}
          />
        </label>
        <label>
          Banner Video Link:
          <input
            type="text"
            value={bannerLink}
            onChange={handleBannerLinkChange}
          />
        </label>
        <button onClick={handleBannerUpdate}>Update Banner Settings</button>
      </div>

      {isBannerVisible && (
        <div className="banner">
          <video autoPlay loop muted className="banner-video">
            <source src={bannerLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="banner-content">
            <p>{bannerDescription}</p>
            <div className="countdown-timer">
              <span>{String(Math.floor(timeRemaining / 60)).padStart(2, '0')}</span>:
              <span>{String(timeRemaining % 60).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
