import React from "react";

type UserProfileProps = {
  user: {
    name: string;
    email: string;
    img: string; // Ensure it matches API response
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Set default image if user.img is "default"
  const profileImage = user?.img === "default" ? "/images/profile.svg" : user?.img;

  return (
    <div className="text-center my-6 self-center">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-white">
        <img
          src={profileImage ?? "/images/profile.svg"}
          alt="User Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
      <h2 className="text-xl font-semibold text-white">{user?.name || "Unknown User"}</h2>
      <p className="text-white">{user?.email || "No email available"}</p>
    </div>
  );
};

export default UserProfile;