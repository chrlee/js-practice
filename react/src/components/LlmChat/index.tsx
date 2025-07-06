import { useEffect, useState, useRef } from 'react';

function MessageBox({ message }: { message: any }) {
  return (
    <div>
      <h4>{message.user}</h4>
      <p>{message.text}</p>
    </div>
  );
}

export default function ChatStream() {
  const [messages, setMessages] = useState<any[]>([]);
  const bottomRef = useRef<any>(null);

  useEffect(() => {
    const stream = new EventSource('http://localhost:3001/chat-stream');

    stream.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      setMessages((prev: any[]) => {
        const last = prev[prev.length - 1];

        if (last && last.user === data.user) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...last,
            text: last.text + data.text,
          };
          return updated;
        } else {
          return [...prev, { user: data.user, text: data.text }];
        }
      });
    };

    return () => {
      stream.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {messages.map((message: any, index: number) => (
        <MessageBox key={index} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
