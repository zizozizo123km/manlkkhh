import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have an App.css for styling

// --- Components ---

// Header Component
const Header = () => (
  <header className="facebook-header">
    <div className="header-left">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" 
        alt="Facebook Logo" 
        className="facebook-logo" 
      />
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="بحث في فيسبوك" />
      </div>
    </div>
    
    <div className="header-center">
      <div className="nav-icon active"><i className="fas fa-home"></i></div>
      <div className="nav-icon"><i className="fas fa-user-friends"></i></div>
      <div className="nav-icon"><i className="fas fa-video"></i></div>
      <div className="nav-icon"><i className="fas fa-store"></i></div>
      <div className="nav-icon"><i className="fas fa-users"></i></div>
    </div>

    <div className="header-right">
      <div className="profile-icon">
        <img src="https://via.placeholder.com/30" alt="Profile" />
        <span>أنا</span>
      </div>
      <div className="icon-button"><i className="fas fa-th"></i></div>
      <div className="icon-button"><i className="fab fa-facebook-messenger"></i></div>
      <div className="icon-button"><i className="fas fa-bell"></i></div>
      <div className="icon-button"><i className="fas fa-caret-down"></i></div>
    </div>
  </header>
);

// Sidebar Navigation Item Component
const SidebarItem = ({ icon, text, isMain = false }) => (
  <div className={`sidebar-item ${isMain ? 'main-item' : ''}`}>
    <i className={`fas ${icon}`}></i>
    <span>{text}</span>
  </div>
);

// Left Sidebar Component
const LeftSidebar = () => (
  <div className="left-sidebar">
    <SidebarItem icon="fa-user" text="أنا" isMain={true} />
    <SidebarItem icon="fa-user-friends" text="الأصدقاء" />
    <SidebarItem icon="fa-users" text="المجموعات" />
    <SidebarItem icon="fa-store" text="المتجر" />
    <SidebarItem icon="fa-video" text="مشاهدة" />
    <SidebarItem icon="fa-clock" text="الذكريات" />
    <SidebarItem icon="fa-bookmark" text="المحفوظات" />
    <hr />
    <h4>اختصاراتك</h4>
    <SidebarItem icon="fa-hashtag" text="React Devs" />
    <SidebarItem icon="fa-gamepad" text="ألعاب الفيديو" />
  </div>
);

// Right Sidebar Component (Contacts/Sponsors)
const RightSidebar = ({ contacts }) => (
  <div className="right-sidebar">
    <h4>الجهات الراعية</h4>
    <div className="sponsor-ad">
        <img src="https://via.placeholder.com/150x80" alt="Ad" />
        <p>إعلان: منتج جديد متاح الآن!</p>
    </div>
    <hr />
    <h4>جهات الاتصال</h4>
    {contacts.map((contact) => (
      <div key={contact.id} className="contact-item">
        <img src={contact.avatar} alt={contact.name} />
        <span>{contact.name}</span>
        <div className={`status-dot ${contact.isOnline ? 'online' : 'offline'}`}></div>
      </div>
    ))}
  </div>
);

// Story Card Component
const StoryCard = ({ user, imageUrl }) => (
    <div className="story-card" style={{ backgroundImage: `url(${imageUrl})` }}>
        <img src={user.avatar} alt={user.name} className="story-avatar" />
        <span>{user.name}</span>
    </div>
);

// Story Section Component
const StorySection = ({ stories }) => (
    <div className="story-section">
        <div className="story-card create-story">
            <i className="fas fa-plus"></i>
            <span>إنشاء قصة</span>
        </div>
        {stories.map((story, index) => (
            <StoryCard key={index} user={story.user} imageUrl={story.imageUrl} />
        ))}
    </div>
);

// Create Post Component
const CreatePost = ({ user }) => (
    <div className="create-post">
        <div className="post-input-section">
            <img src={user.avatar} alt={user.name} className="post-avatar" />
            <input type="text" placeholder={`بماذا تفكر يا ${user.name.split(' ')[0]}؟`} />
        </div>
        <hr />
        <div className="post-options">
            <div className="option-item video"><i className="fas fa-video"></i> <span>فيديو مباشر</span></div>
            <div className="option-item photo"><i className="fas fa-image"></i> <span>صورة/فيديو</span></div>
            <div className="option-item feeling"><i className="fas fa-smile"></i> <span>الشعور/النشاط</span></div>
        </div>
    </div>
);

