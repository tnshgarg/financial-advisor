"use client";

import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

// import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  //   const { edgestore } = useEdgeStore();

  //   const handleUpload = async (file: File) => {
  //     const response = await edgestore.publicFiles.upload({
  //       file,
  //     });

  //     return response.url;
  //   };
  console.log("initialContent: ", initialContent);

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as any[])
      : undefined,
    onEditorContentChange: (editor: any) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    // uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        className="h-40"
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
