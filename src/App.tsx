import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState<number[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

   try{
    const response = await axios.post("http://localhost:8080/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(response.data.message);
    //　アップロードされた画像のIDを配列に追加
    setImageId((prevIds) => [...prevIds, response.data.photo_id]);
   }  catch (error) {
    console.error("Error uploading file:", error);
    alert("Failed to upload photo");
   }
  };

  return (
    <div>
      <h1>Photo Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div className="image-gallery">
        {imageId.length > 0 && (
          <div>
            <h2>Uploaded Photos:</h2>
            <div className="photos-container">
              {imageId.map((id) => (
                <img
                  key={id}
                  src={`http://localhost:8080/photo/${id}`}
                  alt={`Uploaded ${id}`}
                  width="200"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;