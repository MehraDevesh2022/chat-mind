# ChatMind

ChatMind is a full stack chat application that allows users to communicate with each other in real-time. It supports features like user authentication, one-on-one chat, group chat, user profile management, and more.

**Tech Stack:**

-   MERN (MongoDB, Express.js, React, Node.js)
-   Socket.IO
## Table of Contents 📜

 ## Demo
![Demo](./gif/demo.gif)


- [Intro](#intro)
- [Sections](#sections)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Setting Up .env in Backend](#setting-up-env-in-backend)
- [Hosting](#hosting)
- [Packages Used](#packages-used)
- [Upcoming Features](#upcoming-features)
- [Contribution Guidelines](#contribution-guidelines)

## Intro

ChatMind is a chat application built with the MERN stack. It provides a seamless and real-time chatting experience for users. With features like user authentication, one-on-one chat, group chat, and user profile management, ChatMind offers a comprehensive solution for communication needs.

## Sections 🔖

- Home
  - Login Page
  - Sign Up Page
  - Forgot Password Page
- Chat Page
  - Search User
  - One-on-One Chat
  - Group Chat
  - User Profile
  - Group Menu



[Add demo link here]

## Installation ⬇️

To run ChatMind locally, you will need to have Git and Node.js installed on your machine.

### Git

Download and install Git from the official website: [https://git-scm.com/downloads](https://git-scm.com/downloads)

### Node.js

Download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org)

## Getting Started 🎯

To get started with ChatMind, follow these steps:

1. Fork and clone the repository from GitHub:
   ```bash
   git clone https://github.com/MehraDevesh2022/chat-mind.git

 ## Install the required packages for the backend by running the following command in the root directory:
 

    npm install or yarn add
## Install the required packages for the frontend by navigating to the frontend directory and running the following command:

    cd ./frontend 
    npm install
    or
    yarn add
    
## Folder Structure 📂

- backend
  - app.js
  - appUtils
    - error.js
    - jwtToken.js
  - controller
    - chatController.js
    - messageController.js
    - userController.js
  - db
    - connectDB.js
  - middleware
    - asyncWrapper.js
    - auth.js
    - errorHandler.js
  - model
    - ChatModel.js
    - MessageModel.js
    - UserModel.js
  - route
    - chatRoute.js
    - messageRoutes.js
    - userRoute.js
  - utils
    - .env
- frontend
  - build
    - asset-manifest.json
    - favicon.ico
    - index.html
    - logo192.png
    - logo512.png
    - manifest.json
    - robots.txt
  - public
    - favicon.ico
    - index.html
    - logo192.png
    - logo512.png
    - manifest.json
    - robots.txt
  - src
    - App.css
    - App.js
    - index.css
    - index.js
    - reportWebVitals.js 
  - animations 
    - typing.json 
  - components 
    - Chatbox.js 
    - ChatLoading.js 
    - EmojiOptions.js 
    - MyChats.js 
    - ScrollableChat.js 
    - SingleChat.js 
    - styles.css 
  - config 
    - ChatLogics.js 
  - Context 
    - ChatProvider.js 
  - img 
    - img.jpg 
  - Pages 
    - Chatpage.js 
    - Homepage.css 
    - Homepage.js

## Setting Up .env in Backend
To set up the environment variables for the backend, create a `.env` file inside the `backend/utils` directory with the following contents:

```bash

PORT=5000
DB_LINK=xxxx
JWT_SECRET=xxxx
JWT_EXPIRE=2d
COOKIE_EXPIRE=2
NODE_ENV=production
CLOUDINARY_NAME=xxxx
API_KEY=xxxx
API_SECRET=xxxx
CLOUDINARY_URL=xxxx

```

  Make sure to replace `xxxx` with your actual values.

## Hosting 🌐
ChatMind can be hosted using the Render platform. Follow these steps to deploy ChatMind:  [https://chat-mind-3pcx.onrender.com/](https://chat-mind-3pcx.onrender.com/)

 1. Build the frontend by running the following command in the frontend directory: `npm run build`
 2.  Add the following deployment code to the `app.js` file in the backend directory:  
 
<<<<<<< HEAD
 ```javascript 
  // -----deployment code----- 

const path = require("path");
const __dirname1 = path.resolve(); 
if (process.env.NODE_ENV === "production") {
  
   app.use(express.static(path.join(__dirname1, "/frontend/build"))); 
   app.get("*", (req, res) => res.sendFile( path.resolve(__dirname1, "frontend", "build", "index.html") ) );

 }
 else {

  app.get("/", (req, res) => { res.send("API is running..");

   }); 
   }

  // -----deployment code ends-----
  ```
3 Push the code to a Git repository (GitHub, GitLab, or Bitbucket).
4 Sign up for Render and select "Web Services" from the dashboard.
5 Choose the repository from GitHub, GitLab, or Bitbucket.
6 Add a project name and select the runtime as Node.
7 Set the build command to npm install or yarn install.
8 Set the start command to node backend/app.js or npm start or yarn start.
9 Go to the "Advanced" tab and add all the environment keys and their corresponding values from the .env file.
10 Create the web service.
11 Once the web service is created, go to the "Overview" tab and click on the link to view the application.

## Packages Used 📦

### Server side :
| Dependency           | Description                                                 |
|----------------------|-------------------------------------------------------------|
| bcryptjs             | Library for hashing and salting passwords                   |
| body-parser          | Middleware for parsing request bodies                       |
| cookie-parser        | Middleware for parsing cookies                              |
| cors                 | Middleware for enabling Cross-Origin Resource Sharing        |
| dotenv               | Library for loading environment variables from a file       |
| express              | Web application framework for Node.js                       |
| express-fileupload   | Middleware for handling file uploads                        |
| jsonwebtoken         | Library for generating and verifying JSON Web Tokens         |
| mongoose             | MongoDB object modeling tool for Node.js                    |
| multer               | Middleware for handling file uploads                        |
| nodemailer           | Library for sending emails                                  |
| cloudinary           | Cloud-based image and video management platform             |

### Clint-side

| Dependency                    | Description                                                     |
|-------------------------------|-----------------------------------------------------------------|
| @chakra-ui/icons              | Icon library for Chakra UI                                       |
| @chakra-ui/react              | UI component library for React with Chakra UI                    |
| @emotion/react                | Library for writing CSS styles with JavaScript                   |
| @emotion/styled               | Library for styling React components with Emotion                |
| @material-ui/core             | Material-UI component library for React                          |
| @material-ui/icons            | Material-UI icons package for React                              |
| @mui/icons-material           | Material-UI icons package for MUI (formerly Material-UI)         |
| @mui/material                 | UI component library for React with MUI (formerly Material-UI)   |
| axios                         | Promise-based HTTP client for the browser and Node.js            |
| framer-motion                 | Library for creating fluid animations in React                   |
| react                         | JavaScript library for building user interfaces                  |
| react-chips                   | React component for input chips                                  |
| react-dom                     | Entry point for React DOM rendering                              |
| react-helmet                  | Library for managing document head tags in React                 |
| react-lottie                  | Library for adding Lottie animations to React applications       |
| react-notification-badge      | Notification badge component for React                           |
| react-router-dom              | Routing library for React applications                           |
| react-scripts                 | Configuration and scripts for Create React App                   |
| react-scrollable-feed         | Scrollable feed component for React                              |
| socket.io-client              | Library for WebSocket communication in the browser              |
| styled-components             | Library for styling React components with CSS-in-JS              |

## Upcoming Features 🚀

 - AI Chat using Open Ai api
 - Dark mode
 - Audio and video calls
 - Rest password
 -  Media sharing
  -  And More ....
 
 ## Raise an issue for :
 
 - -   Found a bug
 - -   Add new service
 - -   For adding Upcoming Features
 - -   For Improving Documentation
 - -    And More ....
 
 ## Contribution Guidelines 🤝

 contributions are welcome! To contribute to ChatMind, follow these steps:
 
 - Fork the repository.
 - Create a new branch.
 - Make your changes.
 - Commit your changes.
 - Push to the branch.
 - Open a pull request.
 
  ## Contributors 🤝
  @MehraDevesh2022 
 
> Happy chatting with ChatMind! If you have any questions or need further assistance, feel free to reach out.
 

 
 

  
