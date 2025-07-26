import { useEffect } from "react";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const Index = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.devore.consulting/webhook/9b5fb1c6-4c13-431f-be3f-6ad3b36d94e8/chat',
      mode: 'window',
      target: '#chat-container',
      initialMessages: [
        'Hi there! 👋',
        'I\'m your RAG assistant. How can I help you today?'
      ],
      showWelcomeScreen: false,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6">
              Pi RAG Assistant
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Intelligent conversations powered by your Raspberry Pi. 
              <span className="text-primary font-medium"> Ask anything, get instant answers.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-card/40 backdrop-blur-xl rounded-3xl border border-border/20 shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 p-8 border-b border-border/20">
            <h2 className="text-3xl font-bold text-center mb-2">Start a Conversation</h2>
            <p className="text-muted-foreground text-center">
              Your intelligent assistant is ready to help with any questions
            </p>
          </div>
          
          <div className="p-8">
            <div 
              id="chat-container" 
              className="mx-auto max-w-4xl"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in hover-scale">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Powered by your Raspberry Pi for instant responses</p>
          </div>
          
          <div className="text-center animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
            <p className="text-muted-foreground">Your conversations stay on your own hardware</p>
          </div>
          
          <div className="text-center animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent RAG</h3>
            <p className="text-muted-foreground">Retrieval-augmented generation for accurate answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
