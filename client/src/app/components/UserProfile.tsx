import React from "react";

type UserProfileProps = {
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="text-center my-6 self-center">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-white">
      <img
        src={user.profileImage} 
        alt="User Profile"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      </div>
      <h2 className="text-xl font-semibold text-white" >{user.name}</h2>
      <p className="text-white">{user.email}</p>
    </div>
  );
};

export default UserProfile;