import React from 'react';
import {
  Home as HomeIcon,
  Users,
  MessageSquare,
  Bell,
  Search,
  Settings,
  Grid,
  ChevronDown,
} from 'lucide-react';

// --- Placeholder Components ---

const Header = () => (
  <header className="sticky top-0 z-50 flex items-center justify-between p-2 bg-white shadow-md">
    {/* Left Section: Logo and Search */}
    <div className="flex items-center space-x-2">
      <div className="text-3xl font-bold text-blue-600">f</div> {/* Placeholder Logo */}
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="ابحث في فيسبوك"
          className="p-2 pl-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          dir="rtl"
        />
        <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
      </div>
    </div>

    {/* Center Section: Navigation Icons */}
    <nav className="flex items-center space-x-1 sm:space-x-8">
      <NavItem icon={HomeIcon} isActive />
      <NavItem icon={Users} />
      <NavItem icon={MessageSquare} />
      <NavItem icon={Bell} />
    </nav>

    {/* Right Section: User Menu and Quick Actions */}
    <div className="flex items-center space-x-3">
      <div className="hidden w-10 h-10 p-2 text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 lg:flex items-center justify-center">
        <Grid className="w-6 h-6" />
      </div>
      <div className="w-10 h-10 p-2 text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
        <Settings className="w-6 h-6" />
      </div>
      <div className="w-10 h-10 overflow-hidden rounded-full cursor-pointer">
        {/* Placeholder User Avatar */}
        <img src="https://via.placeholder.com/40" alt="User Avatar" className="object-cover w-full h-full" />
      </div>
    </div>
  </header>
);

