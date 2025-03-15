# Wiki

## Overview

It provides a modern and sleek interface with support for multiple themes, including dark mode, light mode, and high contrast mode. Users can customize their experience with various font and font size options.

## Project Structure

```tree
Wiki
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

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Wiki
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000` (or the port specified in `appConfig.js`).

## Customization

Users can customize their experience through the Settings Panel, where they can select their preferred theme and adjust font settings.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
