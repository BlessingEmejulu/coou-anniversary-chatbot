# COOU Anniversary ChatBot

## Overview
The **COOU Anniversary ChatBot** is a web-based application that provides instant answers to questions about Chukwuemeka Odumegwu Ojukwu University (COOU), with a special focus on its anniversary celebrations. The chatbot helps users discover event schedules, university history, achievements, and other key information related to COOU.

## Project Structure
```
coou-anniversary-chatbot
├── backend
│   ├── index.js                      # Node.js backend for Gemini API integration
│   └── coou_anniversary_ai_model_data.txt  # Custom context/instructions for the AI
├── src
│   ├── assets
│   │   └── styles.css                # Chatbot styles
│   ├── scripts
│   │   └── main.js                   # Frontend chatbot logic
│   └── index.html                    # Main HTML file
└── README.md                         # Project documentation
```

## Getting Started

### 1. Clone the repository
```sh
git clone <repository-url>
cd coou-anniversary-chatbot
```

### 2. Backend Setup
- Navigate to the `backend` directory:
  ```sh
  cd backend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file with your Gemini API key:
  ```
  GEMINI_API_KEY=your_google_gemini_api_key
  ```
- Start the backend server:
  ```sh
  node index.js
  ```

### 3. Frontend Usage
- Open `src/index.html` in your web browser.
- Ensure the backend server is running for chatbot responses.

## Features
- Ask about COOU’s history, faculties, and achievements.
- Get details on the 25th anniversary and event schedules.
- Friendly, informative, and context-aware responses.

## Usage Tips
- Type your question and press Enter or click the send button.
- The chatbot is tailored for COOU and its anniversary—off-topic questions may not be answered.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License
This project is for educational and informational purposes.

---
```# COOU Anniversary ChatBot

## Overview
The **COOU Anniversary ChatBot** is a web-based application that provides instant answers to questions about Chukwuemeka Odumegwu Ojukwu University (COOU), with a special focus on its anniversary celebrations. The chatbot helps users discover event schedules, university history, achievements, and other key information related to COOU.

## Project Structure
```
coou-anniversary-chatbot
├── backend
│   ├── index.js                      # Node.js backend for Gemini API integration
│   └── coou_anniversary_ai_model_data.txt  # Custom context/instructions for the AI
├── src
│   ├── assets
│   │   └── styles.css                # Chatbot styles
│   ├── scripts
│   │   └── main.js                   # Frontend chatbot logic
│   └── index.html                    # Main HTML file
└── README.md                         # Project documentation
```

## Getting Started

### 1. Clone the repository
```sh
git clone <repository-url>
cd coou-anniversary-chatbot
```

### 2. Backend Setup
- Navigate to the `backend` directory:
  ```sh
  cd backend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file with your Gemini API key:
  ```
  GEMINI_API_KEY=your_google_gemini_api_key
  ```
- Start the backend server:
  ```sh
  node index.js
  ```

### 3. Frontend Usage
- Open `src/index.html` in your web browser.
- Ensure the backend server is running for chatbot responses.

## Features
- Ask about COOU’s history, faculties, and achievements.
- Get details on the 25th anniversary and event schedules.
- Friendly, informative, and context-aware responses.

## Usage Tips
- Type your question and press Enter or click the send button.
- The chatbot is tailored for COOU and its anniversary—off-topic questions may not be answered.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License
This project is for educational and informational purposes.

---