const NavItem = ({ icon: Icon, isActive = false }) => (
  <div
    className={`p-3 transition duration-150 rounded-lg cursor-pointer ${
      isActive
        ? 'text-blue-600 border-b-4 border-blue-600'
        : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-6 h-6 mx-auto" />
  </div>
);

const SidebarLink = ({ icon: Icon, label }) => (
  <div className="flex items-center p-2 space-x-3 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150">
    <Icon className="w-6 h-6 text-blue-600" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const LeftSidebar = () => (
  <aside className="fixed left-0 z-10 hidden w-64 h-full p-4 overflow-y-auto bg-white lg:block">
    <div className="space-y-1" dir="rtl">
      {/* User Profile */}
      <div className="flex items-center p-2 space-x-3 rounded-lg cursor-pointer hover:bg-gray-100 mb-4">
        <img src="https://via.placeholder.com/40" alt="User" className="w-9 h-9 rounded-full object-cover" />
        <span className="text-sm font-semibold">اسم المستخدم</span>
      </div>
      
      <SidebarLink icon={HomeIcon} label="الخلاصات (Feed)" />
      <SidebarLink icon={Users} label="الأصدقاء" />
      <SidebarLink icon={MessageSquare} label="المجموعات" />
      <SidebarLink icon={Bell} label="المشاهدة (Watch)" />
      <SidebarLink icon={Grid} label="سوق" />

      <div className="pt-2 border-t border-gray-200 mt-2">
        <h3 className="p-2 text-xs font-semibold text-gray-500 uppercase">اختصاراتك</h3>
        {/* Placeholder Shortcuts */}
        <SidebarLink icon={ChevronDown} label="مشاهدة المزيد" />
      </div>
    </div>
  </aside>
);

const StoryCard = () => (
    <div className="relative flex-shrink-0 w-24 h-40 overflow-hidden bg-gray-300 rounded-xl cursor-pointer shadow-md hover:scale-[1.03] transition duration-200">
        <img 
            src={`https://picsum.photos/seed/${Math.random()}/150/250`} 
            alt="Story" 
            className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center">
            <Users className='w-4 h-4 text-blue-600' />
        </div>
        <p className="absolute bottom-2 right-2 text-xs font-semibold text-white text-shadow-md">اسم المستخدم</p>
    </div>
);

const StatusBox = () => (
    <div className="p-4 bg-white rounded-lg shadow-md mb-5" dir="rtl">
        <div className="flex items-center pb-3 border-b border-gray-200">
            <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full object-cover mr-3" />
            <input 
                type="text" 
                placeholder="ماذا يجول في خاطرك يا [اسم المستخدم]؟" 
                className="flex-grow p-2 bg-gray-100 rounded-full focus:outline-none placeholder-gray-500" 
            />
        </div>
        <div className="flex justify-around pt-3">
            <ActionItem icon={Users} label="بث مباشر" color="text-red-500" />
            <ActionItem icon={Grid} label="صورة/فيديو" color="text-green-500" />
            <ActionItem icon={Bell} label="شعور/نشاط" color="text-yellow-500" />
        </div>
    </div>
);

const ActionItem = ({ icon: Icon, label, color }) => (
    <div className="flex items-center p-2 space-x-2 cursor-pointer rounded-lg hover:bg-gray-100">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
);

const Post = ({ postId }) => (
    <div className="bg-white rounded-lg shadow-md mb-5" dir="rtl">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
                <img src={`https://via.placeholder.com/40?text=P${postId}`} alt="Post User" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p className="text-sm font-semibold">اسم المستخدم الناشر {postId}</p>
                    <p className="text-xs text-gray-500">منذ 3 ساعات · <span className="text-blue-500">عام</span></p>
                </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>

        {/* Post Content */}
        <div className="px-4 pb-2 text-base text-gray-800">
            هذا هو محتوى منشور تجريبي على تطبيق فيسبوك. نستخدم اللغة العربية لإعطاء تجربة واقعية. #تطبيق_فيسبوك #تجربة
        </div>
        <img 
            src={`https://picsum.photos/seed/${postId + 100}/600/400`} 
            alt="Post Image" 
            className="object-cover w-full max-h-96" 
        />

        {/* Post Actions (Likes/Comments Count) */}
        <div className="flex items-center justify-between p-3 text-sm text-gray-500 border-b border-gray-100">
            <span>❤️ 1.2K</span>
            <span>250 تعليق · 50 مشاركة</span>
        </div>

        {/* Interaction Buttons */}
        <div className="flex justify-around p-1">
            <InteractionButton icon={Users} label="أعجبني" />
            <InteractionButton icon={MessageSquare} label="تعليق" />
            <InteractionButton icon={Bell} label="مشاركة" />
        </div>
    </div>
);

const InteractionButton = ({ icon: Icon, label }) => (
    <div className="flex items-center justify-center flex-1 p-2 space-x-1 font-semibold text-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-100">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </div>
);

const RightSidebar = () => (
    <aside className="fixed right-0 z-10 hidden w-64 h-full p-4 overflow-y-auto bg-white xl:block">
        <div className="space-y-4" dir="rtl">
            {/* Contacts/Sponsored Section */}
            <h3 className="text-sm font-semibold text-gray-500 uppercase">جهات الاتصال</h3>
            <ContactItem name="صديق 1" status="online" />
            <ContactItem name="صديق 2" status="offline" />
            <ContactItem name="صديق 3" status="online" />
            
            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">إعلانات</h3>
                <AdCard />
            </div>
        </div>
    </aside>
);

const ContactItem = ({ name, status }) => (
    <div className="flex items-center p-2 space-x-3 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-150">
        <div className="relative">
            <img src={`https://via.placeholder.com/32?text=${name.charAt(0)}`} alt={name} className="w-8 h-8 rounded-full object-cover" />
            <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
        <span className="text-sm">{name}</span>
    </div>
);

const AdCard = () => (
    <div className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 className="text-sm font-bold mb-1">إعلان ممول</h4>
        <p className="text-xs text-gray-600">تعلم البرمجة الآن واشترك في دورتنا الحصرية!</p>
        <img src="https://via.placeholder.com/250x100?text=Ad+Banner" alt="Advertisement" className="mt-2 rounded" />
    </div>
);


// --- Main Component ---

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex justify-center pt-4">
        {/* Left Sidebar (Desktop only) */}
        <LeftSidebar />

        {/* Main Content / Feed */}
        <main className="w-full max-w-3xl px-4 md:px-0 lg:ml-64 xl:mr-64">
          
          {/* Stories Section */}
          <div className="flex gap-3 pb-6 overflow-x-auto snap-x scrollbar-hide">
            {[...Array(8)].map((_, i) => (
                <StoryCard key={i} />
            ))}
          </div>

          {/* Status Update Box */}
          <StatusBox />

          {/* Feed Posts */}
          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((id) => (
                <Post key={id} postId={id} />
            ))}
          </div>

          {/* Loading Indicator Placeholder */}
          <div className="py-10 text-center text-gray-500">
            جاري تحميل المزيد من المنشورات...
          </div>
        </main>

        {/* Right Sidebar (Desktop XL only) */}
        <RightSidebar />
      </div>
      
    </div>
  );
};

export default HomePage;