## Getting Started

1. Make sure you're running at least Node version 18. You can run `node -v` to check your current Node version.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your platform.

1. Clone the repo or download the ZIP

```
git clone [github https url]
```

1. Install packages

```
npm i
```

1. Set up your `.env` file

- Copy `.env.example` into `.env`
- Your `.env` file should look like this:

```
OPENAI_API_KEY=
COLLECTION_NAME=

```

- Visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) to retrieve API keys and insert into your `.env` file.
- Choose a collection name where you'd like to store your embeddings in Chroma. This collection will later be used for queries and retrieval.

1. In a new terminal window, run Chroma in the Docker container:

```
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:0.3.22
```

1. Inside `docs` folder is the document we want to 'ingest`.

1. Run the script `npm run ingest` to 'ingest' and embed your doc.

1. Run the app `npm run dev` to launch the local dev environment, and then type a question in the chat interface.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
