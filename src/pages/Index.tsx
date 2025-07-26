import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { ChatInterface } from "@/components/ChatInterface";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [n8nEndpoint, setN8nEndpoint] = useState<string>("");
  const { toast } = useToast();

  // Simple auth - you can customize these credentials
  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "your-secure-password";

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simple username/password check
    if (credentials.username === VALID_USERNAME && credentials.password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Authentication successful",
        description: "Welcome to your RAG chat interface!",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <ChatInterface onLogout={handleLogout} n8nEndpoint={n8nEndpoint} />;
};

export default Index;
