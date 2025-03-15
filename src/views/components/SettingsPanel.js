import React, { useState } from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ onThemeChange, onFontChange, onFontSizeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [selectedFont, setSelectedFont] = useState('Arial');
    const [selectedFontSize, setSelectedFontSize] = useState('16px');

    const handleThemeChange = (event) => {
        const theme = event.target.value;
        setSelectedTheme(theme);
        onThemeChange(theme);
    };

    const handleFontChange = (event) => {
        const font = event.target.value;
        setSelectedFont(font);
        onFontChange(font);
    };

    const handleFontSizeChange = (event) => {
        const fontSize = event.target.value;
        setSelectedFontSize(fontSize);
        onFontSizeChange(fontSize);
    };

    return (
        <div className="settings-panel">
            <h2>Settings</h2>
            <div className="setting-item">
                <label htmlFor="theme-select">Theme:</label>
                <select id="theme-select" value={selectedTheme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="high-contrast">High Contrast</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="font-select">Font:</label>
                <select id="font-select" value={selectedFont} onChange={handleFontChange}>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>
            <div className="setting-item">
                <label htmlFor="font-size-select">Font Size:</label>
                <select id="font-size-select" value={selectedFontSize} onChange={handleFontSizeChange}>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                </select>
            </div>
        </div>
    );
};

export default SettingsPanel;