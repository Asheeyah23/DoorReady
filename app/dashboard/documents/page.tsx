export default function DocumentsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <h1 className="font-display text-2xl text-teal-950 mb-2">Documents</h1>
      <p className="text-sm text-ink-soft mb-8">
        Upload household records here. Each one is analyzed by Claude and mapped against your
        program&apos;s rules — see <code className="font-mono text-xs">/api/upload</code> and{" "}
        <code className="font-mono text-xs">/api/analyze</code>.
      </p>
      <div className="border-2 border-dashed border-teal-200 rounded-2xl p-12 text-center text-ink-soft">
        Drag and drop a document, or click to browse. Supports PDF, image, and DOCX.
      </div>
    </div>
  );
}
