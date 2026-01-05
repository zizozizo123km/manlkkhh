import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fort and /free-solid-svg-icons';
import { faEllipsisH, faChevronLeft, faSearch, faBell } from '@fort and /free-solid-svg-icons';
import NotificationItem from '../components/Notifications/NotificationItem';
import BottomNavigationBar from '../components/Navigation/BottomNavigationBar';
import useAuth from '../hooks/useAuth';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: { id: 101, name: 'أحمد محمود', avatar: '/avatars/ahmad.jpg' },
    content: 'أعجب بمنشورك.',
    timestamp: '2h',
    isRead: false,
    image: '/post-images/post1.jpg',
  },
  {
    id: 2,
    type: 'comment',
    user: { id: 102, name: 'سارة علي', avatar: '/avatars/sara.jpg' },
    content: 'علق على منشورك: "ما شاء الله، جميل جداً!"',
    timestamp: '5h',
    isRead: false,
    image: null,
  },
  {
    id: 3,
    type: 'tag',
    user: { id: 103, name: 'خالد محمد', avatar: '/avatars/khalid.jpg' },
    content: 'أشار إليك في تعليق.',
    timestamp: '1d',
    isRead: true,
    image: null,
  },
  {
    id: 4,
    type: 'group_post',
    user: { id: 104, name: 'مجموعة المبرمجين', avatar: '/avatars/group.jpg' },
    content: 'نشر منشوراً جديداً في المجموعة التي تتابعها.',
    timestamp: '2d',
    isRead: true,
    image: '/post-images/group-post.jpg',
  },
  {
    id: 5,
    type: 'reaction',
    user: { id: 105, name: 'ريم سعيد', avatar: '/avatars/reem.jpg' },
    content: 'تفاعل مع صورتك بـ "أحببته".',
    timestamp: '3d',
    isRead: true,
    image: '/post-images/photo-reem.jpg',
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'unread'

  useEffect(() => {
    if (!isAuthenticated) {
      // Optional: Redirect to login or handle unauthenticated state
      // navigate('/login');
      // return; 
    }

    // Simulate fetching notifications
    setLoading(true);
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  }, [isAuthenticated]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const filteredNotifications = notifications.filter(notif => 
    activeTab === 'all' ? true : !notif.isRead
  );

  const handleNotificationClick = (notification) => {
    handleMarkAsRead(notification.id);
    // In a real app, this would navigate to the specific post/profile
    console.log('Navigating to content for notification:', notification.id);
    // Example navigation placeholder: navigate(`/post/${notification.targetId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الإشعارات</h1>
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => navigate('/search')}
              className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 transition duration-150 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="بحث"
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
          </div>
        </div>

        {/* Tabs for filtering */}
        <div className="flex space-x-4 rtl:space-x-reverse border-b dark:border-gray-700 mt-2">
          <button
            className={`py-2 px-4 transition duration-200 ${
              activeTab === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            الكل
          </button>
          <button
            className={`py-2 px-4 transition duration-200 ${
              activeTab === 'unread'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('unread')}
          >
            غير مقروء
          </button>
        </div>
      </header>

      <main className="p-0">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faBell} size="3x" className="mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg">لا توجد إشعارات جديدة {activeTab === 'unread' && 'غير مقروءة'}</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification)}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
              />
            ))}
          </ul>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigationBar activeTab="notifications" />
    </div>
  );
};

export default NotificationsPage;