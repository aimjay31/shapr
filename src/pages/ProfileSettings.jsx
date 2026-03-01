import React, { useState } from "react";
import "../styles/ProfileSettings.css";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Original data (saved state)
  const [savedProfileData, setSavedProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@university.edu",
    bio: "Computer Science student passionate about productivity and learning.",
    role: "Student • Computer Science"
  });

  // Settings state
  const [settingsData, setSettingsData] = useState({
    themeColor: "green",
    nightMode: false,
    profilePublic: true,
    shareStudyStats: true,
    allowNotifications: true,
    language: "English (US)",
    timeZone: "(GMT-08:00) Pacific Time",
    dailyStudyGoal: 4
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Temporary form data (for unsaved changes)
  const [formData, setFormData] = useState({
    firstName: savedProfileData.firstName,
    lastName: savedProfileData.lastName,
    email: savedProfileData.email,
    bio: savedProfileData.bio
  });

  // Password visibility
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Settings handlers
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Theme color handler
  const handleThemeColorChange = (color) => {
    setSettingsData(prev => ({
      ...prev,
      themeColor: color
    }));
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save changes
  const handleSaveChanges = () => {
    setSavedProfileData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      bio: formData.bio,
      role: savedProfileData.role
    });
    
    alert("Changes saved successfully!");
  };

  // Cancel changes
  const handleCancel = () => {
    setFormData({
      firstName: savedProfileData.firstName,
      lastName: savedProfileData.lastName,
      email: savedProfileData.email,
      bio: savedProfileData.bio
    });
    setPasswords({
      current: "",
      new: "",
      confirm: ""
    });
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className={`profile-settings-page ${settingsData.nightMode ? 'night-mode' : ''} theme-${settingsData.themeColor}`}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Profile & Settings</h1>
        <div className="header-actions">
          <span className="language-selector">EN ▾</span>
          <button className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="profile-settings-content">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <div className="user-info-card">
            <div className="user-avatar">
              <img 
                src="https://i.pravatar.cc/100?img=5" 
                alt="Profile" 
                className="avatar-image"
              />
            </div>
            <h2 className="user-name">{savedProfileData.firstName} {savedProfileData.lastName}</h2>
            <p className="user-role">{savedProfileData.role}</p>
            <p className="user-email">{savedProfileData.email}</p>
          </div>

          <div className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Edit Profile
            </button>
            <button 
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">↪</span>
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* Edit Profile Section */}
          <div className="profile-section">
            <h2 className="section-title">Edit Profile</h2>
            <p className="section-description">
              Update your personal information and profile settings.
            </p>

            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter email address"
                />
                <p className="input-note">We'll never share your email with anyone else.</p>
              </div>

              {/* BIO SECTION */}
              <div className="form-group">
                <label htmlFor="bio">Short Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-input bio-textarea"
                  placeholder="Tell us a little about your study goals..."
                  rows={5}
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          {activeTab === "settings" && (
            <div className="settings-section">
              <h2 className="section-title">Settings</h2>

              {/* Appearance */}
              <div className="settings-group">
                <h3 className="subsection-title">Appearance</h3>
                
                <div className="setting-row">
                  <span className="setting-label">Theme Color</span>
                  <div className="theme-color-selector">
                    <button 
                      className={`color-option green ${settingsData.themeColor === "green" ? "active" : ""}`}
                      onClick={() => handleThemeColorChange("green")}
                      title="Green"
                      type="button"
                    />
                    <button 
                      className={`color-option purple ${settingsData.themeColor === "purple" ? "active" : ""}`}
                      onClick={() => handleThemeColorChange("purple")}
                      title="Purple"
                      type="button"
                    />
                    <button 
                      className={`color-option blue ${settingsData.themeColor === "blue" ? "active" : ""}`}
                      onClick={() => handleThemeColorChange("blue")}
                      title="Blue"
                      type="button"
                    />
                    <button 
                      className={`color-option orange ${settingsData.themeColor === "orange" ? "active" : ""}`}
                      onClick={() => handleThemeColorChange("orange")}
                      title="Orange"
                      type="button"
                    />
                    <button 
                      className={`color-option red ${settingsData.themeColor === "red" ? "active" : ""}`}
                      onClick={() => handleThemeColorChange("red")}
                      title="Red"
                      type="button"
                    />
                  </div>
                </div>

                <div className="setting-row">
                  <span className="setting-label">Night Mode</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      name="nightMode"
                      checked={settingsData.nightMode}
                      onChange={handleSettingsChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="setting-note">Switch between light and dark themes</span>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="settings-group">
                <h3 className="subsection-title">Privacy & Security</h3>
                
                <div className="setting-row">
                  <span className="setting-label">Make profile public</span>
                  <label className="checkbox">
                    <input 
                      type="checkbox" 
                      name="profilePublic"
                      checked={settingsData.profilePublic}
                      onChange={handleSettingsChange}
                    />
                  </label>
                </div>

                <div className="setting-row">
                  <span className="setting-label">Share study stats</span>
                  <label className="checkbox">
                    <input 
                      type="checkbox" 
                      name="shareStudyStats"
                      checked={settingsData.shareStudyStats}
                      onChange={handleSettingsChange}
                    />
                  </label>
                </div>

                <div className="setting-row">
                  <span className="setting-label">Allow notifications</span>
                  <label className="checkbox">
                    <input 
                      type="checkbox" 
                      name="allowNotifications"
                      checked={settingsData.allowNotifications}
                      onChange={handleSettingsChange}
                    />
                  </label>
                </div>
              </div>

              {/* Other Settings */}
              <div className="settings-group">
                <h3 className="subsection-title">Other Settings</h3>
                
                <div className="setting-row">
                  <span className="setting-label">Language</span>
                  <select 
                    name="language" 
                    value={settingsData.language}
                    onChange={handleSettingsChange}
                    className="select-input"
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="setting-row">
                  <span className="setting-label">Time Zone</span>
                  <select 
                    name="timeZone" 
                    value={settingsData.timeZone}
                    onChange={handleSettingsChange}
                    className="select-input"
                  >
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) London</option>
                    <option>(GMT+08:00) Singapore</option>
                  </select>
                </div>

                <div className="setting-row">
                  <span className="setting-label">Study Goal (Daily)</span>
                  <div className="goal-input-wrapper">
                    <input
                      type="number"
                      name="dailyStudyGoal"
                      value={settingsData.dailyStudyGoal}
                      onChange={handleSettingsChange}
                      min="1"
                      max="24"
                      className="goal-input"
                    />
                    <span className="goal-unit">hrs</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Change Password Section */}
          <div className="change-password-section">
            <h3 className="subsection-title">Change Password</h3>
            
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="form-input password-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className="form-input password-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="form-input password-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="save-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;