import { IMessageChat } from "@/components/iMessageChat";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with Family Photo */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/lovable-uploads/f1d36c17-a3c4-4ddf-ba22-3ccd647b25b4.png')`
        }}
      >
        {/* Title */}
        <div className="text-center z-10 mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white drop-shadow-2xl mb-4 tracking-tight">
            Jay-I
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 drop-shadow-lg font-light">
            Your Family Assistant
          </p>
        </div>

        {/* iMessage-style Chat Container */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <IMessageChat webhookUrl="https://n8n.devore.consulting/webhook/9b5fb1c6-4c13-431f-be3f-6ad3b36d94e8/chat" />
        </div>
      </div>
    </div>
  );
};

export default Index;
