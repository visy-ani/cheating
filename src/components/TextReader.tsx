import React, { useEffect, useState } from "react";
import { marked } from "marked";

type Props = {
  filePath: string; // Example: "assets/server.txt"
};

export default function TextFileRenderer({ filePath }: Props) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const text = await response.text();
        const html = await marked.parse(text);
        setContent(html);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchFileContent();
  }, [filePath]);

  if (error) return <pre className="text-red-500 p-6">Error: {error}</pre>;
  if (!content) return <p className="p-6">Loading content...</p>;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-6">
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
