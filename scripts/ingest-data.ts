import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import * as fs from 'fs';

/* Name of directory to retrieve your files from */
const filePath = 'docs/state_of_the_union.txt';
const collectionName = process.env.COLLECTION_NAME ?? '';

export const run = async () => {
  try {
    // Load in the txt we want to do question answering over
    const text = fs.readFileSync(filePath, 'utf8');

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);

    // Create the vectorStore
    console.log('Creating vector store...');
    await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
      collectionName,
    });
  } catch (error) {
    console.error({ error });
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('Ingestion complete');
})();
