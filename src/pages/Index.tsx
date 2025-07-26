import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [n8nEndpoint, setN8nEndpoint] = useState<string>("");

  return <ChatInterface n8nEndpoint={n8nEndpoint} />;
};

export default Index;
