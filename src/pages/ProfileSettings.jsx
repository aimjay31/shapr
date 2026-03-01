import { useState } from "react";
import "../styles/ProfileSettings.css";

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = useState("profile"); // "profile" or "settings"
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Mock user data
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@university.edu",
    bio: "",
    role: "Student • Computer Science"
  });

  const [settingsData, setSettingsData] = useState({
    themeColor: "green",
    nightMode: false,
    profilePublic: true,
    shareStudyStats: true,
    allowNotifications: true,
    language: "English (US)",
    timeZone: "(GMT-08:00) Pacific Time (US & Canada)",
    dailyStudyGoal: 4
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // TODO: Implement API call
    alert("Changes saved successfully!");
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log("Logging out...");
  };

  return (
    <div className="profile-settings-page">
      {/* Header with navigation */}
      <div className="page-header">
        <h1 className="page-title">Profile & Settings</h1>
        <div className="header-actions">
          <span className="language-selector">EN ▾</span>
          <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>

      {/* Main content */}
      <div className="profile-settings-content">
        {/* Left sidebar with user info and navigation */}
        <div className="settings-sidebar">
          <div className="user-info-card">
            <div className="user-avatar">
              <img 
                src="https://i.pravatar.cc/100?img=5" 
                alt="Jane Doe" 
                className="avatar-image"
              />
            </div>
            <h2 className="user-name">{profileData.firstName} {profileData.lastName}</h2>
            <p className="user-role">{profileData.role}</p>
            <p className="user-email">{profileData.email}</p>
          </div>

          <div className="sidebar-nav">
            <button 
              className={`nav-item ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => setActiveSection("profile")}
            >
              Edit Profile
            </button>
            <button 
              className={`nav-item ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => setActiveSection("settings")}
            >
              Settings
            </button>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">↪</span>
            Logout
          </button>
        </div>

        {/* Right content area */}
        <div className="settings-content">
          {activeSection === "profile" ? (
            /* Edit Profile Section */
            <div className="profile-section">
              <h2 className="section-title">Edit Profile</h2>
              <p className="section-description">
                Update your personal information and profile settings.
              </p>

              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                  <p className="input-note">We'll never share your email with anyone else.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Short Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    className="form-input textarea"
                    placeholder="Tell us a little about your study goals..."
                    rows="3"
                  />
                </div>

                {/* Change Password Section */}
                <div className="change-password-section">
                  <h3 className="subsection-title">Change Password</h3>
                  
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
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
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showNewPassword ? "text" : "password"}
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
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn">Cancel</button>
                  <button type="button" className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
                </div>
              </form>
            </div>
          ) : (
            /* Settings Section */
            <div className="settings-section">
              <h2 className="section-title">Settings</h2>

              {/* Appearance */}
              <div className="settings-group">
                <h3 className="subsection-title">Appearance</h3>
                
                <div className="setting-row">
                  <span className="setting-label">Theme Color</span>
                  <div className="theme-color-selector">
                    <button className="color-option green active" title="Green"></button>
                    <button className="color-option purple" title="Purple"></button>
                    <button className="color-option blue" title="Blue"></button>
                    <button className="color-option orange" title="Orange"></button>
                    <button className="color-option red" title="Red"></button>
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

                <div className="setting-row">
                  <span className="setting-label">Change Password</span>
                  <button className="link-btn">Update</button>
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
                    <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                    <option>(GMT-05:00) Eastern Time (US & Canada)</option>
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
        </div>
      </div>
    </div>
  );
}