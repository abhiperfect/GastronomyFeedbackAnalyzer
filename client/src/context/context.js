// context.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SentimentAnalysisContext = createContext();
const UserContext = createContext();
const AttributesCount = createContext();
const DataAnalysisContext = createContext();

const Provider = ({ children }) => {

  const [userData, setUserData] = useState([]);
  const [attributesCount, setAttributsCount] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [ sentimentAnalysis, setSentimentAnalysis ] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the backend
    fetchSentimentAnalysisData();
    // Fetch user data from the backend
    fetchUserData();
    //Fetch attributes count
    fetchAttributesCount();
    //Fetch Coffecient variations
    fetchDataAnalysis();

    
  }, []);

  const fetchSentimentAnalysisData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sentiment");
      const data = response.data;
      setSentimentAnalysis(data);
      console.log("TT", sentimentAnalysis);
      setSentimentAnalysis(prevData => {
        console.log("Sentiment Analysis 3:", prevData);
        console.log("Sentiment Analysis 4:", data); // This will reflect the updated state
        return data;
      });
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
    <SentimentAnalysisContext.Provider value={{ sentimentAnalysis }}>
      <UserContext.Provider value={{ userData }}>
        <AttributesCount.Provider value={{ attributesCount }}>
          <DataAnalysisContext.Provider value={{ dataAnalysis }}>
            {children}
          </DataAnalysisContext.Provider>
        </AttributesCount.Provider>
      </UserContext.Provider>
    </SentimentAnalysisContext.Provider>
  );
};

const useSentimentAnalysisContext = () => useContext(SentimentAnalysisContext);
const useUserContext = () => useContext(UserContext);
const useAttributesCount = () => useContext(AttributesCount);
const useDataAnalysisContext = () => useContext(DataAnalysisContext);

export {
  Provider,
  useSentimentAnalysisContext,
  useUserContext,
  useAttributesCount,
  useDataAnalysisContext,
};
