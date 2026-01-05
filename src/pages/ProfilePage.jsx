import React from 'react';
import { FaEdit, FaPlus, FaCamera, FaSearch } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineWork, MdLocationOn, MdSchool, MdCake } from 'react-icons/md';

const dummyUser = {
  id: 1,
  name: 'John Doe',
  bio: 'React Developer | Always learning | Coffee enthusiast.',
  coverPhoto: 'https://images.unsplash.com/photo-1517486801908-10bf8b6b2707?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a8169c1ce81?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  friendsCount: 524,
  details: [
    { icon: MdOutlineWork, text: 'Works at Facebook' },
    { icon: MdSchool, text: 'Studied Computer Science at Stanford' },
    { icon: MdLocationOn, text: 'Lives in San Francisco, CA' },
    { icon: MdCake, text: 'Born on January 1, 1990' },
  ],
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a8169c1ce81?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542903660-eed4c2c54848?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1518779745580-c1b752943e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1492569542031-69670f9076b3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBhMDd9fDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  posts: [
    { id: 1, text: "Just finished building the profile page! Feeling productive today.", likes: 15, comments: 3 },
    { id: 2, text: "What's the best approach for state management in large React apps? MobX or Redux Toolkit?", likes: 45, comments: 12 },
  ]
};

// Mock Component for Post Creation
const PostCreator = () => (
  <div className="bg-white p-4 rounded-lg shadow mb-4">
    <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={dummyUser.profilePicture}
        alt="Profile"
      />
      <input
        type="text"
        placeholder={`What's on your mind, ${dummyUser.name.split(' ')[0]}?`}
        className="flex-grow bg-gray-100 p-2 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex justify-around pt-3 text-sm font-semibold text-gray-600">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <FaCamera className="text-red-500" />
        <span>Live Video</span>
      </button>
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <MdPhoto className="text-green-500" />
        <span>Photo/Video</span>
      </button>
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <FaEdit className="text-yellow-500" />
        <span>Feeling/Activity</span>
      </button>
    </div>
  </div>
);

// Mock Component for a Single Post
const PostItem = ({ post }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-4">
    <div className="flex items-center space-x-3 mb-3">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={dummyUser.profilePicture}
        alt="Profile"
      />
      <div>
        <p className="font-bold">{dummyUser.name}</p>
        <p className="text-xs text-gray-500">1 hour ago</p>
      </div>
    </div>
    <p className="text-gray-800 mb-4">{post.text}</p>
    <div className="flex justify-between text-sm text-gray-500 border-t border-b py-2 my-2">
        <span>{post.likes} Likes</span>
        <span>{post.comments} Comments</span>
    </div>
    <div className="flex justify-around text-sm font-semibold text-gray-600">
      <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 w-full justify-center">Like</button>
      <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 w-full justify-center">Comment</button>
      <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 w-full justify-center">Share</button>
    </div>
  </div>
);


const IntroCard = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">Intro</h2>
    <button className="w-full bg-gray-100 text-black py-2 rounded-lg font-semibold hover:bg-gray-200 mb-3">
        <FaPlus className="inline mr-2 text-sm" /> Add Bio
    </button>
    <ul className="space-y-3 text-gray-700">
      {dummyUser.details.map((detail, index) => (
        <li key={index} className="flex items-center space-x-3">
          <detail.icon className="text-gray-500 text-xl" />
          <span>{detail.text}</span>
        </li>
      ))}
    </ul>
    <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 mt-4">
      Edit Details
    </button>
  </div>
);

const PhotoCard = () => (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Photos</h2>
            <button className="text-blue-600 text-sm hover:underline">See All Photos</button>
        </div>
        <div className="grid grid-cols-3 gap-1">
            {dummyUser.photos.slice(0, 9).map((photo, index) => (
                <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                />
            ))}
        </div>
    </div>
);


const ProfileHeader = ({ user }) => (
    <div className="bg-white shadow">
        {/* Cover Photo Area */}
        <div className="relative h-72 md:h-96">
            <img
                src={user.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white p-2 rounded-lg font-semibold flex items-center shadow-md hover:bg-gray-100 text-sm">
                <FaCamera className="mr-2" />
                Edit Cover Photo
            </button>
        </div>

        {/* Profile Info and Buttons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center -mt-16 lg:-mt-20 pb-4 border-b border-gray-200">
                
                {/* Profile Picture and Name */}
                <div className="flex items-end">
                    <div className="relative">
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="w-40 h-40 border-4 border-white rounded-full object-cover shadow-lg"
                        />
                        <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                            <FaCamera className="text-lg" />
                        </button>
                    </div>
                    <div className="ml-6 mt-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-lg text-gray-600">{user.friendsCount} Friends</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4 lg:mt-0">
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 transition">
                        <FaPlus className="mr-2" />
                        Add to Story
                    </button>
                    <button className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg flex items-center hover:bg-gray-300 transition">
                        <FaEdit className="mr-2" />
                        Edit Profile
                    </button>
                    <button className="bg-gray-200 text-black py-2 px-3 rounded-lg flex items-center hover:bg-gray-300 transition">
                        <FiMoreHorizontal className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 overflow-x-auto whitespace-nowrap pt-2 pb-1">
                <button className="text-blue-600 font-semibold border-b-2 border-blue-600 py-3 px-1">Posts</button>
                <button className="text-gray-600 font-semibold hover:bg-gray-100 py-3 px-1 rounded transition">About</button>
                <button className="text-gray-600 font-semibold hover:bg-gray-100 py-3 px-1 rounded transition">Friends</button>
                <button className="text-gray-600 font-semibold hover:bg-gray-100 py-3 px-1 rounded transition">Photos</button>
                <button className="text-gray-600 font-semibold hover:bg-gray-100 py-3 px-1 rounded transition">Videos</button>
                <button className="text-gray-600 font-semibold hover:bg-gray-100 py-3 px-1 rounded transition">
                    <FiMoreHorizontal className="inline" />
                </button>
            </div>
        </div>
    </div>
);


const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Header Section (Cover, Profile Pic, Nav) */}
      <ProfileHeader user={dummyUser} />

      {/* Body Section (Intro & Timeline) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Intro and Photos) - Takes 1/3 */}
          <div className="lg:col-span-1 space-y-4">
            <IntroCard />
            <PhotoCard />
          </div>

          {/* Right Column (Posts and Timeline) - Takes 2/3 */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Post Creator */}
            <PostCreator />

            {/* Posts Feed */}
            <h2 className="text-2xl font-bold text-gray-800 hidden lg:block">Posts</h2>
            {dummyUser.posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;