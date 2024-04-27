import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SentimentAnalysisContext = createContext();
const UserContext = createContext();
const AttributesCountContext = createContext();
const DataAnalysisContext = createContext();
const TotalFeedbackContext = createContext();
const FoodFeedbackQualityContext = createContext();
const AuthContext = createContext();



const Provider = ({ children }) => {
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [userData, setUserData] = useState([]);
  const [attributesCount, setAttributesCount] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState({
    rating : 0,
    totalFeedback:0
  });
  const [ foodFeedback,setFoodFeedback] = useState([]); 
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchSentimentAnalysisData();
    fetchUserData();
    fetchAttributesCount();
    fetchDataAnalysis();
    fetchTotalFeedback();
    fetchFoodFeedbackStats();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    // Check if there's a token stored in local storage
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      // If there's a token, set the initial authentication state
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    console.log("login: I got call", token);
    // Remove past user data and token
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  
    setUser(userData);
    setIsAuthenticated(true);
    // You can also store user data in localStorage for persistent login
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove stored user data and token
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

const fetchFoodFeedbackStats = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/foodqualitystats");
    const data = response.data.convertedData;
    setFoodFeedback(data);
  } catch (error) {
    console.error("Error fetching Food feedback stats:", error);
  }
};
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
              <FoodFeedbackQualityContext.Provider value={{foodFeedback}}>
              <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
              {children}
              </AuthContext.Provider>
              </FoodFeedbackQualityContext.Provider>
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
const useFoodFeedbackQualityContext = () => useContext(FoodFeedbackQualityContext);
const useAuth = () => useContext(AuthContext);

export {
  Provider,
  useUserContext,
  useAttributesCount,
  useDataAnalysisContext,
  useSentimentAnalysisContext,
  useTotalFeedbackContext,
  useFoodFeedbackQualityContext,
 useAuth
};
