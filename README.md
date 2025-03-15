# Markdown Diagram System

## Overview
The Markdown Diagram System is an interactive Node.js-based application that dynamically generates diagrams based on the interlinking of Markdown files within a wiki. It provides a modern and sleek interface with support for multiple themes, including dark mode, light mode, and high contrast mode. Users can customize their experience with various font and font size options.

## Features
- **Dynamic Diagram Generation**: Automatically generates diagrams based on the links found in Markdown files.
- **Draggable Nodes**: Nodes can be dragged around the diagram for better organization.
- **Zoom Functionality**: Users can zoom in and out of the diagram for detailed views.
- **Customizable Themes**: Switch between dark mode, light mode, and high contrast mode.
- **Node Interaction**: Clickable nodes that link to corresponding wiki pages for detailed information.
- **User Preferences**: Save and manage user preferences for themes and font settings.

## Project Structure
```
markdown-diagram-system
├── src
│   ├── app.js
│   ├── config
│   │   ├── appConfig.js
│   │   └── themes.js
│   ├── core
│   │   ├── diagramEngine.js
│   │   ├── fileParser.js
│   │   └── markdownProcessor.js
│   ├── public
│   │   ├── css
│   │   │   ├── darkTheme.css
│   │   │   ├── lightTheme.css
│   │   │   └── highContrastTheme.css
│   │   ├── js
│   │   │   ├── diagramRenderer.js
│   │   │   ├── interactionHandlers.js
│   │   │   └── zoomController.js
│   │   └── index.html
│   ├── models
│   │   ├── Node.js
│   │   ├── Link.js
│   │   └── DiagramState.js
│   ├── services
│   │   ├── wikiService.js
│   │   └── userPreferencesService.js
│   ├── utils
│   │   ├── fileUtils.js
│   │   └── themeUtils.js
│   └── views
│       ├── components
│       │   ├── Menu.js
│       │   ├── Diagram.js
│       │   ├── SettingsPanel.js
│       │   └── NodeDetail.js
│       └── layouts
│           └── main.js
├── tests
│   ├── fileParser.test.js
│   ├── diagramEngine.test.js
│   └── markdownProcessor.test.js
├── package.json
├── .gitignore
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd markdown-diagram-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the application:
   ```
   npm start
   ```
2. Open your web browser and navigate to `http://localhost:3000` (or the port specified in `appConfig.js`).

## Customization
Users can customize their experience through the Settings Panel, where they can select their preferred theme and adjust font settings.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.