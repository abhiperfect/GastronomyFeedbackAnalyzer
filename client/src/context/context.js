import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SentimentAnalysisContext = createContext();
const UserContext = createContext();
const AttributesCountContext = createContext();
const DataAnalysisContext = createContext();
const TotalFeedbackContext = createContext();

const Provider = ({ children }) => {
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [userData, setUserData] = useState([]);
  const [attributesCount, setAttributesCount] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState(null);

  useEffect(() => {
    fetchSentimentAnalysisData();
    fetchUserData();
    fetchAttributesCount();
    fetchDataAnalysis();
    fetchTotalFeedback();
  }, []);

  const fetchTotalFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:8000/totalrating");
      const data = response.data;
      setTotalFeedback(data);
    } catch (error) {
      console.error("Error fetching total feedback:", error);
    }
  };

  const fetchSentimentAnalysisData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sentiment");
      const data = response.data;
      setSentimentAnalysis(data);
    } catch (error) {
      console.error("Error fetching sentiment analysis data:", error);
    }
  };

  const fetchDataAnalysis = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/statistics");
      const data = response.data;
      setDataAnalysis(data);
    } catch (error) {
      console.error("Error fetching data analysis:", error);
    }
  };

  const fetchAttributesCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/getattributescount"
      );
      const data = response.data;
      setAttributesCount(data);
    } catch (error) {
      console.error("Error fetching attributes count:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      // Replace 'YOUR_USER_API_ENDPOINT' with your actual user API endpoint
      // const response = await axios.get('YOUR_USER_API_ENDPOINT');
      // const data = response.data;
      // setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SentimentAnalysisContext.Provider value={{ sentimentAnalysis }}>
      <UserContext.Provider value={{ userData }}>
        <AttributesCountContext.Provider value={{ attributesCount }}>
          <DataAnalysisContext.Provider value={{ dataAnalysis }}>
            <TotalFeedbackContext.Provider value={{ totalFeedback }}>
              {children}
            </TotalFeedbackContext.Provider>
          </DataAnalysisContext.Provider>
        </AttributesCountContext.Provider>
      </UserContext.Provider>
    </SentimentAnalysisContext.Provider>
  );
};

const useSentimentAnalysisContext = () => useContext(SentimentAnalysisContext);
const useUserContext = () => useContext(UserContext);
const useAttributesCount = () => useContext(AttributesCountContext);
const useDataAnalysisContext = () => useContext(DataAnalysisContext);
const useTotalFeedbackContext = () => useContext(TotalFeedbackContext);

export {
  Provider,
  useUserContext,
  useAttributesCount,
  useDataAnalysisContext,
  useSentimentAnalysisContext,
  useTotalFeedbackContext,
};
