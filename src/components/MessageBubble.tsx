import { Message } from '../lib/supabase';

interface MessageBubbleProps {
  message: Message;
  avatarUrl?: string;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, avatarUrl, showAvatar = true }: MessageBubbleProps) {
  const isUser = message.is_user;

  return (
    <div className={`flex gap-2 mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && showAvatar && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 p-0.5">
            <img
              src={avatarUrl}
              alt="Eva"
              className="w-full h-full rounded-full border border-white object-cover"
            />
          </div>
        </div>
      )}

      {!isUser && !showAvatar && <div className="w-8"></div>}

      <div
        className={`
          max-w-[75%] px-4 py-2.5 rounded-3xl animate-slideIn
          ${isUser
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }
        `}
      >
        <p className="text-[15px] leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
