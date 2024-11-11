import React from 'react';


interface User {
  name: string;
  image: string;
}

interface OverlappingImagesProps {
  users: User[];
}

const OverlappingImages: React.FC<OverlappingImagesProps> = ({ users }) => {
    const limitedUsers = users.slice(0, 3);

  return (
    <div className="flex -space-x-5">
      {limitedUsers.map((user, index) => (
        <img
          key={index}
          src={user.image}
          alt={user.name}
          className="w-7 h-7 rounded-full object-cover"
          style={{ zIndex: limitedUsers.length - index }}
        />
      ))}

        {users.length > 3 && (
            <div className="w-9 flex items-center justify-center text-black dark:text-white pl-9 pr-3" style={{ zIndex: 0 }}>
            +{users.length - 3}
            </div>
        )}
    </div>
  );
};

export default OverlappingImages;