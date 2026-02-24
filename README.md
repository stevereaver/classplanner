# Class Planner - GKR Karate Master System

A simple Node.js/Express application that uses AI to generate GKR Karate class plans based on duration, focus areas, and kata list.

## Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.
- An [OpenRouter](https://openrouter.ai/) API Key.

## Getting Started

### 1. Get an OpenRouter API Key

1. Go to [OpenRouter API Keys](https://openrouter.ai/keys).
2. Create clinical a new key.
3. Copy the key for the next step.

### 2. Configure Environment Variables

Create a `.env` file in the root directory (already created if you followed the setup) and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_actual_api_key_here
```

### 3. Run with Docker Compose

To build and start the application, run:

```bash
docker-compose up --build
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Features

- **Modern Dojo Theme**: A clean, professional UI with GKR colors (White, Charcoal, Red).
- **Dynamic Form**: Interactive options for class duration, focus areas (Warm up, Kumite, etc.), and a dynamic GKR Kata list.
- **AI-Powered Generation**: Connects to OpenRouter's Gemini 2.0 Flash Lite model to act as a 7th Dan GKR Master.
- **PDF Export**: Generate a clean, printable class plan at the touch of a button.

## Architecture

- **Backend**: Node.js/Express serving static files and the generation API.
- **Frontend**: Vanilla HTML/JavaScript with Tailwind CSS for rapid, beautiful styling.
- **AI Integration**: OpenRouter API with a specialized system prompt for karate syllabus expertise.
