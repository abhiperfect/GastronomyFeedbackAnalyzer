// context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackContext = createContext();
const UserContext = createContext();

const Provider = ({ children }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ atrributesCount, setAttributsCount ] = useState([]);
  useEffect(() => {
    // Fetch feedback data from the backend
    fetchFeedbackData();
    // Fetch user data from the backend
    fetchUserData();
    //Fetch attributes count
    fetchAttributesCount();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sentiment');
      const data = response.data;
      console.log("Context",data);
      setFeedbackData(data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  const fetchAttributesCount = async () =>{
    try {
      const response = await axios.get("http://localhost:8000/getattributescount");
      const data = response.data; 
      console.log(data);
      setAttributsCount(data);  
    } catch (error) {
       console.log("Error in fetching attributes count", error);
    }
  }
  const fetchUserData = async () => {
    // try {
    //   const response = await axios.get('YOUR_USER_API_ENDPOINT');
    //   const data = response.data;
    //   setUserData(data);
    // } catch (error) {
    //   console.error('Error fetching user data:', error);
    // }
  };

  return (
    <FeedbackContext.Provider value={{ feedbackData }}>
      <UserContext.Provider value={{ userData }}>
        {children}
      </UserContext.Provider>
    </FeedbackContext.Provider>
  );
};

const useFeedbackContext = () => useContext(FeedbackContext);
const useUserContext = () => useContext(UserContext);

export { Provider, useFeedbackContext, useUserContext };
