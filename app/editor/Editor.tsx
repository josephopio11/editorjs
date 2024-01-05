"use client";

import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";

export default function Editor() {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initialiseEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          table: Table,
        },
      });
      ref.current = editor;
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initialiseEditor();
    };
    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);
  const save = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log("Article Data: ", outputData);
        alert(JSON.stringify(outputData, null, 2));
      });
    }
  };
  return (
    <>
      <div id="editorjs" className="prose max-w-full min-h-[86vh]" />
      <div>
        <Button onClick={save}>Save</Button>
      </div>
    </>
  );
}
