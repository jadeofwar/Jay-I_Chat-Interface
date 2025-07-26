import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn(
      "flex gap-3 p-4 animate-message-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className={cn(
        "w-8 h-8 border-2",
        isUser 
          ? "border-chat-user-bg bg-chat-user-bg" 
          : "border-chat-assistant-bg bg-chat-assistant-bg"
      )}>
        <AvatarFallback className={cn(
          "text-xs",
          isUser 
            ? "text-chat-user-fg bg-chat-user-bg" 
            : "text-chat-assistant-fg bg-chat-assistant-bg"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col max-w-[80%] space-y-1",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2 shadow-md",
          isUser 
            ? "bg-chat-user-bg text-chat-user-fg rounded-br-sm" 
            : "bg-chat-assistant-bg text-chat-assistant-fg rounded-bl-sm border border-border/30"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-muted-foreground px-2">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};