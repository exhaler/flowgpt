import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from '@/styles/home.module.css';
import { Message, MessageTypes } from '@/types/chat';
import LoadingDots from '@/components/ui/LoadingDots';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about the uploaded doc?',
        type: MessageTypes.API_MESSAGE,
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Focus on text area
  useEffect(() => {
    textAreaRef.current?.focus();
  }, [messages]);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  // Handle form submission
  const handleSubmit = async () => {
    setError(null);

    if (!query) {
      setError('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: MessageTypes.USER_MESSAGE,
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        const { text } = data;
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: MessageTypes.API_MESSAGE,
              message: text,
            },
          ],
          history: [...state.history, [question, text]],
        }));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
    }
  };

  // Prevent blank submissions
  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && query) {
      handleSubmit();
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Layout>
      <div className="mx-auto gap-4">
        <h1 className="text-2xl font-bold tracking-tighter text-center">
          Chat With Your Uploaded Doc
        </h1>
        <main className={styles.main}>
          <div className={styles.cloud}>
            <div ref={messageListRef} className={styles.messageList}>
              {messages.map((message, index) => {
                let icon;
                let className;
                if (message.type === MessageTypes.API_MESSAGE) {
                  icon = (
                    <Image
                      key={`botIcon-${index}`}
                      src="/bot-icon.png"
                      alt="AI"
                      width="40"
                      height="40"
                      className={styles.botIcon}
                    />
                  );
                  className = styles.apiMessage;
                } else {
                  icon = (
                    <Image
                      key={`userIcon-${index}`}
                      src="/user-icon.png"
                      alt="User"
                      width="30"
                      height="30"
                      className={styles.userIcon}
                    />
                  );
                  // The latest message sent by the user will be animated while waiting for a response
                  className =
                    loading && index === messages.length - 1
                      ? styles.userMessageWaiting
                      : styles.userMessage;
                }
                return (
                  <div key={`chatMessage-${index}`} className={className}>
                    {icon}
                    <div className={styles.botAnswer}>{message.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.cloudForm}>
              <form onSubmit={handleSubmit}>
                <textarea
                  disabled={loading}
                  onKeyDown={handleEnter}
                  ref={textAreaRef}
                  rows={1}
                  maxLength={512}
                  placeholder={
                    loading
                      ? 'Waiting for response...'
                      : 'What is this document about?'
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.textarea}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.generateButton}
                >
                  {loading ? (
                    <div className={styles.loadingWheel}>
                      <LoadingDots color="#000" />
                    </div>
                  ) : (
                    // Send icon SVG in input field
                    <svg
                      viewBox="0 0 20 20"
                      className={styles.svgIcon}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
          {error && (
            <div className="border border-red-400 rounded-md p-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
