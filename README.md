## Getting Started

1. Make sure you're running at least Node version 18. You can run `node -v` to check your current Node version.

2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your platform.

3. Clone the repo or download the ZIP

```
git clone [github https url]
```

4. Install packages

```
npm i
```

5. Set up your `.env` file

- Copy `.env.example` into `.env`
- Your `.env` file should look like this:

```
OPENAI_API_KEY=
COLLECTION_NAME=

```

- Visit [Openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Choose a collection name where you'd like to store your embeddings in Chroma. This collection will later be used for queries and retrieval.

6. In a new terminal window, run Chroma in the Docker container:

```
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:0.3.22
```

7. Inside `docs` folder is the document we want to 'ingest`.

8. Run the script `npm run ingest` to 'ingest' and embed your doc.

9. Run the app `npm run dev` to launch the local dev environment, and then type a question in the chat interface.

## Sample Questions

- What did the president say about Justice Breyer?
- Was that nice?
