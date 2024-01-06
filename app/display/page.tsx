"use client";

import { error } from "console";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const DisplayPage = ({ content }: EditorOutputProps) => {
  return (
    <Output
      //   @ts-expect-error
      style={style}
      className="text-sm"
      //   renderers={renderers}
      data={content}
    />
  );
};

export default DisplayPage;
