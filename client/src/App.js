import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HotelsList from "./pages/HotelsList";
import FeedbackPage from "./pages/FeedbackPage";
import { Provider } from "./context/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
          <ToastContainer/>
        <Provider>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/hotellist" element={<HotelsList />}></Route>
              <Route path="/feedbackpage" element={<FeedbackPage />}></Route>
            </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
