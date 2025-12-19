export default function TypingIndicator({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="flex gap-2 mb-2 justify-start animate-fadeIn">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 p-0.5">
          <img
            src={avatarUrl}
            alt="Eva"
            className="w-full h-full rounded-full border border-white object-cover"
          />
        </div>
      </div>

      <div className="bg-gray-100 px-5 py-3 rounded-3xl rounded-bl-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
