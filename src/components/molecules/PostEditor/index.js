import { useEffect, useRef } from "react";

export default function PostEditor({ onRenderContent, initialData }) {
  const editorRef = useRef(null);
  const holderRef = useRef(null);

  // Inisialisasi EditorJS sekali
  useEffect(() => {
    const init = async () => {
      const { default: EditorJS } = await import("@editorjs/editorjs");
      const { default: Header } = await import("@editorjs/header");
      const { default: List } = await import("@editorjs/list");
      const { default: Quote } = await import("@editorjs/quote");
      const { default: ImageTool } = await import("@editorjs/image");
      const { default: ParagraphWithAlignment } = await import("editorjs-paragraph-with-alignment");

      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: holderRef.current,
          autofocus: true,
          data: initialData || {}, // initial data pertama kali
          tools: {
            header: Header,
            list: List,
            quote: Quote,
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    return {
                      success: 1,
                      file: { url: URL.createObjectURL(file) },
                    };
                  },
                },
              },
            },
            paragraph: {
              class: ParagraphWithAlignment,
              inlineToolbar: true,
              config: {
                defaultAlignment: "justify",
                preserveBlank: true,
              },
            },
          },
          onReady: () => {
            editorRef.current = editor;
          },
          onChange: async () => {
            const content = await editor.saver.save();
            onRenderContent(content);
          },
        });
      } else {
        // Update editor content tanpa mount ulang
        editorRef.current.render(initialData || {});
      }
    };

    init();

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []); // 👈 Kosongkan dependency agar hanya init sekali

  // Update konten editor saat initialData berubah tanpa mount ulang
  useEffect(() => {
    if (editorRef.current && initialData) {
      editorRef.current.render(initialData);
    }
  }, []);

  return (
    <div className="p-6">
      <div
        ref={holderRef}
        className="w-full min-h-[260px] p-6 bg-secondary-white dark:bg-secondary-black text-primary-black dark:text-primary-white border border-third-white dark:border-third-black"
      />
    </div>
  );
}
