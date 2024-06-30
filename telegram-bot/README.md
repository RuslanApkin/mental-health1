# Telegram Bot with Telegraf

This is a Telegram bot built using the Telegraf framework. The bot integrates with a CouchDB database, an emotion detection API, and an Ollama chatbot model.

## Features

- **Emotion Detection**: Analyzes the emotions in user messages and stores the results.
- **Ollama Chatbot**: Provides chatbot functionalities using the Ollama model.

## Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- CouchDB instance
- Access to the emotion detection API
- Access to the Ollama chatbot model

## Environment Variables

Create a `env/.development.env` and `env/.production.env` file in the root directory of your project and copy contents from `env/example.env`:

```
TELEGRAM_TOKEN=your_telegram_bot_token

COUCHDB_USER=your_couchdb_username
COUCHDB_PASSWORD=your_couchdb_password
COUCHDB_URL=http://couchdb:5984

EMOTIONS_URL=https://motion.fewclicks.ru/emotions

MODEL_URL=http://ollama:11434
MODEL=phi3

CLIENT_URL=http://localhost:5000
```

Replace the placeholder values with your actual credentials and URLs.

## Bot Functionalities

### Emotion Detection

The bot analyzes the emotions in user messages and stores the results in the CouchDB database. The detected emotions are transformed into a specific format and saved using the updateUserEmotionsByChatId function.

### Ollama Chatbot

The bot integrates with the Ollama chatbot model to provide conversational capabilities. The model URL and name are specified in the environment variables.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# production
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

```

```

```

```
