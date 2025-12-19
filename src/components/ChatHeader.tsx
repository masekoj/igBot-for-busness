import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';

interface ChatHeaderProps {
  avatarUrl: string;
  name: string;
  status: string;
  isOnline: boolean;
}

export default function ChatHeader({ avatarUrl, name, status, isOnline }: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 backdrop-blur-lg bg-opacity-95">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 p-0.5">
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full rounded-full border-2 border-white object-cover"
              />
            </div>
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-gray-900 truncate">{name}</h1>
              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white rounded-full font-medium">
                Instagram
              </span>
            </div>
            <p className="text-sm text-gray-500">{status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
