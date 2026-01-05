import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubble,
  ChevronLeft,
  Search as SearchIcon,
  Cog,
  EllipsisV,
  Camera,
  ThumbsUp,
  Send,
  PlusCircle,
  Sticker,
  Image as ImageIcon,
  Mic
} from 'lucide-react';
import {
  motion,
  AnimatePresence
} from 'framer-motion';

// --- Dummy Data ---
const dummyUser = {
  id: 'u1',
  name: 'أحمد',
  avatar: '/avatars/ahmed.jpg',
  isOnline: true,
};

const dummyContact = {
  id: 'c1',
  name: 'فاطمة الزهراء',
  avatar: '/avatars/fatima.jpg',
  isOnline: true,
  lastSeen: 'قبل دقيقة',
};

const initialMessages = [
  {
    id: 'm1',
    senderId: 'c1',
    text: 'مرحباً! كيف حالك اليوم؟',
    timestamp: '10:00 ص',
    type: 'text',
  },
  {
    id: 'm2',
    senderId: 'u1',
    text: 'أهلاً بك، الحمد لله بخير. ماذا عنك؟',
    timestamp: '10:01 ص',
    type: 'text',
  },
  {
    id: 'm3',
    senderId: 'c1',
    text: 'أنا أيضاً بخير، شكراً لسؤالك. هل لديك خطط لعطلة نهاية الأسبوع؟',
    timestamp: '10:05 ص',
    type: 'text',
  },
  {
    id: 'm4',
    senderId: 'u1',
    text: 'أفكر في زيارة الأهل. 🤔',
    timestamp: '10:10 ص',
    type: 'text',
  },
  {
    id: 'm5',
    senderId: 'c1',
    text: 'يا له من قرار رائع! 😊',
    timestamp: '10:11 ص',
    type: 'sticker',
    stickerUrl: '/stickers/heart.png',
  },
];

// --- Components ---

/**
 * Message Bubble Component
 * @param {{message: Object, isCurrentUser: boolean}} props
 */
const MessageBubble = ({ message, isCurrentUser }) => {
  const baseClasses = 'max-w-[75%] px-3 py-2 rounded-xl text-sm break-words';
  const userClasses =
    'bg-blue-500 text-white rounded-br-none ml-auto';
  const contactClasses =
    'bg-gray-200 text-gray-800 rounded-bl-none mr-auto';

  const commonMotionProps = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
    transition: { type: 'spring', damping: 20, stiffness: 300 },
  };

  return (
    <motion.div
      {...commonMotionProps}
      layout
      className={`flex mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`${baseClasses} ${isCurrentUser ? userClasses : contactClasses}`}>
        {message.type === 'text' && <div>{message.text}</div>}
        {message.type === 'sticker' && (
          <img
            src={message.stickerUrl || '/stickers/default.png'}
            alt="Sticker"
            className="w-20 h-20 object-contain"
          />
        )}
        <div
          className={`text-[10px] mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'} text-left`}
        >
          {message.timestamp}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Chat Header Component
 * @param {{contact: Object, onBack: () => void}} props
 */
const ChatHeader = ({ contact, onBack }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-10 p-3 flex items-center justify-between h-14">
      {/* Left (Back/Contact Info) */}
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="العودة"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center mx-2">
          <div className="relative w-10 h-10">
            <img
              src={contact.avatar || '/avatars/default.jpg'}
              alt={contact.name}
              className="w-full h-full rounded-full object-cover"
            />
            {contact.isOnline && (
              <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="mr-3 text-right">
            <h1 className="font-bold text-sm truncate">{contact.name}</h1>
            <p className="text-xs text-gray-500">
              {contact.isOnline ? 'نشط الآن' : contact.lastSeen}
            </p>
          </div>
        </div>
      </div>

      {/* Right (Actions) */}
      <div className="flex items-center space-x-2">
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors">
          <Camera size={20} />
        </button>
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors">
          <Cog size={20} />
        </button>
      </div>
    </header>
  );
};

/**
 * Input Bar Component
 * @param {{onSend: (text: string) => void}} props
 */
const ChatInputBar = ({ onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex items-end shadow-lg z-10">
      <div className="flex items-center w-full">
        {/* Left Icons */}
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors">
          <PlusCircle size={24} />
        </button>
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors">
          <ImageIcon size={24} />
        </button>
        <button className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors hidden sm:block">
          <Mic size={24} />
        </button>

        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex-grow mx-2 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب رسالة..."
            className="w-full py-2 pl-4 pr-12 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow border border-transparent"
            style={{ paddingRight: '1rem' }}
          />
          <button
            type="button"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-500 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="ملصق"
            title="ملصق"
          >
            <Sticker size={20} />
          </button>
        </form>

        {/* Right Action (Send/Like) */}
        {inputText.length > 0 ? (
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="إرسال"
            title="إرسال"
          >
            <Send size={24} className="transform -rotate-45" />
          </button>
        ) : (
          <button
            onClick={() => onSend('👍')}
            className="p-2 text-blue-500 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="إعجاب"
            title="إعجاب سريع"
          >
            <ThumbsUp size={24} fill="currentColor" />
          </button>
        )}
      </div>
    </footer>
  );
};

// --- Main Page Component ---

/**
 * MessagesPage (Detailed Chat View)
 */
const MessagesPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [contact] = useState(dummyContact); // Assuming we are in a specific chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    (text) => {
      const newMessage = {
        id: `m${messages.length + 1}`,
        senderId: dummyUser.id,
        text: text,
        timestamp: new Date().toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        type: text === '👍' ? 'text' : 'text', // Simple implementation for thumbs up
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [messages.length]
  );

  const handleBack = () => {
    // Navigate back to the main chat list (or home, depending on context)
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden dir-rtl">
      <ChatHeader contact={contact} onBack={handleBack} />

      {/* Messages Area */}
      <main className="flex-grow pt-14 pb-20 overflow-y-auto px-4 dir-rtl">
        <div className="flex flex-col min-h-full justify-end">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === dummyUser.id}
              />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInputBar onSend={handleSendMessage} />
    </div>
  );
};

export default MessagesPage;