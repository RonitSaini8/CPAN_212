import { useState } from "react";

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  // Display multiple Images
  
  const fetchMultipleImages = async () => {
    try {
      const response = await fetch (`http://localhost:8000/fetch/multiple`); 
      const data = await response.json();
      console.log(data); // fetch the list of files

      // now fetch the actual images
      const filePromises = data.map(async (filename) => {
        const fetchFile = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fetchFile.blob();
        console.log(fileBlob)

        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch dog image

  const fetchDogImage = async() => {
    try {
      // fetch
      // set dog image

      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      // this message gives a message and status, we need a message
      const data = await response.json();
      setDisplayDogImage(data.message)
    } catch (error) {
      console.log(error)
    }
  };

  const submitDogImage = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(displayDogImage);
      const data = await response.blob();

      const formData = new FormData();
      formData.append("file", data, "dog.jpg");

      const uploadFile = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData
      });

      const responseData = await uploadFile.json();
      setMessage(responseData.message)
    } catch (error) {
      console.log(error)
    }
  }

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple [TODO]
  // fetch functions -> fetch multiple [TODO]
  // fetch functions -> fetch dog image [TODO]
  // fetch functions -> save dog image [TODO]

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <button onClick = {fetchMultipleImages}>Fetch Multiple Images</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key = {index}>
            <img 
            src = {imageUrl} 
            style = {{width: "200px", height: "300px", margin: "10px"}} />
          </div>
        ))
      ) : (
        <p>No images to display yet !!</p>
      )}

      <button onClick = {fetchDogImage}>Fetch Dog Image</button>
      {displayDogImage && (
        <div>
          <h3>Here's the dog !</h3>
          <img
          src = {displayDogImage}
          style = {{width: "300px", height: "300px"}} />
          <button onClick = {submitDogImage}>Submit to server</button>
        </div>
      )}
    </div>
  );
};

export default App;