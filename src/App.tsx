import { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import QuickActions from './components/QuickActions';
import ChatInput from './components/ChatInput';
import { supabase, Message, QuickAction } from './lib/supabase';

const EVA_AVATAR = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200';

const WELCOME_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hey! I'm Eva, your AI shopping assistant. How can I help you today?",
    is_user: false,
    timestamp: new Date().toISOString(),
    read: true,
    created_at: new Date().toISOString(),
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    loadQuickActions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      setMessages(WELCOME_MESSAGES);
      return;
    }

    if (data && data.length > 0) {
      setMessages(data);
    } else {
      setMessages(WELCOME_MESSAGES);
    }
  };

  const loadQuickActions = async () => {
    const { data, error } = await supabase
      .from('quick_actions')
      .select('*')
      .eq('active', true)
      .order('order');

    if (error) {
      console.error('Error loading quick actions:', error);
      return;
    }

    if (data) {
      setQuickActions(data);
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      is_user: true,
      timestamp: new Date().toISOString(),
      read: true,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const { error } = await supabase.from('messages').insert({
      content: userMessage.content,
      is_user: userMessage.is_user,
      timestamp: userMessage.timestamp,
      read: userMessage.read,
    });

    if (error) {
      console.error('Error saving message:', error);
    }

    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = generateBotResponse(content);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: botResponse,
        is_user: false,
        timestamp: new Date().toISOString(),
        read: false,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      await supabase.from('messages').insert({
        content: botMessage.content,
        is_user: botMessage.is_user,
        timestamp: botMessage.timestamp,
        read: botMessage.read,
      });
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.label);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('product') || lowerMessage.includes('browse')) {
      return "I'd love to show you our latest collection! We have amazing new arrivals in fashion, electronics, and home decor. Which category interests you most?";
    }

    if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
      return "I can help you track your order! Please share your order number, and I'll get you the latest updates right away.";
    }

    if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "I'm here to help! Whether it's about returns, sizing, shipping, or anything else - just let me know what you need assistance with.";
    }

    if (lowerMessage.includes('offer') || lowerMessage.includes('deal') || lowerMessage.includes('discount')) {
      return "Great timing! We have exclusive offers running now - 20% off on selected items, free shipping on orders over $50, and special bundle deals. Want to see them?";
    }

    return "Thanks for reaching out! I'm here to help you with shopping, orders, and any questions you have. What would you like to know more about?";
  };

  const shouldShowAvatar = (index: number): boolean => {
    if (index === 0) return true;
    if (messages[index].is_user !== messages[index - 1].is_user) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <ChatHeader
          avatarUrl={EVA_AVATAR}
          name="Eva"
          status="Active now"
          isOnline={true}
        />

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              avatarUrl={EVA_AVATAR}
              showAvatar={shouldShowAvatar(index)}
            />
          ))}

          {isTyping && <TypingIndicator avatarUrl={EVA_AVATAR} />}

          <div ref={messagesEndRef} />
        </div>

        {quickActions.length > 0 && (
          <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
        )}

        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}

export default App;
