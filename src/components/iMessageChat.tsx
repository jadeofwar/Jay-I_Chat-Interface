import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
interface iMessageChatProps {
  webhookUrl: string;
}
export const IMessageChat = ({
  webhookUrl
}: iMessageChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('jay-i-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    } else {
      // Add initial welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hi there! 👋 I'm Jay-I, your family assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('jay-i-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatInput: userMessage.text,
          sessionId: 'jay-i-session'
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.output || data.response || 'I received your message, but I\'m having trouble responding right now.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Connection Error",
        description: "Unable to reach Jay-I. Please try again.",
        variant: "destructive"
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('jay-i-messages');
    const welcomeMessage: Message = {
      id: 'welcome-new',
      text: "Hi there! 👋 I'm Jay-I, your family assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };
  return <div className="imessage-container">
      {/* Header */}
      <div className="imessage-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Jay-I</h3>
            <p className="text-sm text-gray-500">Assistant</p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearChat} className="text-gray-500 hover:text-gray-700">
            Clear
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="imessage-body">
        <div className="messages-container">
          {messages.map(message => <div key={message.id} className={`message-wrapper ${message.isUser ? 'user-message' : 'assistant-message'}`}>
              <div className={`message-bubble ${message.isUser ? 'user-bubble' : 'assistant-bubble'}`}>
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </span>
              </div>
            </div>)}
          
          {isLoading && <div className="message-wrapper assistant-message">
              <div className="message-bubble assistant-bubble typing-indicator">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="ml-2 text-sm">Jay-I is typing...</span>
              </div>
            </div>}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="imessage-input">
        <div className="input-container">
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Message Jay-I..." className="message-input" disabled={isLoading} />
          <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} size="sm" className="send-button">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
};