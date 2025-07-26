import { useEffect } from "react";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Index = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.devore.consulting/webhook/9b5fb1c6-4c13-431f-be3f-6ad3b36d94e8/chat',
      mode: 'fullscreen',
      initialMessages: [
        'Hi there! 👋',
        'I\'m your RAG assistant. How can I help you today?'
      ],
      showWelcomeScreen: false,
    });
  }, []);

  return <div id="n8n-chat" style={{ width: '100%', height: '100vh' }} />;
};

export default Index;
