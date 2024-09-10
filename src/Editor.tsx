import  { useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  liveblocksConfig,
  LiveblocksPlugin,
  FloatingComposer,
} from "@liveblocks/react-lexical";
import { Toolbar } from "./Toolbar";
import { Threads } from "./Threads";

export function Editor() {
  // Create refs for the editor content and question link input
  const contentRef = useRef<HTMLDivElement>(null);
  const [questionLink, setQuestionLink] = useState("");

  // Function to copy content
  const copyToClipboard = () => {
    if (contentRef.current) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        alert("Copied text successfully!");
      }
    }
  };

  // Function to handle question link submission
  const handleSubmit = (platform: string) => {
    if (questionLink) {
      // Handle the API call logic here based on the platform
      console.log(`Submitting to ${platform}: ${questionLink}`);
      // Example:
      // fetch(`https://api.example.com/${platform}`, { method: 'POST', body: JSON.stringify({ link: questionLink }) })
      //   .then(response => response.json())
      //   .then(data => console.log(data));
    } else {
      alert("Please enter a question link.");
    }
  };

  // Wrap your Lexical config with `liveblocksConfig`
  const initialConfig = liveblocksConfig({
    namespace: "Demo",
    onError: (error: unknown) => {
      console.error(error);
      throw error;
    },
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col gap-4 p-4 bg-[#1e1e1e] rounded-lg shadow-lg text-white min-h-screen">
        <Toolbar />
        <div className="wrapper flex flex-col md:flex-row gap-4">
          <div
            className="editor flex-1 p-4 border border-[#333] rounded-lg bg-[#1e1e1e]"
            ref={contentRef}
          >
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="min-h-[200px] p-2 outline-none text-[#d4d4d4] font-mono"
                  style={{
                    fontFamily: `"Fira Code", "Consolas", "Monaco", monospace`,
                  }}
                />
              }
              placeholder={
                <div className="placeholder text-[#6a6a6a]">
                  Start typing here…
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <Threads />
        </div>
        <div className="flex flex-col gap-4 p-2">
          <input
            type="text"
            placeholder="Enter question link"
            value={questionLink}
            onChange={(e) => setQuestionLink(e.target.value)}
            className="p-2 border border-[#333] rounded-md bg-[#2d2d2d] text-white placeholder-[#6a6a6a]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit("leetcode")}
              className="p-2 bg-[#007acc] text-white rounded-md shadow-md hover:bg-[#005a9e] transition-colors"
            >
              Submit to LeetCode
            </button>
            <button
              onClick={() => handleSubmit("codeforces")}
              className="p-2 bg-[#4b5e8e] text-white rounded-md shadow-md hover:bg-[#3a4d6f] transition-colors"
            >
              Submit to Codeforces
            </button>
            <button
              onClick={() => handleSubmit("geeksforgeeks")}
              className="p-2 bg-[#00a859] text-white rounded-md shadow-md hover:bg-[#008c48] transition-colors"
            >
              Submit to GeeksforGeeks
            </button>
          </div>
        </div>
        <div className="flex justify-end p-2">
          <button
            onClick={copyToClipboard}
            className="p-2 bg-[#007acc] text-white rounded-md shadow-md hover:bg-[#005a9e] transition-colors"
          >
            Copy Your code
          </button>
        </div>
        <LiveblocksPlugin>
          <FloatingComposer className="floating-composer p-2 border border-[#333] rounded-md bg-[#1e1e1e] text-white" />
        </LiveblocksPlugin>
      </div>
    </LexicalComposer>
  );
}
