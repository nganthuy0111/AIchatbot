import React from "react";

// Mock data user
const mockUser = {
  name: "Nguyen Van A",
  email: "nguyenvana@example.com",
  role: "user",
  phone: "0123 456 789",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  avatar: "https://i.pravatar.cc/100",
  joined: "2023-01-15",
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img
          src={mockUser.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-green-400 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-black">{mockUser.name}</h2>
        <p className="text-gray-500 mb-4">{mockUser.email}</p>
        <div className="w-full mb-4">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="text-gray-900">{mockUser.role}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-900">{mockUser.phone}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-700">Address:</span>
            <span className="text-gray-900">{mockUser.address}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-700">Joined:</span>
            <span className="text-gray-900">{mockUser.joined}</span>
          </div>
        </div>
        <button className="mt-4 bg-green-400 text-black px-6 py-2 rounded font-semibold hover:bg-green-500 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
