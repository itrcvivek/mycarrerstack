import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
} from "@mui/material";
import "./style.css";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import MetaData from "./MetaData";

const ImageGallery = () => {
  const cardRefs = useRef([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [imageUrlName, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [allDataArray, setAllDataArray] = useState<any[]>([]);
  // *************************************
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState<{
    [key: number]: { top: number; left: number };
  }>({});
  // const [isDragging, setIsDragging] = useState(false);
  const [isDragging, setIsDragging] = useState<number | null>(null);

  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // const handleMouseDown2 = (e: any, index: any) => {
  //   setIsDragging(true);
  //   // Capture the initial offset between the mouse click and the div's top-left corner
  //   setOffset({
  //     x: e.clientX - position.x,
  //     y: e.clientY - position.y,
  //   });
  // };
  const handleMouseDown2 = (e: React.MouseEvent, index: number) => {
    const positions = position[index] || { top: 0, left: 0 }; // Get the current position or default
    setIsDragging(index);
    setOffset({
      x: e.clientX - positions.left,
      y: e.clientY - positions.top,
    });
    alert(offset.x);
  };
  // const handleMouseMove2 = (e: any) => {
  //   if (!isDragging) return;
  //   // Update the position based on the mouse movement
  //   setPosition({
  //     x: e.clientX - offset.x,
  //     y: e.clientY - offset.y,
  //   });
  // };
  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (isDragging !== null) {
      const newTop = e.clientY - offset.y;
      const newLeft = e.clientX - offset.x;

      setPosition((prev) => ({
        ...prev,
        [isDragging]: { top: newTop, left: newLeft }, // Update only the dragging card's position
      }));
    }
  };
  const handleMouseUp2 = () => {
    setIsDragging(null);
  }; // Stop dragging when mouse is released
  

  // *************************************
  // *************************************

  const [headingPositions, setHeadingPositions] = useState<{
    [key: number]: { top: number; left: number };
  }>({});
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [startDragOffset, setStartDragOffset] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Handle Mouse Down
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const headingPos = headingPositions[index] || { top: 0, left: 0 }; // Get the current position or default
    setDraggingIndex(index);
    setStartDragOffset({
      x: e.clientX - headingPos.left,
      y: e.clientY - headingPos.top,
    });
  };

  // Handle Mouse Move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingIndex !== null) {
      const newTop = e.clientY - startDragOffset.y;
      const newLeft = e.clientX - startDragOffset.x;

      setHeadingPositions((prev) => ({
        ...prev,
        [draggingIndex]: { top: newTop, left: newLeft }, // Update only the dragging card's position
      }));
    }
  };

  // Handle Mouse Up
  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  // *************************************
  // Unsplash API Key and URL
  const API_KEY = "X3TsSPoymE11c42aygrvQ_LFGkHAYv_6c1dOZ1pg-gg";
  const API_URL = `https://api.unsplash.com/search/photos`;

  const categories = [
    { name: "success", query: "success" },
    { name: "attitude", query: "attitude" },
    { name: "positive", query: "positive" },
    { name: "motivational", query: "motivational" },
    { name: "sad", query: "sad" },
    { name: "love", query: "love" },
  ];

  const startQuoteFetching = (query: any) => {
    const intervalId = setInterval(() => {
      QuiteAll(intervalId, query); // Call QuiteAll periodically
    }, 1000); // Call every 1 second

    // Cleanup interval when necessary
    return () => clearInterval(intervalId);
  };

  const QuiteAll = async (intervalId: NodeJS.Timeout, query: any) => {
    setError(false);

    try {
      const response: any = await axios.get(
        `https://hindi-quotes.vercel.app/random/${query}`
      );
      setAllDataArray((prevData) => {
        const updatedData = [
          ...prevData,
          { name: response.data.quote, query: query }, // Add quote data
        ];

        // Stop the interval when 30 quotes have been collected
        if (updatedData.length >= 30) {
          clearInterval(intervalId);
        }

        return updatedData;
      });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const searchImages = async (searchTerm: any) => {
    console.log(searchTerm, "fff");
    setError(false);

    try {
      const response = await axios.get(API_URL, {
        params: {
          query: searchTerm,
          client_id: API_KEY,
          per_page: 30, // Number of results per page
        },
      });
      funct(response.data.results, searchTerm);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const funct = (data: any, searchTerm: any) => {
    let ggg = data.map((item: any, index: any) => {
      return {
        id: index + 1,
        imageUrl: item.urls.small,
        cat: searchTerm,
      };
    });
    setImagesData(ggg);
  };
  const handleCategoryClick = (query: any) => {
    setAllDataArray([]);
    setImagesData([]);
    searchImages(query);
    startQuoteFetching(query);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fakeUser();
    }, 5000); // Calls the API every 1 second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fakeUser = async () => {
    setError(false);

    try {
      const response: any = await axios.get(`https://randomuser.me/api/`);

      functFake(response.data.results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const functFake = (data: any) => {
    setDataArray((prevData) => [...prevData, ...data]);
  };
  // Handle category click

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleDesChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can handle the form submission logic here, e.g., sending the data to an API
    handleCategoryClick(selectedCategory);
  };
  const handleDownload = (index: any) => {
    if (!isImageLoaded) {
      alert("Please wait until the image is fully loaded.");
      return;
    }

    const cardElement = cardRefs.current[index];

    // Use the useCORS and allowTaint options to enable cross-origin image rendering
    html2canvas(cardElement, { useCORS: true, allowTaint: false })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `card_image_${index + 1}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Canvas rendering failed: ", error);
      });
  };
  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set to true once the image is loaded
  };
  // const handleFacebookShare = () => {
  //   const shareUrl = window.location.href; // Use the current URL or generate the specific URL
  //   const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     shareUrl
  //   )}`;
  //   window.open(facebookShareUrl, "_blank");
  // };

  const handleWhatsappShare = ({ title, imageUrl, shareUrl }: any) => {
    const message = `Check this out: ${title}\n${imageUrl}\n${shareUrl}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappShareUrl, "_blank");
  };

  return (
    <div style={{ margin: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <h1>Custom Wishes</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-item">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </div>

            <div className="form-item">
              <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                required
                fullWidth
              />
            </div>

            <div className="form-item">
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.query} value={category.query}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="form-item">
              <TextField
                label="Wish Content"
                value={description}
                onChange={handleDesChange}
                fullWidth
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              color="primary"
            >
              Submit
            </Button>
            {/* Social Media Share Buttons */}
          </form>
          <ul className="user-list">
            {dataArray.map((item: any, index: number) => (
              <li key={index} className="user-card">
                <img
                  src={item.picture.large}
                  alt={item.name.first}
                  className="user-image"
                />
                <div className="user-info">
                  <h3>
                    {item.name.first} {item.name.last}
                  </h3>
                  <p>{item.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            {allDataArray.map((image: any, index: any) => {
              const headingPosition = headingPositions[index] || {
                top: 0,
                left: 0,
              }; // Get the position for the specific card

              console.log("Card index:", index); // Logs index of each card
              return (
                <Grid item xs={12} sm={12} md={6} key={index}>
                  <div>
                    <MetaData title={`${name}`} description={`${image.msg}`} />
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "350px",
                        overflow: "hidden",
                      }}
                      //@ts-ignore
                      ref={(el) => (cardRefs.current[index] = el)}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      {/* Top Heading */}
                      <h2
                        style={{
                          position: "absolute",
                          top: `${headingPosition.top}px`,
                          color: "#fff",
                          padding: "10px",
                          fontSize: "18px",
                          lineHeight: "24px",
                          width: "97%",
                          textAlign: "center",
                          zIndex: 1,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          cursor: "grab",
                        }}
                        onMouseDown={(e) => handleMouseDown(e, index)} // Pass index to identify which card to move
                      >
                        {/* {index} */}
                        {image?.name}
                      </h2>

                      {/* User's Image and Name at the Bottom */}
                      
                      <div
                      
                        style={{
                          display: "flex",
                          position: "absolute",
                          width: "100%",
                          // bottom: '10px',
                          // right: '10px',
                          justifyContent: "flex-end",
                          alignItems: "center",
                          zIndex: 1,
                          transform: `translate(${offset.x}px, ${offset.y}px)`,
                          cursor: "grab",
                          
                        }}
                        

                        onMouseDown={(e) => handleMouseDown2(e, index)}
                        onMouseMove={handleMouseMove2}
                        onMouseUp={handleMouseUp2}
                        onMouseLeave={handleMouseUp2} // Ensures drag ends if mouse leaves the div
                      >
                        <h4
                          style={{
                            color: "#fff",
                            textTransform: "capitalize",
                            paddingRight: "10px",
                          }}
                        >
                          {name}
                        </h4>
                        <img
                          src={imageUrlName}
                          style={{
                            width: "40px",
                            height: "40px",
                            opacity: "0.8",
                            borderRadius: "16%",
                            border: "2px solid #fff",
                          }}
                          alt="Profile"
                        />
                      </div>

                      {/* Background Image */}
                      <img
                        //@ts-ignore
                        src={imagesData[index]?.imageUrl}
                        onLoad={handleImageLoad}
                        alt="Card Background"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          zIndex: 0,
                          position: "relative",
                          top: 0,
                          left: 0,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#000",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          display: "block",
                          borderRadius: "5px",
                          marginRight: "10px",
                        }}
                      >
                        edit
                      </button>

                      <button
                        onClick={() => handleDownload(index)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#ff7043",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          display: "block",
                          borderRadius: "5px",
                        }}
                      >
                        Download Card
                      </button>
                      <button
                        onClick={() =>
                          handleWhatsappShare({
                            title: image?.msg || "Check this out!", // Fallback title
                            imageUrl: image.imageUrl,
                            shareUrl: window.location.href,
                          })
                        }
                        style={{
                          margin: "0 10px",
                          padding: "10px",
                          backgroundColor: "#25D366",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaWhatsapp size={20} style={{ marginRight: "5px" }} />
                        Share on WhatsApp
                      </button>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          {loading && <p>Loading...</p>}
          {error && <p>Something went wrong. Please try again.</p>}

          {/* Image Grid
      <p>{imagesData.length}</p> */}
        </Grid>
      </Grid>
    </div>
  );
};
export default ImageGallery;
