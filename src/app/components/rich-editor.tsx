'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  RiBold,
  RiH1,
  RiH2,
  RiImageLine,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiListUnordered,
  RiLoader2Line,
  RiUnderline,
} from '@remixicon/react';
import { Toggle } from '@/components/Toggle';
import { Button } from '@/components/Button';
import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  disabled,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      // Link.configure({
      //   openOnClick: false,
      //   HTMLAttributes: {
      //     class: 'text-primary underline cursor-pointer',
      //   },
      // }),
      // Image.configure({
      //   HTMLAttributes: {
      //     class: 'rounded-md max-w-full mx-auto my-4',
      //   },
      // }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Set initial content when editor is ready
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle link insertion
  // const handleLinkInsert = () => {
  //   if (linkUrl && editor) {
  //     editor
  //       .chain()
  //       .focus()
  //       .extendMarkRange('link')
  //       .setLink({ href: linkUrl })
  //       .run();

  //     setLinkUrl('');
  //     setShowLinkInput(false);
  //   }
  // };

  // Handle image insertion
  // const handleImageInsert = () => {
  //   const url = prompt('Enter image URL');
  //   if (url && editor) {
  //     editor.chain().focus().setImage({ src: url }).run();
  //   }
  // };

  if (!mounted) {
    return (
      <div className='border rounded-md p-4 w-full h-64 flex items-center justify-center border-gray-300/20'>
        <RiLoader2Line className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!editor) {
    return (
      <div className='border rounded-md p-4 w-full h-64 flex items-center justify-center border-gray-300/20'>
        <RiLoader2Line className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='rich-text-editor border border-gray-300 rounded-md overflow-hidden'>
      <div className='p-2 border-b border-gray-300 flex flex-wrap gap-1 items-center'>
        <Toggle
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label='Bold'
        >
          <RiBold className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label='Italic'
        >
          <RiItalic className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label='Underline'
        >
          <RiUnderline className='h-4 w-4' />
        </Toggle>
        <div className='w-px h-6 bg-border mx-1' />
        <Toggle
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label='Heading 1'
        >
          <RiH1 className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label='Heading 2'
        >
          <RiH2 className='h-4 w-4' />
        </Toggle>
        <div className='w-px h-6 bg-border mx-1' />
        <Toggle
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label='Bullet List'
        >
          <RiListUnordered className='h-4 w-4' />
        </Toggle>
        <Toggle
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label='Ordered List'
        >
          <RiListOrdered className='h-4 w-4' />
        </Toggle>
        <div className='w-px h-6 bg-border mx-1' />
        {/* <div className='relative'>
          <Toggle
            pressed={editor.isActive('link')}
            onPressedChange={() => {
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run();
              } else {
                setShowLinkInput(!showLinkInput);
              }
            }}
            aria-label='Link'
          >
            <RiLink className='h-4 w-4' />
          </Toggle>
          {showLinkInput && (
            <div className='absolute top-full left-0 mt-1 z-10 bg-popover border rounded-md shadow-md p-2 flex items-center gap-2'>
              <input
                type='url'
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder='https://example.com'
                className='text-sm p-1 border rounded w-60'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLinkInsert();
                  }
                }}
              />
              <Button onClick={handleLinkInsert}>Add</Button>
            </div>
          )}
        </div>
        <Toggle onPressedChange={handleImageInsert} aria-label='Image'>
          <RiImageLine className='h-4 w-4' />
        </Toggle> */}
      </div>
      <EditorContent
        id='editor'
        editor={editor}
        className='prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none'
      />
    </div>
  );
}
