import { useState, useRef } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&family=Archivo+Black&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --black: #0a0a0a;
    --white: #f5f0e8;
    --yellow: #FFE600;
    --red: #FF2B2B;
    --blue: #0066FF;
    --border: 3px solid #0a0a0a;
    --shadow: 5px 5px 0px #0a0a0a;
    --shadow-lg: 8px 8px 0px #0a0a0a;
    --shadow-xl: 12px 12px 0px #0a0a0a;
  }

  html, body {
    background: var(--white);
    color: var(--black);
    font-family: 'Space Mono', monospace;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--white);
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 39px,
        rgba(0,0,0,0.06) 39px,
        rgba(0,0,0,0.06) 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 39px,
        rgba(0,0,0,0.06) 39px,
        rgba(0,0,0,0.06) 40px
      );
  }

  /* ── HEADER ── */
  .header {
    border-bottom: var(--border);
    padding: 0;
    display: flex;
    align-items: stretch;
    background: var(--white);
    position: relative;
    z-index: 10;
  }

  .header-logo-block {
    background: var(--yellow);
    border-right: var(--border);
    padding: 20px 32px;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
  }

  .header-icon {
    width: 42px;
    height: 42px;
    background: var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-icon svg {
    width: 24px;
    height: 24px;
    fill: var(--yellow);
  }

  .logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.4rem;
    letter-spacing: 3px;
    line-height: 1;
    color: var(--black);
  }

  .header-tagline {
    padding: 0 28px;
    display: flex;
    align-items: center;
    border-right: var(--border);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--black);
    opacity: 0.55;
  }

  .header-badge {
    margin-left: auto;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-left: var(--border);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--red);
    animation: blink 1.4s step-start infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .badge-text {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ── MAIN ── */
  .main {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  /* ── LEFT PANEL ── */
  .left-panel {
    border-right: var(--border);
    padding: 60px 52px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    position: relative;
  }

  .headline-block {
    position: relative;
  }

  .headline-eyebrow {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .headline-eyebrow::before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 3px;
    background: var(--red);
  }

  .headline {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    line-height: 0.95;
    text-transform: uppercase;
    letter-spacing: -1px;
  }

  .headline em {
    font-style: normal;
    background: var(--yellow);
    padding: 2px 8px;
    display: inline-block;
    transform: rotate(-1deg);
    box-shadow: var(--shadow);
  }

  .headline .outline {
    -webkit-text-stroke: 3px var(--black);
    color: transparent;
  }

  .desc {
    font-size: 0.8rem;
    line-height: 1.8;
    opacity: 0.6;
    max-width: 380px;
    border-left: 4px solid var(--black);
    padding-left: 16px;
  }

  .stats-row {
    display: flex;
    gap: 0;
    border: var(--border);
    box-shadow: var(--shadow);
  }

  .stat {
    flex: 1;
    padding: 18px 22px;
    border-right: var(--border);
    background: var(--white);
    transition: background 0.15s;
  }

  .stat:last-child { border-right: none; }

  .stat:hover { background: var(--yellow); }

  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    line-height: 1;
    letter-spacing: 1px;
  }

  .stat-label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.5;
    margin-top: 4px;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: var(--border);
    box-shadow: var(--shadow);
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-bottom: var(--border);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    transition: background 0.12s;
    cursor: default;
  }

  .feature-item:last-child { border-bottom: none; }
  .feature-item:hover { background: var(--black); color: var(--white); }
  .feature-item:hover .feat-icon { background: var(--yellow); color: var(--black); }

  .feat-icon {
    width: 30px;
    height: 30px;
    background: var(--black);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    flex-shrink: 0;
    transition: background 0.12s, color 0.12s;
  }

  /* ── RIGHT PANEL ── */
  .right-panel {
    padding: 60px 52px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
  }

  .panel-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-label span {
    background: var(--black);
    color: var(--white);
    padding: 4px 10px;
  }

  /* DROP ZONE */
  .drop-zone {
    border: var(--border);
    border-style: dashed;
    border-width: 4px;
    padding: 52px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    cursor: pointer;
    position: relative;
    background: var(--white);
    transition: background 0.15s, box-shadow 0.15s, transform 0.12s;
    box-shadow: var(--shadow-lg);
  }

  .drop-zone:hover,
  .drop-zone.dragging {
    background: var(--yellow);
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow-xl);
  }

  .drop-zone.has-file {
    background: #eaffea;
    border-style: solid;
    border-color: #00aa44;
    box-shadow: 8px 8px 0 #00aa44;
  }

  .drop-icon {
    width: 72px;
    height: 72px;
    background: var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s;
  }

  .drop-zone:hover .drop-icon,
  .drop-zone.dragging .drop-icon {
    transform: translateY(-4px) rotate(3deg);
  }

  .drop-icon svg {
    width: 38px;
    height: 38px;
    fill: var(--yellow);
  }

  .drop-zone.has-file .drop-icon {
    background: #00aa44;
  }

  .drop-zone.has-file .drop-icon svg {
    fill: var(--white);
  }

  .drop-main-text {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }

  .drop-sub-text {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.45;
  }

  .file-name-tag {
    background: var(--black);
    color: var(--white);
    padding: 6px 14px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 2px solid var(--black);
  }

  .file-hidden-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  /* FILE INFO STRIP */
  .file-meta {
    display: flex;
    gap: 0;
    border: var(--border);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .meta-item {
    flex: 1;
    padding: 14px 16px;
    border-right: var(--border);
    background: var(--white);
  }

  .meta-item:last-child { border-right: none; }

  .meta-key {
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.45;
    margin-bottom: 4px;
  }

  .meta-val {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 160px;
  }

  /* UPLOAD BUTTON */
  .upload-btn {
    all: unset;
    cursor: pointer;
    background: var(--black);
    color: var(--white);
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    padding: 22px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    border: var(--border);
    box-shadow: var(--shadow-lg);
    position: relative;
    transition: transform 0.12s, box-shadow 0.12s, background 0.12s;
    user-select: none;
  }

  .upload-btn:hover:not(:disabled) {
    background: var(--yellow);
    color: var(--black);
    transform: translate(-4px, -4px);
    box-shadow: var(--shadow-xl);
  }

  .upload-btn:active:not(:disabled) {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 var(--black);
  }

  .upload-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .upload-btn.loading {
    background: var(--blue);
    color: var(--white);
    pointer-events: none;
  }

  .btn-arrow {
    font-size: 1.3rem;
    transition: transform 0.15s;
  }

  .upload-btn:hover .btn-arrow {
    transform: translateX(5px);
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* MESSAGE TOAST */
  .message-bar {
    border: var(--border);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1px;
    box-shadow: var(--shadow);
    animation: slideIn 0.25s cubic-bezier(.22,1,.36,1);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .message-bar.success {
    background: var(--yellow);
    border-color: var(--black);
  }

  .message-bar.error {
    background: var(--red);
    color: var(--white);
    border-color: var(--black);
  }

  .msg-icon {
    width: 28px;
    height: 28px;
    background: var(--black);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .message-bar.error .msg-icon {
    background: var(--white);
    color: var(--red);
  }

  /* FOOTER */
  .footer {
    border-top: var(--border);
    display: flex;
    align-items: stretch;
  }

  .footer-left {
    padding: 16px 32px;
    border-right: var(--border);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.4;
    display: flex;
    align-items: center;
  }

  .footer-right {
    padding: 16px 32px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.4;
    display: flex;
    align-items: center;
    margin-left: auto;
    border-left: var(--border);
  }

  .progress-bar-wrapper {
    flex: 1;
    border-right: var(--border);
    display: flex;
    align-items: center;
    padding: 0 32px;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(0,0,0,0.1);
    border: 2px solid var(--black);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--black);
    transition: width 0.4s cubic-bezier(.22,1,.36,1);
  }

  /* RESPONSIVE */
  @media (max-width: 860px) {
    .main { grid-template-columns: 1fr; }
    .left-panel { border-right: none; border-bottom: var(--border); padding: 40px 28px; }
    .right-panel { padding: 40px 28px; }
    .header-tagline { display: none; }
  }
`;

function formatBytes(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getExtension(name) {
  if (!name) return "—";
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
}

export default function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setMessage("");
    setProgress(0);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage("");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded / e.total) * 100);
          setProgress(pct);
        },
      });
      setMessage(res.data.message || "Upload successful!");
      setMsgType("success");
      setProgress(100);
    } catch {
      setMessage("Upload failed. Please try again.");
      setMsgType("error");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const dropZoneClass = [
    "drop-zone",
    dragging ? "dragging" : "",
    file ? "has-file" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* HEADER */}
        <header className="header">
          <div className="header-logo-block">
            <div className="header-icon">
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
            </div>
            <span className="logo-text">CloudDocs</span>
          </div>
          <span className="header-tagline">File Upload System</span>
          <div className="header-badge">
            <div className="dot" />
            <span className="badge-text">System Online</span>
          </div>
        </header>

        {/* MAIN */}
        <main className="main">
          {/* LEFT */}
          <div className="left-panel">
            <div className="headline-block">
              <div className="headline-eyebrow">Document Management</div>
              <h1 className="headline">
                DROP<br />
                <em>YOUR</em><br />
                <span className="outline">FILES.</span>
              </h1>
            </div>

            <p className="desc">
              Raw. Brutal. Efficient. Upload any document to the cloud
              with zero friction and maximum control. No fluff, just function.
            </p>

            <div className="stats-row">
              <div className="stat">
                <div className="stat-num">99%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-num">∞</div>
                <div className="stat-label">Storage</div>
              </div>
              <div className="stat">
                <div className="stat-num">0ms</div>
                <div className="stat-label">Latency</div>
              </div>
            </div>

            <div className="features-list">
              {[
                ["▲", "Drag & Drop Interface"],
                ["◆", "Real-time Upload Progress"],
                ["●", "All File Formats Supported"],
                ["■", "Instant Cloud Sync"],
              ].map(([icon, label]) => (
                <div className="feature-item" key={label}>
                  <div className="feat-icon">{icon}</div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="panel-label">
              <span>01</span> Select File
            </div>

            {/* DROP ZONE */}
            <div
              className={dropZoneClass}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={inputRef}
                type="file"
                className="file-hidden-input"
                onChange={handleChange}
              />
              <div className="drop-icon">
                {file ? (
                  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
                )}
              </div>
              <div className="drop-main-text">
                {file ? "File Ready" : dragging ? "Release to Upload" : "Drop File Here"}
              </div>
              {!file && (
                <div className="drop-sub-text">or click to browse</div>
              )}
              {file && (
                <div className="file-name-tag">
                  {file.name}
                </div>
              )}
            </div>

            {/* FILE META */}
            {file && (
              <div className="file-meta">
                <div className="meta-item">
                  <div className="meta-key">Name</div>
                  <div className="meta-val" title={file.name}>{file.name}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-key">Type</div>
                  <div className="meta-val">{getExtension(file.name)}</div>
                </div>
                <div className="meta-item">
                  <div className="meta-key">Size</div>
                  <div className="meta-val">{formatBytes(file.size)}</div>
                </div>
              </div>
            )}

            {/* UPLOAD BUTTON */}
            <button
              className={`upload-btn${loading ? " loading" : ""}`}
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Uploading…
                </>
              ) : (
                <>
                  Upload File
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>

            {/* MESSAGE */}
            {message && (
              <div className={`message-bar ${msgType}`}>
                <div className="msg-icon">
                  {msgType === "success" ? "✓" : "✕"}
                </div>
                {message}
              </div>
            )}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-left">CloudDocs v2.4</div>
          <div className="progress-bar-wrapper">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="footer-right">{progress > 0 ? `${progress}%` : "Awaiting Upload"}</div>
        </footer>
      </div>
    </>
  );
}