import React, { useState } from "react";
import { useNightMode } from "../context/NightModeContext";
import "../styles/ProfileSettings.css";

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const GearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const ProfileSettings = () => {
  const { nightMode, toggleNightMode, themeColor, setThemeColor } = useNightMode();

  const [view, setView] = useState("settings");

  const [savedProfile, setSavedProfile] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@university.edu",
    bio: "",
    role: "Student • Computer Science",
  });

  const [formData, setFormData] = useState({ ...savedProfile });
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [showPw, setShowPw] = useState({ new: false, confirm: false });

  const [settings, setSettings] = useState({
    profilePublic: true,
    shareStudyStats: false,
    allowNotifications: true,
    language: "English (US)",
    timeZone: "(GMT-08:00) Pacific Time (US & Canada)",
    dailyStudyGoal: 4,
  });

  const handleSettings = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (view === "editProfile") {
      setSavedProfile({ ...formData, role: savedProfile.role });
    }
    alert("Changes saved!");
  };

  const handleCancel = () => {
    setFormData({ ...savedProfile });
    setPasswords({ new: "", confirm: "" });
  };

  const tc = `theme-${themeColor}`;

  return (
    <div className={`profile-settings-page ${tc}`}>

      {/* ===== SETTINGS VIEW ===== */}
      {view === "settings" && (
        <>
          <h1 className="psp-page-title">Settings</h1>

          {/* Profile Header */}
          <div className="profile-header-card anim-1">
            <div className="ph-avatar-wrap">
              <img src="https://i.pravatar.cc/150?img=5" alt="Jane Doe" />
              <div className="ph-edit-dot">✏</div>
            </div>
            <div className="ph-info">
              <p className="ph-name">{savedProfile.firstName} {savedProfile.lastName}</p>
              <p className="ph-role">{savedProfile.role}</p>
              <p className="ph-email">{savedProfile.email}</p>
              <span className="ph-badge">✦ Pro Member</span>
            </div>
            <button className="edit-profile-btn" onClick={() => setView("editProfile")}>
              Edit Profile
            </button>
          </div>

          {/* Appearance + Privacy row */}
          <div className="cards-row anim-2">

            {/* Appearance */}
            <div className="settings-card">
              <h3 className="card-title">
                <span className="card-icon"><PaletteIcon /></span>
                Appearance
              </h3>

              <div className="tc-label">Theme Color</div>
              <div className="tc-dots">
                {["purple","blue","green","red"].map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`tc-dot c-${c} ${settings.themeColor === c ? "active" : ""}`}
                    onClick={() => setThemeColor(c)}
                    title={c.charAt(0).toUpperCase() + c.slice(1)}
                  >
                    {settings.themeColor === c ? "✓" : ""}
                  </button>
                ))}
              </div>

              {/* Night Mode toggle — now controls global state via context */}
              <div className="nm-row">
                <div className="nm-text">
                  <h4>Night Mode</h4>
                  <p>Switch between light and dark themes</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={nightMode}
                    onChange={toggleNightMode}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="settings-card">
              <h3 className="card-title">
                <span className="card-icon"><LockIcon /></span>
                Privacy &amp; Security
              </h3>

              {[
                { name: "profilePublic",      label: "Make profile public" },
                { name: "shareStudyStats",    label: "Share study stats" },
                { name: "allowNotifications", label: "Allow notifications" },
              ].map(({ name, label }) => (
                <div className="privacy-row" key={name}>
                  <span className="privacy-label">{label}</span>
                  <label className="toggle-switch">
                    <input type="checkbox" name={name} checked={settings[name]} onChange={handleSettings} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              ))}

              <button className="change-pw-link" onClick={() => setView("editProfile")}>
                🔑 Change Password
              </button>
            </div>
          </div>

          {/* Other Settings */}
          <div className="other-settings-card anim-3">
            <h3 className="card-title">
              <span className="card-icon"><GearIcon /></span>
              Other Settings
            </h3>

            <div className="other-fields-row">
              <div className="field-group">
                <div className="field-label">Language</div>
                <select name="language" value={settings.language} onChange={handleSettings} className="setting-select">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="field-group">
                <div className="field-label">Time Zone</div>
                <select name="timeZone" value={settings.timeZone} onChange={handleSettings} className="setting-select">
                  <option>(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT+08:00) Singapore</option>
                </select>
              </div>
            </div>

            <div className="field-label">Study Goal (Daily)</div>
            <div className="goal-row-wrap">
              <input
                type="range"
                className="goal-slider"
                name="dailyStudyGoal"
                min={1} max={12}
                value={settings.dailyStudyGoal}
                onChange={handleSettings}
              />
              <span className="goal-value">{settings.dailyStudyGoal} hrs</span>
            </div>
          </div>

          <div className="psp-footer anim-4">
            <button className="btn-cancel" onClick={handleCancel}>Discard</button>
            <button className="btn-save" onClick={handleSave}>Save Changes</button>
          </div>
        </>
      )}

      {/* ===== EDIT PROFILE VIEW ===== */}
      {view === "editProfile" && (
        <>
          <div className="edit-header-row anim-1">
            <button className="back-link" onClick={() => setView("settings")}>← Back to Settings</button>
            <h2 className="edit-title">Edit Profile</h2>
          </div>
          <p className="edit-subtitle anim-1">Update your personal information and profile settings.</p>

          <div className="edit-card anim-2">
            <div className="form-row-2">
              <div>
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleForm} className="form-input" placeholder="Jane" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleForm} className="form-input" placeholder="Doe" />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleForm} className="form-input" placeholder="jane.doe@university.edu" />
              <p className="form-helper">✦ We'll never share your email with anyone else.</p>
            </div>

            <div className="form-field">
              <label className="form-label">Short Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleForm} className="form-textarea" placeholder="Tell us a little about your study goals..." rows={4} />
            </div>

            <div className="streak-badge">
              <span className="streak-label-txt">Study Streak</span>
              <span className="streak-fire">🔥</span>
              <span className="streak-val">12 days</span>
            </div>

            <div className="cp-divider" />
            <h3 className="cp-title">Change Password</h3>

            <div className="form-field">
              <label className="form-label">New Password</label>
              <div className="pw-wrap">
                <input
                  type={showPw.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                  className="form-input"
                  placeholder="••••••••"
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(p => ({ ...p, new: !p.new }))}>
                  {showPw.new ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label className="form-label">Confirm New Password</label>
              <div className="pw-wrap">
                <input
                  type={showPw.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                  className="form-input"
                  placeholder="••••••••"
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(p => ({ ...p, confirm: !p.confirm }))}>
                  {showPw.confirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          <div className="psp-footer anim-3">
            <button className="btn-cancel" onClick={handleCancel}>Discard</button>
            <button className="btn-save" onClick={handleSave}>Save Changes</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSettings;