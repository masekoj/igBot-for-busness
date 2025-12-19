import { useState } from 'react';
import { Camera, Image, Mic, Plus, Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 backdrop-blur-lg bg-opacity-95">
      <div className="px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors flex-shrink-0"
            >
              <Camera className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors flex-shrink-0"
            >
              <Image className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors flex-shrink-0"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div
            className={`
              flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all
              ${isFocused
                ? 'border-purple-300 bg-purple-50/50'
                : 'border-gray-200 bg-gray-50'
              }
            `}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Message..."
              disabled={disabled}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {message.trim() ? (
            <button
              type="submit"
              disabled={disabled}
              className="p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className="p-2.5 text-purple-600 hover:bg-purple-50 rounded-full transition-colors flex-shrink-0"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
