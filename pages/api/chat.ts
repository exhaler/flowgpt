import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { makeChain } from '@/utils/makechain';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;
  const collectionName = process.env.COLLECTION_NAME ?? '';

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  try {
    // create vectorStore
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings({}),
      {
        collectionName,
      },
    );

    // Create chain
    const chain = makeChain(vectorStore);

    //Ask a question using chat history
    const response = await chain.call({
      question,
      chat_history: history || [],
    });

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
