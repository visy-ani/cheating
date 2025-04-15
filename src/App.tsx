// src/App.tsx
import PDFRenderer from "./components/PDFViewer";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>In-Place PDF Viewer</h1>
      <PDFRenderer />
    </div>
  );
}

export default App;
