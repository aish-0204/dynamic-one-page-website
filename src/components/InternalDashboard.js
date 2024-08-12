import React, { useState } from 'react';
import './dashboard.css';

const InternalDashboard = ({ bannerSettings, setBannerSettings }) => {
  const [description, setDescription] = useState(bannerSettings.description);
  const [timer, setTimer] = useState(bannerSettings.timer);
  const [link, setLink] = useState(bannerSettings.link);
  const [visible, setVisible] = useState(bannerSettings.visible);

  const handleSave = () => {
    setBannerSettings({
      ...bannerSettings,
      description,
      timer: parseInt(timer, 10),
      link,
      visible
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Banner Configuration</h2>
      <div className="dashboard-control">
        <label>Banner On/Off:</label>
        <input
          type="checkbox"
          checked={visible}
          onChange={() => setVisible(!visible)}
        />
      </div>
      <div className="dashboard-control">
        <label>Banner Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="dashboard-control">
        <label>Banner Timer (seconds):</label>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
        />
      </div>
      <div className="dashboard-control">
        <label>Banner Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </div>
  );
};

export default InternalDashboard;
