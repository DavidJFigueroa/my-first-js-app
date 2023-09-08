# Pokedex Documentation

The **Pokedex** is a simple JavaScript application that allows users to browse and view information about various Pokémon. This documentation provides an overview of the application's structure and functionality.

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/122026800/266649224-4e47c9a5-5ba4-4577-bc01-0d9c49a45300.png)

## Table of Contents

1. [Overview](#overview)
2. [Application Structure](#application-structure)
3. [API Integration](#api-integration)
4. [Usage](#usage)
5. [HTML Structure](#html-structure)
6. [Styles](#styles)
7. [Dependencies](#dependencies)

## Overview

The **Pokedex** application fetches data from the [PokeAPI](https://pokeapi.co/) to display a list of Pokémon and their details. Users can click on a Pokémon name to view additional information in a modal dialog.

## Application Structure

The application consists of two main components:

- `script.js`: This JavaScript file contains the core logic of the application. It defines a module called `pokemonRepository` that encapsulates the Pokémon data and functions.
- `index.html`: The HTML file that defines the structure of the application, including the list of Pokémon and the modal dialog.

## API Integration

The application utilizes the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. It loads a list of Pokémon with basic information and allows users to view additional details when clicking on a Pokémon's name.

## Usage

1. Clone the repository or download the source code.

2. Open `index.html` in a web browser.

3. The application will display a list of Pokémon names. Click on a Pokémon name to view its details in a modal dialog.

## HTML Structure

- **Navbar**: The navigation bar at the top contains the Pokedex logo.

- **Pokemon List**: The list of Pokémon is displayed as an unordered list (`ul`), and each Pokémon name is wrapped in a list item (`li`). Each name is also a clickable button.

- **Modal Dialog**: The modal dialog is initially hidden and appears when a Pokémon name is clicked. It displays the Pokémon's name, an image, and its height. There's also a close button (`x`) to hide the modal.

- **Footer Link**: A "Back to Top" link is provided at the bottom to quickly scroll to the top of the page.

## Styles

The application uses Bootstrap for styling, and custom CSS is provided in the `styles.css` file (though it's not included in the provided code).

## Dependencies

The following libraries and dependencies are used in the application:

- [Bootstrap](https://getbootstrap.com/): CSS framework for styling.
- [jQuery](https://jquery.com/): JavaScript library for DOM manipulation.
- [Popper.js](https://popper.js.org/): Dependency for Bootstrap's tooltips and popovers.

Please note that the application uses polyfills for Promises and Fetch, which are included as `promise-polyfill.js` and `fetch-polyfill.js` respectively. These are used for compatibility with older browsers.

---

With this documentation, you should have a clear understanding of the structure and functionality of the "Pokedex" JavaScript application. You can further customize and expand upon this codebase as needed for your own project.
