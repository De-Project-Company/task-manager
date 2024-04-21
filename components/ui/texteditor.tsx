"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline as Under,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import { cn } from "@/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={cn(
            editor.isActive("bold")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={cn(
            editor.isActive("italic")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={cn(
            editor.isActive("underline")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Under className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={cn(
            editor.isActive("strike")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={cn(
            editor.isActive("heading", { level: 2 })
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={cn(
            editor.isActive("bulletList")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={cn(
            editor.isActive("orderedList")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={cn(
            editor.isActive("blockquote")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={cn(
            editor.isActive("code")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary dark:text-white"
          )}
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={cn(
            editor.isActive("undo")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary/40 dark:text-white hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          )}
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={cn(
            editor.isActive("redo")
              ? "bg-primary dark:bg-white dark:text-primary text-white p-2 rounded-lg"
              : "text-primary/40 dark:text-white hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          )}
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export { Tiptap };
