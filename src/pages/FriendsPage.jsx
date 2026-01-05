import React, { useState } from 'react';
import { FiUsers, FiUserPlus, FiUserCheck, FiHome, FiSettings } from 'react-icons/fi';

// --- Mock Data ---
const mockRequests = [
  { id: 1, name: "ليلى أحمد", mutual: 12, time: "منذ ساعة", avatar: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=LA' },
  { id: 2, name: "خالد محمود", mutual: 5, time: "منذ 3 ساعات", avatar: 'https://via.placeholder.com/150/33C4FF/FFFFFF?text=KM' },
  { id: 3, name: "نورة علي", mutual: 30, time: "منذ يوم", avatar: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=NA' },
];

const mockSuggestions = [
  { id: 10, name: "عمران ياسين", mutual: 8, avatar: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=OY' },
  { id: 11, name: "فاطمة الزهراء", mutual: 2, avatar: 'https://via.placeholder.com/150/A133FF/FFFFFF?text=FZ' },
  { id: 12, name: "أحمد سامي", mutual: 15, avatar: 'https://via.placeholder.com/150/33FFFF/FFFFFF?text=AS' },
  { id: 13, name: "مريم خالد", mutual: 4, avatar: 'https://via.placeholder.com/150/FFB833/FFFFFF?text=MK' },
];

// --- Sub Components ---

const SidebarItem = ({ icon: Icon, title, isActive, onClick, count }) => (
  <button
    className={`flex items-center w-full p-3 rounded-lg text-right transition duration-200 ${
      isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-800'
    }`}
    onClick={onClick}
    dir="rtl"
  >
    <div className={`p-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="flex-grow mr-3 text-sm">{title}</span>
    {count > 0 && (
      <span className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-red-500'}`}>{count}</span>
    )}
  </button>
);

const FriendCard = ({ user, type }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  if (isRemoved) return null;

  const handleAction = (action) => {
    // In a real app, this would dispatch an action to an API
    if (action === 'confirm' || action === 'add') {
      console.log(`${action}ing ${user.name}`);
    }
    if (action === 'delete' || action === 'remove') {
      setIsRemoved(true);
      console.log(`Removing ${user.name}`);
    }
  };

  const isRequest = type === 'request';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative" dir="rtl">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-bold mb-1">{user.name}</h3>
        {user.mutual > 0 && (
          <p className="text-xs text-gray-500 mb-3">
            {user.mutual} من الأصدقاء المشتركين
          </p>
        )}

        {isRequest ? (
          <div className="space-y-2">
            <button
              onClick={() => handleAction('confirm')}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              تأكيد
            </button>
            <button
              onClick={() => handleAction('delete')}
              className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              حذف
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => handleAction('add')}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FiUserPlus className="ml-2" />
              إضافة صديق
            </button>
            <button
              onClick={() => handleAction('remove')}
              className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              إزالة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FriendsRequests = () => (
  <div dir="rtl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">طلبات الصداقة</h2>
      <button className="text-blue-500 hover:underline text-sm">عرض المؤرشفة</button>
    </div>
    <p className="text-gray-600 mb-4">{mockRequests.length} طلب جديد</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockRequests.map(user => (
        <FriendCard key={user.id} user={user} type="request" />
      ))}
    </div>
  </div>
);

const FriendsSuggestions = () => (
  <div dir="rtl">
    <h2 className="text-2xl font-bold mb-6">اقتراحات الأشخاص</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockSuggestions.map(user => (
        <FriendCard key={user.id} user={user} type="suggestion" />
      ))}
    </div>
  </div>
);

const FriendsAll = () => (
  <div dir="rtl">
    <h2 className="text-2xl font-bold mb-6">جميع الأصدقاء</h2>
    <div className="bg-white p-4 rounded-xl shadow-md">
      <input
        type="text"
        placeholder="ابحث عن صديقك"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4 text-right"
      />
      <p className="text-sm text-gray-600">
        (هذه ميزة بحث وهمية. لديك 542 صديقًا.)
      </p>
    </div>
  </div>
);

// --- Main Component ---

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('requests'); // requests, suggestions, all

  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return <FriendsRequests />;
      case 'suggestions':
        return <FriendsSuggestions />;
      case 'all':
        return <FriendsAll />;
      default:
        return <FriendsRequests />;
    }
  };

  const requestsCount = mockRequests.length;

  return (
    <div className="bg-gray-100 min-h-screen pt-4 lg:pt-0">
      <div className="flex max-w-7xl mx-auto">
        
        {/* Friends Sidebar (Hidden on small screens, fixed on large) */}
        <div 
          className="fixed inset-y-0 right-0 w-80 bg-white p-4 shadow-xl z-20 
                     lg:sticky lg:h-screen lg:shadow-none lg:border-r lg:p-6"
          dir="rtl"
        >
          <h1 className="text-3xl font-extrabold mb-6">الأصدقاء</h1>
          
          <div className="space-y-1">
            <SidebarItem
              icon={FiHome}
              title="الصفحة الرئيسية للأصدقاء"
              isActive={false}
              onClick={() => setActiveTab('home')} // Placeholder: typically links back to the main friends hub
            />
            <SidebarItem
              icon={FiUserPlus}
              title="طلبات الصداقة"
              isActive={activeTab === 'requests'}
              onClick={() => setActiveTab('requests')}
              count={requestsCount}
            />
            <SidebarItem
              icon={FiUsers}
              title="اقتراحات"
              isActive={activeTab === 'suggestions'}
              onClick={() => setActiveTab('suggestions')}
            />
            <div className="border-t border-gray-200 my-4"></div>
            <SidebarItem
              icon={FiUserCheck}
              title="جميع الأصدقاء"
              isActive={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            />
          </div>
        </div>
        
        {/* Main Content Area */}
        <main className="flex-grow p-4 lg:p-8 ml-0 lg:ml-80">
          {/* Mobile Header (Hidden on large screens) */}
          <div className="lg:hidden mb-4 p-3 bg-white shadow rounded-lg" dir="rtl">
            <h2 className="text-xl font-bold">الأصدقاء</h2>
            <div className="flex mt-3 space-x-2 space-x-reverse overflow-x-auto">
                <button
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('requests')}
                >
                    الطلبات {requestsCount > 0 && `(${requestsCount})`}
                </button>
                <button
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'suggestions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('suggestions')}
                >
                    اقتراحات
                </button>
                <button
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('all')}
                >
                    جميع الأصدقاء
                </button>
            </div>
          </div>


          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FriendsPage;