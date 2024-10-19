# Query Music & Image Finder 🎶🌄

## Overview

This application allows the user to search a keyword (or keywords) and returns the user one song and 10 images related to the word they searched. The app uses the Deezer API to embed the song on to the site, as well as the Unsplash API to source images. It's built using React for the frontend, with a Node.js/Express server to handle API requests and mitigate CORS issues.

## Project Structure

The project is divided into two main parts:

1. Frontend (React + JavaScript):

- The frontend allows users to enter a search term, view the results (music and images), and interact with the results.
- Components:
  - SearchBar: Handles user input and initiates the search request.
  - MusicEmbed: Displays and embeds the music player using the Deezer oEmbed API.
  - ImageGallery: Displays the 10 images retrieved from the Unsplash API.

2. Backend (Node.js + Express):

- A simple server that handles API requests to the Deezer and Unsplash APIs. The server also mitigates CORS issues by proxying the requests.
- The server processes the user's search term, retrieves data from both APIs, and sends it back to the React frontend.

## Technologies & Frameworks Used

### Frontend

- React: A JavaScript library for building the user interface.
- JavaScript (ES6): The primary language used for logic and functionality.
- Tailwind: For styling the application.
- Deezer API (oEmbed): Used to embed music players related to the searched term.
- Unsplash API: Used to retrieve 10 images related to the searched term.

### Backend

- Node.js: A runtime environment to run JavaScript on the server-side.
- Express: A minimal and flexible Node.js web application framework used to create the server and handle API requests.
- CORS Handling: The backend server ensures that CORS (Cross-Origin Resource Sharing) issues with the Deezer and Unsplash APIs are properly mitigated.

## How it Works

1. The user enters a search term in the search bar.
2. The frontend sends the search term to the backend.
3. The backend server queries the Deezer and Unsplash APIs for music and images related to the term.
4. The server responds with an embedded Deezer music player and 10 images from Unsplash.
5. The frontend displays the embedded music player and the image gallery to the user.
