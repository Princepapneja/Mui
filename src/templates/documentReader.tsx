"use client"
import { Button, Container } from "@mui/material";
import React, { useState } from "react";

const DocumentReader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/file", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("File uploaded successfully!");
        } else {
          alert("Error uploading file: " + response.statusText);
        }
      } catch (error:any) {
        alert("Error uploading file: " + error.message);
      }
    } else {
      alert("No file selected.");
    }
  };

  return (
    <>
      <Container maxWidth="lg" className="mt-12">
        <div className="flex gap-8">
          <Button component="label" role={undefined} variant="outlined" tabIndex={-1}>
            <input type="file" name="" id="" onChange={handleFileChange} />
          </Button>
          <Button component="label" variant="outlined" tabIndex={-1} onClick={handleUpload}>
            UPLOAD
          </Button>
        </div>
      </Container>
    </>
  );
};

export default DocumentReader;
