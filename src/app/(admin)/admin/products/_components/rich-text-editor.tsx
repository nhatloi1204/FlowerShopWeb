import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { Control } from 'react-hook-form'
import type { ProductFormData } from '@/validations'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
} from 'lucide-react'

interface RichTextEditorProps {
  control: Control<ProductFormData>
  name: 'description'
}

export function RichTextEditor({ control, name }: RichTextEditorProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <TiptapEditor value={field.value || ''} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function TiptapEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-4 cursor-pointer',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] w-full rounded-b-md border border-t-0 border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none prose prose-sm max-w-none dark:prose-invert focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  const toolbarConfig = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      title: 'Bold',
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      title: 'Italic',
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      title: 'Underline',
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      title: 'Strike',
    },
    { type: 'divider' },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      title: 'Heading 1',
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      title: 'Heading 2',
    },
    { type: 'divider' },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      title: 'Blockquote',
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      title: 'Code Block',
    },
    {
      icon: Link2,
      action: () => {
        const url = window.prompt('Enter URL:')
        if (url) editor.chain().focus().setLink({ href: url }).run()
      },
      isActive: editor.isActive('link'),
      title: 'Add Link',
    },
    { type: 'divider' },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().undo(),
      title: 'Undo',
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().redo(),
      title: 'Redo',
    },
  ]

  return (
    <div className='w-full'>
      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-1 rounded-t-md border border-input bg-muted/50 p-1.5'>
        {toolbarConfig.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={index} className='mx-1 h-4 w-[1px] bg-border' />
          }

          const IconComponent = item.icon!
          return (
            <button
              key={index}
              type='button'
              title={item.title}
              disabled={item.disabled}
              onClick={item.action}
              className={`rounded p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                item.isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              }`}
            >
              <IconComponent className='h-4 w-4' />
            </button>
          )
        })}
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  )
}
