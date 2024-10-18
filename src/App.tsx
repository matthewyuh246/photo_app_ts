import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState<number | null>(null);

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
    //　仮IDに1を配置
    setImageId(1);
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

      {
        imageId && (
          <div>
            <h2>Uploaded Photo:</h2>
            <img
              src={`http://localhost:8080/photo/${imageId}`}
              alt="Uploaded"
              width="400"
            />
          </div>
        )
      }
    </div>
  );
};

export default App;