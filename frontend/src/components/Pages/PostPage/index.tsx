import React from "react";

type PostComponentProps = {
  title: string;
  text: string;
  user: {
    image: string;
    name: string;
    type: string;
  };
  datePublished: string;
  upVotes: number;
};

const PostComponent: React.FC<PostComponentProps> = ({
  title,
  text,
  user,
  datePublished,
  upVotes,
}) => {
  const paragraphs = text.split("\n").filter((paragraph) => paragraph.trim() !== "");

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="pt-24 p-6 bg-white rounded-lg shadow-md max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <span className="text-sm text-gray-500">{user.type}</span>
                <span className="text-sm text-gray-500">{datePublished}</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{upVotes} UpVotes</span>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Responder
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
