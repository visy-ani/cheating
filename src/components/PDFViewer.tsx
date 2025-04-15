import { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfFile from "../assets/sample.pdf";

// Set the worker source dynamically
const createWorker = async () => {
  const workerBlobUrl = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerBlobUrl;
};

const PDFViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  const renderPDF = async () => {
    if (rendered) return;

    await createWorker();
    const loadingTask = pdfjsLib.getDocument(pdfFile);
    const pdf = await loadingTask.promise;

    const container = containerRef.current!;
    container.innerHTML = ""; // clear any previous renders

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      canvas.style.marginBottom = "2rem";
      canvas.style.width = "100%";
      canvas.style.maxWidth = "800px";
      canvas.style.display = "block";
      canvas.style.marginInline = "auto";
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      container.appendChild(canvas);
    }

    setRendered(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={renderPDF}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          marginBottom: "2rem",
          display: rendered ? "none" : "inline-block",
        }}
      >
        Render PDF
      </button>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f7f7f7",
        }}
      />
    </div>
  );
};

export default PDFViewer;
