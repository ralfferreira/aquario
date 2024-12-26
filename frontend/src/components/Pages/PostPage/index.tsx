import React from "react";
import TypeBadge from "@/components/Shared/Badges";

type PostComponentProps = {
  title: string;
  text: string;
  user: {
    image: string;
    name: string;
    type: string;
  };
  timePublished: number;
  upVotes: number;
};

const PostComponent: React.FC<PostComponentProps> = ({
  title,
  text,
  user,
  timePublished,
  upVotes,
}) => {
  const paragraphs = text.split("\n").filter((paragraph) => paragraph.trim() !== "");

  const timePosted = () => {
    if (timePublished < 60) {
      return `${timePublished} minutos atrás`;
    }
    
    const hours = Math.floor(timePublished / 60);
    const minutes = timePublished % 60;

    if (minutes === 0) {
      return `${hours} horas atrás`;
    } else {
      return `${hours} horas e ${minutes} minutos atrás`;
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="flex pt-24 p-6 bg-white rounded-lg shadow-md max-w-3xl relative">
        <div className="flex flex-col items-center pr-4 relative">
          <button className="text-gray-500 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-700">{upVotes}</span>
          <button className="text-gray-500 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="absolute top-20 bottom-[4.5rem] w-px bg-gray-300"></div>
        </div>

        <div className="pl-4 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <span className="text-sm text-gray-500">
                <TypeBadge type={user.type} size="small" />
              </span>
              <span className="text-sm text-gray-500">{timePosted()}</span>
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

          <div className="flex justify-between items-center text-sm text-gray-500 border-2 p-5 rounded-lg">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Responder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
