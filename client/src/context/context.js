import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SentimentAnalysisContext = createContext();
const UserContext = createContext();
const AttributesCountContext = createContext();
const DataAnalysisContext = createContext();
const TotalFeedbackContext = createContext();
const FoodFeedbackQualityContext = createContext();
const AuthContext = createContext();
const ThemeModeContext = createContext();

const Provider = ({ children }) => {
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [userData, setUserData] = useState([]);
  const [attributesCount, setAttributesCount] = useState([]);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState({
    rating: 0,
    totalFeedback: 0,
  });
  const [foodFeedback, setFoodFeedback] = useState([]);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('dark');
  const [ hotelId, setHotelId ] = useState(null);
  const [ hotelList, setHotelList ] =  useState([]);

  useEffect(() => {
    fetchUserData();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    // Check if hotelId is not null before fetching data
    if (hotelId !== null) {
      fetchFoodFeedbackStats(hotelId);        //HIT ROUTE:1 
      fetchTotalFeedback(hotelId);            //HIT ROUTE:2
      fetchSentimentAnalysisData(hotelId);    //HIT ROUTE:3
      fetchDataAnalysis(hotelId);             //HIT ROUTE:4
      fetchAttributesCount(hotelId);          //HIT ROUTE:5
    }
  }, [hotelId]);
  useEffect(()=>{
    fetchRestaurantData();
  },[]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    console.log("login: I got call", token);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const fetchFoodFeedbackStats = async (hotelID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/foodqualitystats?hotelID=${hotelID}`
      );
      const data = response.data.convertedData;
      setFoodFeedback(data);
    } catch (error) {
      console.error("Error fetching Food feedback stats:", error);
      setFoodFeedback([]); // Set default value for foodFeedback if error occurs
    }
  };

  const fetchTotalFeedback = async (hotelID) => {
    try {
      const response = await axios.get(`http://localhost:8000/totalrating?hotelID=${hotelID}`);
      const data = response.data;
      setTotalFeedback(data);
    } catch (error) {
      console.error("Error fetching total feedback:", error);
      setTotalFeedback({ rating: 0, totalFeedback: 0 }); // Set default value for totalFeedback if error occurs
    }
  };

  const fetchSentimentAnalysisData = async (hotelID) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sentiment?hotelID=${hotelID}`);
      const data = response.data;
      setSentimentAnalysis(data);
    } catch (error) {
      console.error("Error fetching sentiment analysis data:", error);
      setSentimentAnalysis([]); // Set default value for sentimentAnalysis if error occurs
    }
  };

  const fetchDataAnalysis = async (hotelID) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/statistics?hotelID=${hotelID}`);
      const data = response.data;
      setDataAnalysis(data);
    } catch (error) {
      console.error("Error fetching data analysis:", error);
      setDataAnalysis([]); // Set default value for dataAnalysis if error occurs
    }
  };

  const fetchAttributesCount = async (hotelID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getattributescount?hotelID=${hotelID}`);
      const data = response.data;
      setAttributesCount(data);
    } catch (error) {
      console.error("Error fetching attributes count:", error);
      setAttributesCount([]); // Set default value for attributesCount if error occurs
    }
  };

  async function fetchRestaurantData() {
    try {
      const response = await axios.get('http://localhost:8000/restaurants');
      setHotelList(response.data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setHotelList([]); // Set default value for hotelList if error occurs
    }
  }

  const fetchUserData = async () => {
    try {
      // Replace 'YOUR_USER_API_ENDPOINT' with your actual user API endpoint
      // const response = await axios.get('YOUR_USER_API_ENDPOINT');
      // const data = response.data;
      // setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData([]); // Set default value for userData if error occurs
    }
  };

  return (
    <SentimentAnalysisContext.Provider value={{ sentimentAnalysis }}>
      <UserContext.Provider value={{ userData }}>
        <AttributesCountContext.Provider value={{ attributesCount }}>
          <DataAnalysisContext.Provider value={{ dataAnalysis }}>
            <TotalFeedbackContext.Provider value={{ totalFeedback }}>
              <FoodFeedbackQualityContext.Provider value={{ foodFeedback }}>
                <AuthContext.Provider
                  value={{ user, isAuthenticated, login, logout,hotelList,setHotelId }}
                >
                  <ThemeModeContext.Provider value={{mode, setMode}}>{children}
                  </ThemeModeContext.Provider>
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
const useFoodFeedbackQualityContext = () =>
  useContext(FoodFeedbackQualityContext);
const useAuth = () => useContext(AuthContext);
const useSetMode = () => useContext(ThemeModeContext);

export {
  Provider,
  useUserContext,
  useAttributesCount,
  useDataAnalysisContext,
  useSentimentAnalysisContext,
  useTotalFeedbackContext,
  useFoodFeedbackQualityContext,
  useAuth,
  useSetMode,
};
