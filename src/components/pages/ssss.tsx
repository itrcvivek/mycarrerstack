import axios from "axios";
import React, { useEffect, useRef,useState } from 'react';
import html2canvas from 'html2canvas';
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Grid } from '@mui/material';
import './style.css';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import MetaData from "./MetaData";


const SSS = () => {
  const cardRefs = useRef([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [imageUrlName, setImage] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [motivationalArray, setMotivationalArray] = useState<any[]>([]);

  // Unsplash API Key and URL
  const API_KEY = "X3TsSPoymE11c42aygrvQ_LFGkHAYv_6c1dOZ1pg-gg";
  const API_URL = `https://api.unsplash.com/search/photos`;

  const christmasData = [
    { id: 1, message: "क्रिसमस का यह त्यौहार आपके जीवन में खुशियों की बौछार लाए। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 2, message: "आपको और आपके परिवार को क्रिसमस की ढेर सारी शुभकामनाएं। खुशहाल क्रिसमस!", cat: "christmas wishes" },
    { id: 3, message: "क्रिसमस के इस विशेष अवसर पर आपके जीवन में प्यार और खुशी की भरपूरता हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 4, message: "आपका जीवन क्रिसमस के जादू से भरा हो। सुखद क्रिसमस!", cat: "christmas wishes" },
    { id: 5, message: "इस क्रिसमस पर आपको खुशियों और सफलता की प्राप्ति हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 6, message: "क्रिसमस की रोशनी आपके जीवन को उज्ज्वल करे। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 7, message: "इस क्रिसमस पर प्रेम, शांति और आनंद आपके साथ हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 8, message: "आपका हर सपना इस क्रिसमस पर साकार हो। सुखद क्रिसमस!", cat: "christmas wishes" },
    { id: 9, message: "क्रिसमस की खुशियों का यह त्यौहार आपके जीवन को रोशन करे। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 10, message: "आपकी क्रिसमस बहुत ही खास हो और आपके दिल में हमेशा खुशी रहे। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 11, message: "इस क्रिसमस पर आपके जीवन में खुशियों और प्रेम का संचार हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 12, message: "आपको और आपके प्रियजनों को क्रिसमस की ढेर सारी शुभकामनाएं। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 13, message: "इस क्रिसमस पर प्रेम और भाईचारे का संदेश फैले। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 14, message: "आपका क्रिसमस प्यार और खुशियों से भरा हो। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 15, message: "क्रिसमस की खुशियाँ आपके जीवन को सजाएं। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 16, message: "इस विशेष दिन पर आपके घर में खुशी और शांति का माहौल हो। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 17, message: "आपकी क्रिसमस बहुत खास हो और आपको हर पल खुशी मिले। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 18, message: "क्रिसमस का यह पर्व आपके जीवन में सुख और समृद्धि लाए। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 19, message: "आपको और आपके परिवार को क्रिसमस की ढेर सारी शुभकामनाएं। सुखद क्रिसमस!", cat: "christmas wishes" },
    { id: 20, message: "क्रिसमस की इस रात आपका जीवन खुशियों से भरा रहे। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 21, message: "इस क्रिसमस पर आपके जीवन में प्रेम और शांति की बहार हो। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 22, message: "आपके घर में क्रिसमस की रोशनी और खुशियों का संचार हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 23, message: "इस क्रिसमस पर आपके जीवन में सभी खुशियाँ बरसें। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 24, message: "आपकी क्रिसमस इस बार विशेष और शानदार हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 25, message: "क्रिसमस का यह त्यौहार आपको प्यार और खुशियों से भर दे। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 26, message: "आपके जीवन में क्रिसमस की यह रात अद्वितीय हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 27, message: "क्रिसमस की यह बेला आपके जीवन को खुशियों से सजाए। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 28, message: "आपका क्रिसमस प्रेम, शांति और भाईचारे से भरा हो। शुभ क्रिसमस!", cat: "christmas wishes" },
    { id: 29, message: "इस क्रिसमस पर आपके जीवन में सुख और शांति का माहौल हो। हैप्पी क्रिसमस!", cat: "christmas wishes" },
    { id: 30, message: "क्रिसमस का यह त्यौहार आपके जीवन में रंग और खुशियों की बौछार लाए। शुभ क्रिसमस!", cat: "christmas wishes" }
];

const diwaliData = [
  { id: 1, message: "दीवाली की रौशनी आपके जीवन को खुशियों से भर दे। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 2, message: "दीपावली का यह पर्व आपके जीवन में सुख और समृद्धि लाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 3, message: "इस दीवाली पर आपके घर में प्रेम और शांति का संचार हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 4, message: "दीपों की इस माला में आपके जीवन की हर रात रौशन हो। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 5, message: "इस दीवाली पर आपके जीवन में नए सपने और खुशियाँ आएं। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 6, message: "दीपावली का यह त्यौहार आपके जीवन में खुशियों की बौछार लाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 7, message: "इस दीपावली पर आपके जीवन में खुशियों का आगमन हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 8, message: "दीपों की रोशनी आपके जीवन को हमेशा के लिए उज्ज्वल करे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 9, message: "दीपावली की रौनक आपके जीवन को नयी दिशा दे। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 10, message: "दीवाली की मिठास आपके रिश्तों में हमेशा घुली रहे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 11, message: "इस दीवाली पर आपके जीवन में प्रेम और भाईचारे का संचार हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 12, message: "दीपों की इस माला से आपका जीवन हर दिन नयी रौशनी से भर जाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 13, message: "इस दीपावली पर आपके जीवन में सुख और समृद्धि का आगमन हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 14, message: "दीपों की रोशनी आपके जीवन को नयी दिशा दे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 15, message: "दीवाली का यह त्यौहार आपके जीवन में प्रेम और खुशी का संचार करे। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 16, message: "दीपों की यह माला आपके जीवन को नयी ऊँचाइयों पर ले जाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 17, message: "दीपावली का यह त्यौहार आपके जीवन में हर दिन खुशियाँ लाए। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 18, message: "दीपों की यह रौशनी आपके जीवन में प्रेम और शांति का संचार करे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 19, message: "इस दीपावली पर आपके जीवन में सुख और समृद्धि का माहौल हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 20, message: "दीपों की यह माला आपके जीवन में हर दिन खुशियाँ लाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 21, message: "दीवाली की इस रौनक में आपके जीवन की हर रात रौशन हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 22, message: "दीपों की इस माला से आपका जीवन हर दिन नयी ऊँचाइयों पर जाए। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 23, message: "इस दीपावली पर आपके जीवन में प्रेम और खुशियों की बहार हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 24, message: "दीपों की रौशनी आपके जीवन में खुशियों का संचार करे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 25, message: "दीपावली की यह रात आपके जीवन को नयी ऊँचाइयों पर ले जाए। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 26, message: "दीवाली की इस रौनक में आपके जीवन में प्रेम और शांति का संचार हो। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 27, message: "दीपावली का यह त्यौहार आपके जीवन को खुशियों से भर दे। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 28, message: "दीवाली की रौशनी आपके जीवन को नयी दिशा दे। हैप्पी दीवाली!", cat: "diwali wishes" },
  { id: 29, message: "इस दीपावली पर आपके जीवन में सुख और समृद्धि का माहौल हो। शुभ दीवाली!", cat: "diwali wishes" },
  { id: 30, message: "दीवाली का यह त्यौहार आपके जीवन में हर दिन नयी खुशियाँ लाए। हैप्पी दीवाली!", cat: "diwali wishes" }
];


  const NewYearsWishesArray = [
    // New Year Wishes (1-30)
    { id: 1, message: "नव वर्ष आपके जीवन में खुशियों और समृद्धि की बौछार लाए। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 2, message: "नया साल आपके जीवन में नई खुशियाँ और सफलताएँ लाए। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 3, message: "इस नव वर्ष पर आपके सपने साकार हों। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 4, message: "नव वर्ष में हर दिन खुशियों से भरा हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 5, message: "इस नए साल में आपके जीवन में सभी इच्छाएं पूरी हों। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 6, message: "आपका नया साल खुशियों और शांति से भरा हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 7, message: "इस नव वर्ष पर आपके जीवन में नई शुरुआत हो। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 8, message: "नव वर्ष की शुभकामनाएं! आपके जीवन में खुशियों की भरपूरता हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 9, message: "नए साल की शुरुआत नई उम्मीदों के साथ करें। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 10, message: "इस नए साल में आपके सभी सपने सच हों। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 11, message: "आपका जीवन नव वर्ष में खुशियों और प्रेम से भरा रहे। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 12, message: "नए साल की यह सुबह आपके जीवन में नई रोशनी लाए। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 13, message: "इस नव वर्ष पर आपके जीवन में प्रेम और खुशी का संचार हो। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 14, message: "आपका हर दिन इस नए साल में खास हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 15, message: "नव वर्ष का यह समय आपको नयी खुशियों से भर दे। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 16, message: "इस नए साल में आपके जीवन में नई खुशियाँ और सफलताएँ हों। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 17, message: "आपके जीवन में इस नव वर्ष पर शांति और समृद्धि का संचार हो। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 18, message: "नए साल में आपके साथ हमेशा खुशी और सफलता रहे। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 19, message: "इस नए साल पर आपके जीवन में सुख और समृद्धि की बहार हो। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 20, message: "आपका नव वर्ष हर दिन को खास बनाए। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 21, message: "नव वर्ष की यह बेला आपके जीवन में खुशियों की भरपूरता लाए। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 22, message: "इस नव वर्ष में आपके सपने सच हों और खुशियों का संचार हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 23, message: "नए साल का यह पर्व आपके जीवन में सुख और समृद्धि लाए। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 24, message: "इस नए साल में आपके जीवन का हर पल खुशी से भरा हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 25, message: "आपकी खुशियों का यह नया साल आपको जीवन में सफलता दिलाए। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 26, message: "इस नव वर्ष पर आपके जीवन में प्यार और दोस्ती का संचार हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 27, message: "नव वर्ष आपके जीवन में खुशियों और सफलता की लहर लाए। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 28, message: "आपका जीवन इस नए साल में रंगीन और खुशहाल हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    { id: 29, message: "इस नए साल पर आपके मन में नए विचार और योजनाएं जन्म लें। शुभ नव वर्ष!", cat: "new year wishes" },
    { id: 30, message: "नव वर्ष की शुभकामनाएं! आपके जीवन में खुशियों की बौछार हो। हैप्पी न्यू ईयर!", cat: "new year wishes" },
    
  ];
  
  

  
  const categories = [
    // { name: "नव वर्ष की शुभकामनाएँ", query: "new year wishes" },
    // { name: "दीवाली की शुभकामनाएँ", query: "diwali wishes" },
    // { name: "Motivational", query: "motivational" },
    // { name: "Inspiration", query: "inspiration" },
    // { name: "Success", query: "success" },
    // { name: "Positive Vibes", query: "positive vibes" },
    // { name: "Hard Work", query: "hard work" },
    // { name: "Self Improvement", query: "self improvement" },
    // { name: "Determination", query: "determination" },

    // Festival Wishes
    { name: "Christmas Wishes", query: "christmas wishes" },
    { name: "New Year Wishes", query: "new year wishes" },
    { name: "Diwali Wishes", query: "diwali wishes" },
    {name:"motivational", query:"motivational"}
    // { name: "Eid Wishes", query: "eid wishes" },
    // { name: "Thanksgiving Wishes", query: "thanksgiving wishes" },
    // { name: "Holi Wishes", query: "holi wishes" },
    // { name: "Easter Wishes", query: "easter wishes" },
    // { name: "Valentine's Day Wishes", query: "valentine's day wishes" },
    // { name: "Halloween Wishes", query: "halloween wishes" },
    // { name: "Independence Day Wishes", query: "independence day wishes" },

    // Other General Categories
    // { name: "Friendship", query: "friendship" },
    // { name: "Love", query: "love" },
    // { name: "Happiness", query: "happiness" },
    // { name: "Family", query: "family" },
    // { name: "Gratitude", query: "gratitude" },
    // { name: "Joy", query: "joy" },
    // { name: "Celebration", query: "celebration" },
  ];

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
      const response:any = await axios.get(`https://randomuser.me/api/`);
      
      functFake(response.data.results)
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      QuiteAll(intervalId); 
    }, 1000); // Calls the API every 1 second
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const QuiteAll = async (intervalId: NodeJS.Timeout) => {
    setError(false);

    try {
      const response:any = await axios.get(`https://hindi-quotes.vercel.app/random/motivational`);
      setMotivationalArray((prevData) => {
        const updatedData = [
          ...prevData, 
          { name: response.data.quote, query: "motivational" } // Add in the required format
        ];
        
        // Stop the interval if 30 quotes have been collected
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
 const functFake=(data:any)=>{
  setDataArray((prevData) => [...prevData, ...data]);
  }


  const searchImages = async (searchTerm:any) => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(API_URL, {
        params: {
          query: searchTerm,
          client_id: API_KEY,
          per_page: 30, // Number of results per page
        },
      });
      
      funct(response.data.results, searchTerm)
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };


  const funct=(data:any, searchTerm:any)=>{

    let ggg = data.map((item:any, index:any)=>{
          return {
            id:index+1,
            imageUrl: item.urls.small,
            cat:searchTerm,
              }
        })
  
     setImages(ggg);
     
     searchQuotes(searchTerm, ggg)
    
  }
  const searchQuotes = (query: any, allData: any) => {
    let dataArray = [];
  
    // Determine which dataset to use based on the query
    switch (query) {
      case "diwali wishes":
        dataArray = diwaliData;
        break;
      case "christmas wishes":
        dataArray = christmasData;
        break;
      case "new year wishes":
        dataArray = NewYearsWishesArray;
        break;
      case "motivational":
        dataArray = motivationalArray;
        break;
      default:
        console.log("No matching data for the query");
        return; // Exit the function if no dataset matches
    }
    const resultArray: any = []; // Create a new array for the results
    dataArray.forEach((itemkey: any) => {
      if (query === itemkey.cat) {
        const matchedImage: any = allData.find(
          (element: any) => element.id === itemkey.id
        );
  
        if (matchedImage) {
          resultArray.push({
            imageUrl: matchedImage.imageUrl, // Assuming the image URL is in allData
            msg: description!=""?description:itemkey.message, // Get the message from the current dataset
          });
        }
      }
    });
  
    console.log(resultArray); // Log the results to check if correct
    setImagesData(resultArray); // Set the images to the new array
  };
  
 
  // Handle category click
  const handleCategoryClick = (query:any) => {
    
    searchImages(query);
  
  };
 
 
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader:any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  };
  const handleDesChange = (e:any) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e:any) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // You can handle the form submission logic here, e.g., sending the data to an API
    handleCategoryClick(selectedCategory)
  };
  const handleDownload = (index:any) => {
    if (!isImageLoaded) {
      alert("Please wait until the image is fully loaded.");
      return;
    }

    const cardElement = cardRefs.current[index];
    
    // Use the useCORS and allowTaint options to enable cross-origin image rendering
    html2canvas(cardElement, { useCORS: true, allowTaint: false }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `card_image_${index + 1}.png`;
      link.click();
    }).catch((error) => {
      console.error("Canvas rendering failed: ", error);
    });
  };
  const handleImageLoad = () => {
    setIsImageLoaded(true); // Set to true once the image is loaded
  };
  const handleFacebookShare = () => {
    const shareUrl = window.location.href; // Use the current URL or generate the specific URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, '_blank');
  };

  const handleWhatsappShare = ({ title, imageUrl, shareUrl }:any) => {
    const message = `Check this out: ${title}\n${imageUrl}\n${shareUrl}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappShareUrl, '_blank');
  };
  console.log(motivationalArray)
  return (
    <div style={{margin:"20px"}}>
      
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
          <h1>Custom Wishes</h1>
     <form onSubmit={handleSubmit} className="form-container">
      <div className="form-item">
        <input
          accept="image/*"
          style={{ display: 'none' }}
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
      <img src={item.picture.large} alt={item.name.first} className="user-image" />
      <div className="user-info">
        <h3>{item.name.first} {item.name.last}</h3>
        <p>{item.email}</p>
      </div>
    </li>
  ))}
</ul>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
          {imagesData.map((image:any, index:any) => (
          <Grid item xs={12} sm={12} md={6}>
             <div>
             <MetaData title={`${name}`} description={`${image.msg}`} />
         <div 
           style={{ position: "relative", width: "100%", height: "350px", overflow:"hidden" }} 
           //@ts-ignore
           ref={(el) => (cardRefs.current[index] = el)}
         >
           {/* Top Heading */}
           <h2 
             style={{
               position: "absolute", 
               top: "0", 
               color: "#fff", 
               padding: "10px", 
               fontSize: "18px", 
               lineHeight: "24px", 
                width: '97%',
               textAlign: 'center', 
               zIndex: 1, // Ensure the heading stays on top
               backgroundColor: 'rgba(0, 0, 0, 0.5)'  // Background for better readability
             }}
           >
             {image?.msg}
           </h2>
   
           {/* User's Image and Name at the Bottom */}
           <div 
             style={{
               display: "flex", 
               position: "absolute", 
               width: "100%", 
               bottom: "10px", 
               right: "10px", 
               justifyContent: "flex-end",
               alignItems: 'center',
               zIndex: 1  // Ensure this content is on top of the background image
             }}
           >
             <h4 style={{ color: "#fff", textTransform: "capitalize", paddingRight: "10px" }}>
               {name}
             </h4>
             <img 
               src={imageUrlName} 
               style={{ 
                 width: "70px", 
                 height: "70px", 
                 borderRadius: "50%", 
                 border: "2px solid #fff" 
               }} 
               alt="Profile" 
             />
           </div>
   
           {/* Background Image */}
           <img
             src={image.imageUrl}
             onLoad={handleImageLoad} 
             alt="Card Background"
             style={{ 
               width: "100%", 
               height: "100%", 
               objectFit: "cover", 
               borderRadius: "8px",
               zIndex: 0,  // Make sure the background stays in the back
               position: "relative", 
               top: 0,
               left: 0
             }}
           />
         </div>
        
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {/* Facebook Share */}
        {/* <button 
          onClick={handleFacebookShare} 
          style={{ 
            margin: '0 10px', 
            padding: '10px', 
            backgroundColor: '#3b5998', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <FaFacebook size={20} style={{ marginRight: '5px' }} />
          Share on Facebook
        </button> */}

        {/* WhatsApp Share */}
        <button 
           onClick={()=>handleDownload(index)} 
           style={{ 
             padding: '10px 20px', 
             backgroundColor: '#ff7043', 
             color: '#fff', 
             border: 'none', 
             cursor: 'pointer',
             display: 'block',
             borderRadius: '5px', 
           }}
         >
           Download Card
         </button>
        <button 
         onClick={() => handleWhatsappShare({ 
          title: image?.msg || 'Check this out!',  // Fallback title
          imageUrl: image.imageUrl,
          shareUrl: window.location.href
        })} 
          style={{ 
            margin: '0 10px', 
            padding: '10px', 
            backgroundColor: '#25D366', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <FaWhatsapp size={20} style={{ marginRight: '5px' }} />
          Share on WhatsApp
        </button>
      </div>
       </div>
            </Grid>
           ))}
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

export default SSS;
