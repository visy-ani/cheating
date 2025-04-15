// src/App.tsx
import PDFRenderer from "./components/PDFViewer";
import TextRenderer from "./components/TextReader";
function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>In-Place PDF Viewer</h1>
      {/* <PDFRenderer /> */}
      <TextRenderer filePath="assets/server.txt" />

    </div>
  );
}

export default App;
