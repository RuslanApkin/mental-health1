# Emotion Detection API

This project is a simple FastAPI server that hosts a BERT-based emotion detection model. The server exposes an endpoint to infer emotions from the provided text. The model used is j-hartmann/emotion-english-distilroberta-base from the Hugging Face Transformers library.

## Setup

To setup the project, follow the steps below:

1. Clone the repository (or copy the provided script into a directory).

2. Create and activate a virtual environment:

```sh
python -m venv .venv
```

3. Activate the environment

```sh
source .venv/bin/activate
```

On Windows:
```sh
.venv\Scripts\activate
```


3. Install the requirements:

```sh
python -m pip install -r requirements.txt
```

## Running the Server

To run the FastAPI server locally, use the following command:

```sh
uvicorn main:app --reload
```

The server should now be running at http://127.0.0.1:8000.

## API Endpoints

### Root

- URL: /
- Method: GET
- Response: Returns a welcome message

```json
{
	"message": "Hello World"
}
```


### Emotion Detection

- URL: /emotions
- Method: POST
- Request Body:

```json
{
	"text": "Your input text here"
}
```


- Response: Returns the detected emotions along with their scores

```json
[
    {
      "label": "anger",
      "score": 0.004419783595949411
    },
    {
      "label": "disgust",
      "score": 0.0016119900392368436
    },
    {
      "label": "fear",
      "score": 0.0004138521908316761
    },
    {
      "label": "joy",
      "score": 0.9771687984466553
    },
    {
      "label": "neutral",
      "score": 0.005764586851000786
    },
    {
      "label": "sadness",
      "score": 0.002092392183840275
    },
    {
      "label": "surprise",
      "score": 0.008528684265911579
    }
]
```

## Error Handling

If the model encounters an error while processing the text, the server will return a 500 Internal Server Error response with the error details.

## Model Information

This server uses the distilroberta-base model fine-tuned on emotion detection tasks. The model is capable of detecting the following emotions:
- Anger
- Disgust
- Fear
- Joy
- Neutral
- Sadness
- Surprise

## Requirements

Ensure you have the following dependencies listed in your requirements.txt:

fastapi
pydantic
torch
transformers
uvicorn


You can install these dependencies by running:

pip install fastapi pydantic torch transformers uvicorn


## License

This project is licensed under the terms of the MIT license.
