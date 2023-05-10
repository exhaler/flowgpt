import { OpenAI } from 'langchain/llms/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

export const makeChain = (vectorStore: Chroma) => {
  // Initialize the LLM to use to answer the question
  const model = new OpenAI();

  // Create the chain
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
  );
  return chain;
};
