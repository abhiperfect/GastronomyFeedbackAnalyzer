// context.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FeedbackContext = createContext();
const UserContext = createContext();
const AttributesCount = createContext();
const DataAnalysisContext = createContext();

const Provider = ({ children }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [attributesCount, setAttributsCount] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the backend
    fetchFeedbackData();
    // Fetch user data from the backend
    fetchUserData();
    //Fetch attributes count
    fetchAttributesCount();
    //Fetch Coffecient variations
    fetchDataAnalysis();

    
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sentiment");
      const data = response.data;
      console.log("Senti", data);
      setFeedbackData(data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };
const fetchDataAnalysis = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/statistics");
    const data = response.data;
    console.log("Coefficient variations:", data);
    setDataAnalysis(data); // Set dataAnalysis state
    console.log("Coefficient variations2:", data); // This won't reflect the updated state
    setDataAnalysis(prevData => {
      console.log("Coefficient variations3:", prevData);
      console.log("Coefficient variations4:", data); // This will reflect the updated state
      return data;
    });
  } catch (error) {
    console.error("Error fetching coefficient variations:", error);
  }
  
};



  const fetchAttributesCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/getattributescount"
      );
      const data = response.data;
      console.log(data);
      setAttributsCount(data);
    } catch (error) {
      console.log("Error in fetching attributes count", error);
    }
  };
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
        <AttributesCount.Provider value={{ attributesCount }}>
          <DataAnalysisContext.Provider value={{ dataAnalysis }}>
            {children}
          </DataAnalysisContext.Provider>
        </AttributesCount.Provider>
      </UserContext.Provider>
    </FeedbackContext.Provider>
  );
};

const useFeedbackContext = () => useContext(FeedbackContext);
const useUserContext = () => useContext(UserContext);
const useAttributesCount = () => useContext(AttributesCount);
const useDataAnalysisContext = () => useContext(DataAnalysisContext);

export {
  Provider,
  useFeedbackContext,
  useUserContext,
  useAttributesCount,
  useDataAnalysisContext,
};
