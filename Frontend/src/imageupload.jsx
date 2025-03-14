import { useState } from "react";
import axios from "axios";
import './ImageUploadForm.css';

function ImageUploadForm() {
  const [filename, setFilename] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [disease, setDisease] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename || !uploadedBy || !disease) {
      setError("All fields required");
      return;
    }

    const payload = {
      filename: filename,
      uploaded_by: uploadedBy,
      actual_class: disease
    };

    try {
      const res = await axios.post("http://localhost:6969/images", payload);
      setResponse(res.data.image);
      setError(null);
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h2>Sugarcane Disease Upload</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Image Filename (e.g., leaf001.jpg)</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter .jpg file name"
            />
          </div>

          <div className="form-group">
            <label>Uploaded By</label>
            <input
              type="text"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label>Select Disease</label>
            <select value={disease} onChange={(e) => setDisease(e.target.value)} required>
              <option value="">-- Choose Disease --</option>
              <option value="Red Rot">Red Rot</option>
              <option value="Rust">Rust</option>
              <option value="Yellow">Yellow</option>
              <option value="Healthy">Healthy</option>
              <option value="Mosaic">Mosaic</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Save Metadata
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        {response && (
          <div className="success">
            <h3>Metadata Stored</h3>
            <img
              src={`http://localhost:6969${response.path}`}
              alt="Uploaded"
            />
            <p><strong>Class:</strong> {response.actual_class}</p>
            <p><strong>By:</strong> {response.uploaded_by}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploadForm;
