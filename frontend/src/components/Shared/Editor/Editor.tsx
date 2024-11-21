'use client';

import { useState } from 'react';
import RichTextEditor, {
  BaseKit,
  Bold,
  BulletList,
  OrderedList,
  Heading,
  Italic,
  Link,
  Code,
  Image,
  History,
  HorizontalRule,
  Emoji,
  SlashCommand,
  Blockquote,
  CodeBlock,
} from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';

import { locale } from 'reactjs-tiptap-editor';

interface EditorProps {
  defaultContent?: string;
  onContentChange?: (value: any) => void;
  characterLimit?: number;
}

const Editor: React.FC<EditorProps> = ({
  defaultContent = '',
  onContentChange,
  characterLimit = 50_000,
}) => {
  locale.setLang('pt_BR');
  
  const [content, setContent] = useState(defaultContent);

  const handleContentChange = (value: any) => {
    setContent(value); 
    if (onContentChange) {
      onContentChange(value); 
    }
  };

  const renderContent = () => {
    if (typeof content === 'string') {
      return <div>{content}</div>;
    }

    if (typeof content === 'object') {
      return (
        <div>
          <strong>Raw JSON:</strong> {JSON.stringify(content)}
        </div>
      );
    }

    return null; 
  };

  const extensions = [
    BaseKit.configure({
      placeholder: { showOnlyCurrent: true },
      characterCount: { limit: characterLimit },
    }),
    History,
    Heading.configure({ spacer: true }),
    Italic,
    Bold,
    BulletList,
    OrderedList,
    Link,
    Code,
    Blockquote.configure({ spacer: true }),
    Code.configure({ toolbar: false }),
    CodeBlock.configure({ defaultTheme: 'dracula' }),
    HorizontalRule,
    Image.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files));
          }, 500);
        });
      },
    }),
    Emoji,
    SlashCommand,
  ];

  return (
    <>
      <RichTextEditor
        output="json"
        content={content}
        onChangeContent={handleContentChange}
        extensions={extensions}
      />
      <div className="mt-10 p-4 border">
        <h3>Rendered Content:</h3>
        {renderContent()}
      </div>
    </>
  );
};

export default Editor;
