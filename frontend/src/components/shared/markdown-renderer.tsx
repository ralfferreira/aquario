import React from "react";
import ReactMarkdown from "react-markdown";

type MarkdownRendererProps = {
  content: string;
  title: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ title, content }) => {
  return (
    <div className="md:pt-14 h-[100vh] overflow-y-auto">
      <p className="text-base text-gray-500 mb-4">{title}</p>
      <div className="prose-base dark:prose-invert w-full prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