// Post Component
const Post = ({ post }) => (
    <div className="post-card">
        <div className="post-header">
            <img src={post.user.avatar} alt={post.user.name} />
            <div className="post-info">
                <h4>{post.user.name}</h4>
                <p>{post.time} <i className="fas fa-globe"></i></p>
            </div>
            <i className="fas fa-ellipsis-h post-menu"></i>
        </div>

        <div className="post-content">
            <p>{post.text}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post Content" />}
        </div>

        <div className="post-stats">
            <div className="reactions">
                <i className="fas fa-thumbs-up like-icon"></i>
                <span>{post.likes}</span>
            </div>
            <div className="comments-shares">
                <span>{post.comments} تعليقات</span>
                <span>{post.shares} مشاركات</span>
            </div>
        </div>
        
        <hr />

        <div className="post-actions">
            <div className="action-button"><i className="far fa-thumbs-up"></i> <span>إعجاب</span></div>
            <div className="action-button"><i className="far fa-comment-alt"></i> <span>تعليق</span></div>
            <div className="action-button"><i className="fas fa-share"></i> <span>مشاركة</span></div>
        </div>
    </div>
);

// Main Feed Component
const MainFeed = ({ stories, posts, currentUser }) => (
  <div className="main-feed">
    <StorySection stories={stories} />
    <CreatePost user={currentUser} />
    {posts.map((post, index) => (
        <Post key={index} post={post} />
    ))}
  </div>
);

// --- Data Mockup ---

const mockCurrentUser = {
    id: 1,
    name: "أحمد محمد",
    avatar: "https://via.placeholder.com/40"
};

const mockStories = [
    { user: { name: "فاطمة", avatar: "https://via.placeholder.com/50/FF5733" }, imageUrl: "https://via.placeholder.com/150/FF5733" },
    { user: { name: "خالد", avatar: "https://via.placeholder.com/50/33FF57" }, imageUrl: "https://via.placeholder.com/150/33FF57" },
    { user: { name: "نورا", avatar: "https://via.placeholder.com/50/3357FF" }, imageUrl: "https://via.placeholder.com/150/3357FF" },
    { user: { name: "يوسف", avatar: "https://via.placeholder.com/50/FF33A1" }, imageUrl: "https://via.placeholder.com/150/FF33A1" },
];

const mockPosts = [
    {
        user: { name: "شركة تطوير الويب", avatar: "https://via.placeholder.com/40/0000FF" },
        time: "ساعة واحدة مضت",
        text: "نحن نبحث عن مطور React محترف للانضمام إلى فريقنا! هل أنت مهتم؟ #React #وظائف",
        imageUrl: "https://via.placeholder.com/600x300?text=React+Development",
        likes: 154,
        comments: 20,
        shares: 5
    },
    {
        user: { name: "ليلى علي", avatar: "https://via.placeholder.com/40/FFA500" },
        time: "3 ساعات مضت",
        text: "يوم جميل في الطبيعة! لا شيء يضاهي الهواء النقي.",
        imageUrl: "https://via.placeholder.com/600x400?text=Nature",
        likes: 89,
        comments: 15,
        shares: 2
    },
];

const mockContacts = [
    { id: 2, name: "سارة محمود", avatar: "https://via.placeholder.com/30/FFC0CB", isOnline: true },
    { id: 3, name: "علي حسن", avatar: "https://via.placeholder.com/30/ADD8E6", isOnline: false },
    { id: 4, name: "مريم فهد", avatar: "https://via.placeholder.com/30/90EE90", isOnline: true },
    { id: 5, name: "إبراهيم ناصر", avatar: "https://via.placeholder.com/30/DDA0DD", isOnline: true },
];

// --- Main App Component ---

function App() {
  // Set document direction to RTL for Facebook Arabic layout
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <LeftSidebar />
        <MainFeed 
            stories={mockStories} 
            posts={mockPosts} 
            currentUser={mockCurrentUser} 
        />
        <RightSidebar contacts={mockContacts} />
      </div>
    </div>
  );
}

export default App;