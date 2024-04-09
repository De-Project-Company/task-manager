import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

const ReactQuillEditor = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const registerQuill = async () => {
  const { Quill } = await (await import("react-quill")).default;

  const Link = Quill.import("formats/link");
  // Override the existing property on the Quill global object and add custom protocols
  Link.PROTOCOL_WHITELIST = [
    "http",
    "https",
    "mailto",
    "tel",
    "radar",
    "rdar",
    "smb",
    "sms",
  ];

  class CustomLinkSanitizer extends Link {
    static sanitize(url: string) {
      // Run default sanitize method from Quill
      const sanitizedUrl = super.sanitize(url);

      // Not whitelisted URL based on protocol so, let's return `blank`
      if (!sanitizedUrl || sanitizedUrl === "about:blank") return sanitizedUrl;

      // Verify if the URL already have a whitelisted protocol
      const hasWhitelistedProtocol = this.PROTOCOL_WHITELIST.some(
        (protocol: string) => {
          return sanitizedUrl.startsWith(protocol);
        }
      );

      if (hasWhitelistedProtocol) return sanitizedUrl;

      // if not, then append only 'http' to not to be a relative URL
      return `https://${sanitizedUrl}`;
    }
  }

  Quill.register(CustomLinkSanitizer, true);
};

registerQuill();

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface TextEditorProps {
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextEditor({
  value,
  setValue,
  placeholder,
  className,
}: TextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    registerQuill();
  }, []);

  if (!isMounted) return null;

  return (
    <ReactQuillEditor
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={setValue}
      className={cn("w-full bg-primary", className)}
    />
  );
}
