import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { SendIcon, SearchIcon, PaperclipIcon, SmileIcon, UserIcon } from 'lucide-react';
type Message = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;

  read: boolean;
};
type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  lastMessageTime: Date;

  unreadCount: number;
};
export const MessagesPage: React.FC = () => {
  const {
    user
  } = useAuth();
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Mock conversations data
  const conversations: Conversation[] = [{
    id: '1',
    participantId: '3',
    participantName: 'Sarah Johnson',
    lastMessage: 'Thanks for your proposal! I have a few questions about your approach.',
    lastMessageTime: new Date(2023, 9, 25, 14, 30),
    unreadCount: 2
  }, {
    id: '2',
    participantId: '4',
    participantName: 'Michael Brown',
    lastMessage: "I'll send you the design files this afternoon.",
    lastMessageTime: new Date(2023, 9, 24, 9, 15),
    unreadCount: 0
  }, {
    id: '3',
    participantId: '5',
    participantName: 'Emily Davis',
    lastMessage: 'The deadline has been extended to next Friday.',
    lastMessageTime: new Date(2023, 9, 23, 16, 45),
    unreadCount: 0
  }];
  // Mock messages for the active conversation
  const messages: Record<string, Message[]> = {
    '1': [{
      id: '1-1',
      senderId: '3',
      senderName: 'Sarah Johnson',
      content: 'Hi there! I saw your application for the landing page project.',
      timestamp: new Date(2023, 9, 25, 10, 0),
      read: true
    }, {
      id: '1-2',
      senderId: 'user?.id ||',
      senderName: 'user?.name ||',
      content: "Hello Sarah! Yes, I'm very interested in the project. I have experience with similar landing pages.",
      timestamp: new Date(2023, 9, 25, 10, 5),
      read: true
    }, {
      id: '1-3',
      senderId: '3',
      senderName: 'Sarah Johnson',
      content: 'Great! I liked your portfolio. Can you tell me more about your process and timeline?',
      timestamp: new Date(2023, 9, 25, 10, 15),
      read: true
    }, {
      id: '1-4',
      senderId: user?.id || '',
      senderName: user?.name || '',
      content: 'Of course! I typically start with a discovery phase to understand your brand and goals. Then I create wireframes, followed by design mockups, and finally the development. For a landing page, I can complete the project in about 2 weeks.',
      timestamp: new Date(2023, 9, 25, 10, 20),
      read: true
    }, {
      id: '1-5',
      senderId: '3',
      senderName: 'Sarah Johnson',
      content: 'Thanks for your proposal! I have a few questions about your approach.',
      timestamp: new Date(2023, 9, 25, 14, 30),
      read: false
    }, {
      id: '1-6',
      senderId: '3',
      senderName: 'Sarah Johnson',
      content: 'Would it be possible to have a quick call to discuss the details?',
      timestamp: new Date(2023, 9, 25, 14, 32),
      read: false
    }],
    '2': [{
      id: '2-1',
      senderId: '4',
      senderName: 'Michael Brown',
      content: 'Hello! I ve reviewed your application',
      timestamp: new Date(2023, 9, 24, 9, 0),
      read: true
    }, {
      id: '2-2',
      senderId: 'user?.id ||',
      senderName: 'user?.name ||',
      content: 'Hi Michael! Thanks for getting back to me. I m excited about the opportunity',
      timestamp: new Date(2023, 9, 24, 9, 10),
      read: true
    }, {
      id: '2-3',
      senderId: '4',
      senderName: 'Michael Brown',
      content: 'I ll send you the design files this: afternoon',
      timestamp: new Date(2023, 9, 24, 9, 15),
      read: true
    }],
    '3': [{
      id: '3-1',
      senderId: '5',
      senderName: 'Emily Davis',
      content: 'Hi! I m reaching about the web development project',
      timestamp: new Date(2023, 9, 23, 16, 30),
      read: true
    }, {
      id: '3-2',
      senderId: 'user?.id ||',
      senderName: 'user?.name ||',
      content: 'Hello Emily! I d be happy to discuss the project with: you',
      timestamp: new Date(2023, 9, 23, 16, 40),
      read: true
    }, {
      id: '3-3',
      senderId: '5',
      senderName: 'Emily Davis',
      content: 'The deadline has been extended to next Friday.',
      timestamp: new Date(2023, 9, 23, 16, 45),
      read: true
    }]
  };
  const filteredConversations = conversations.filter(conv => conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()));
  const activeMessages = activeConversation ? messages[activeConversation] : [];
  const activeParticipant = activeConversation ? conversations.find(c => c.id === activeConversation)?.participantName : null;
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) {
      // In a real app, this would send the message to the backend
      // Here we're just simulating the send action
      setMessageInput('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          Messages
        </motion.h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[calc(80vh-6rem)]">
            {/* Conversation List */}
            <motion.div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <input type="text" placeholder="Search conversations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto flex-grow">
                {filteredConversations.length > 0 ? filteredConversations.map(conversation => <motion.div key={conversation.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${activeConversation === conversation.id ? 'bg-primary-50 dark:bg-primary-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-750'}`} onClick={() => setActiveConversation(conversation.id)} whileHover={{
                backgroundColor: '#F9FAFB'
              }}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
                            {conversation.participantName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className={`text-sm font-medium ${conversation.unreadCount > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {conversation.participantName}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(conversation.lastMessageTime) === 'Today' ? formatTime(conversation.lastMessageTime) : formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className={`text-sm line-clamp-1 ${conversation.unreadCount > 0 ? 'text-gray-900 font-medium dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-xs font-medium text-white mt-1">
                              {conversation.unreadCount}
                            </span>}
                        </div>
                      </div>
                    </motion.div>) : <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No conversations found
                  </div>}
              </div>
            </motion.div>
            {/* Messages */}
            <motion.div className="hidden md:flex flex-col w-2/3" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              {activeConversation ? <>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
                      {activeParticipant?.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {activeParticipant}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {activeMessages.map(message => {
                  const isOwnMessage = message.senderId === user?.id;
                  return <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                          <motion.div className={`max-w-[70%] rounded-lg px-4 py-2 ${isOwnMessage ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`} initial={{
                      opacity: 0,
                      y: 10
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      duration: 0.3
                    }}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </motion.div>
                        </div>;
                })}
                  </div>
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-end">
                      <div className="flex-grow">
                        <textarea value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyDown={handleKeyDown} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-none transition-colors duration-200" placeholder="Type a message..." rows={3} />
                      </div>
                      <div className="ml-3 flex space-x-2">
                        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                          <PaperclipIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                          <SmileIcon className="h-5 w-5" />
                        </button>
                        <motion.button onClick={handleSendMessage} disabled={!messageInput.trim()} className={`p-2 rounded-full ${messageInput.trim() ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'} focus:outline-none transition-colors duration-200`} whileHover={{
                      scale: messageInput.trim() ? 1.05 : 1
                    }} whileTap={{
                      scale: messageInput.trim() ? 0.95 : 1
                    }}>
                          <SendIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </> : <div className="flex-grow flex items-center justify-center">
                  <div className="text-center">
                    <UserIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      No conversation selected
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </div>}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};