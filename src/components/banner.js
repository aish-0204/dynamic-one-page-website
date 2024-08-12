import React, { useState, useEffect } from 'react';

function BannerSettings() {
  const [bannerDescription, setBannerDescription] = useState('Welcome to our website!');
  const [bannerTimer, setBannerTimer] = useState(60); // Timer in seconds
  const [bannerLink, setBannerLink] = useState('https://media.istockphoto.com/id/1733442081/video/white-3d-studio-abstract-background-clean-and-bright-space-with-lights-motion.mp4?s=mp4-640x640-is&k=20&c=ABMY6ui9pPB_7dD1PIhxVSc4doboqra52RW5nL-tckU=');

  useEffect(() => {
    fetch('http://localhost:5000/api/banner')
      .then(response => response.json())
      .then(data => {
        setBannerDescription(data.description);
        setBannerTimer(data.timer);
        setBannerLink(data.link);
      })
      .catch(error => console.error('Error fetching banner settings:', error));
  }, []);

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
    <div className="banner-settings">
      <h2>Update Banner Settings</h2>
      <label>
        Banner Description:
        <input
          type="text"
          value={bannerDescription}
          onChange={(e) => setBannerDescription(e.target.value)}
        />
      </label>
      <label>
        Banner Timer (seconds):
        <input
          type="number"
          value={bannerTimer}
          onChange={(e) => setBannerTimer(Number(e.target.value))}
        />
      </label>
      <label>
        Banner Video Link:
        <input
          type="text"
          value={bannerLink}
          onChange={(e) => setBannerLink(e.target.value)}
        />
      </label>
      <button onClick={handleBannerUpdate}>Update Banner Settings</button>
    </div>
  );
}

export default BannerSettings;
