# Work Mental Health Project

This project aims to provide a comprehensive mental health support system using various microservices. The services are managed using Docker Compose and include a Telegram bot, a client application, a BERT-based service, a form server, CouchDB, and Ollama.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Services](#services)
- [Additional notes](#additional-notes)

## Prerequisites

- Docker
- Docker Compose

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext

EMAIL="test@mail.com"
DOMAIN="domain.com"

TRAEFIK_SUBDOMAIN="traefik"

CLIENT_SUBDOMAIN="biba"
CLIENT_PORT=3000

BERT_SUBDOMAIN="bert"
BERT_PORT=5000

FORM_SUBDOMAIN="form"
FORM_PORT=6000

BOT_SUBDOMAIN="bot"
BOT_PORT=4000

COUCHDB_USER=
COUCHDB_PASSWORD=

```

Replace the placeholder values with your actual credentials and URLs.

!!!IMPORTANT!!!
Don't forget to setup environment variables in `./telegram-bot`

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mental-health.git
cd mental-health
```

2. Set up the environment variables as described above.

## Usage

1. Start the services using Docker Compose:

```bash
docker-compose up -d
```

This command will start all the services defined in the docker-compose.yml file.

2. Run commands to pull ollama model (see available models [here](https://github.com/ollama/ollama?tab=readme-ov-file#model-library)):

```bash
docker exec -it ollama ollama pull phi3
```

3. Create user database for couch:

```bash
sudo docker exec -it couchdb bash
curl -u ADMIN:PASSWORD -X PUT http://127.0.0.1:5984/users
```

## Services

### Traefik

Traefik is used as a reverse proxy and load balancer for the services. It handles SSL termination and routing.

### Client

The client application is built from the ./client directory.

### BERT

The BERT-based service is built from the ./bert directory.

### Form

The form server is built from the ./mental-form-server directory.

### Bot

The Telegram bot is built from the ./telegram-bot directory.

### CouchDB

CouchDB is used as the database for storing user data and emotions.

### Ollama

Ollama is used for chatbot functionalities.

## Additional Notes

- Ensure that the environment variables are correctly set up in the .env file.
- The services are configured to restart on failure to ensure high availability.
- Traefik handles SSL termination and routing, making it easier to manage multiple services under a single domain.

By following this documentation, you should be able to set up and run the work-mental-health project successfully.
