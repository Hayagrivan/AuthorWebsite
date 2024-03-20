import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./pages/home/home.js";
import About from "./pages/about/about.js";
import Books from "./pages/books/books.js";
import BookDetailPage from "./pages/bookdetailpage/bookdetailpage.js";
import Login from "./pages/login/login.js";
import Signup from "./pages/signup/signup.js";
import Profile from "./pages/profilepage/profilepage.js";
// Import Provider from react-redux to provide the Redux store to the app
import { Provider } from "react-redux";
// Import your Redux store
import store from "./redux/store"; // Make sure to replace this with your actual store setup

const App = () => {
  return (
    // Provide the Redux store to the entire application
    <Provider store={store}>
      <Router>
        {/* Header component */}
        <Header />

        {/* Define routes using React Router */}
        <Routes>
          {/* Public routes accessible to all users */}
          <Route path="/about" element={<About />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />

          {/* Member routes accessible to authenticated members */}
          <Route
            path="/member/*"
            element={
              <Routes>
                <Route path="/:id/profile" element={<Profile />} />
                <Route path="/:id/about" element={<About />} />
                <Route path="/:id/books/:id" element={<BookDetailPage />} />
                <Route path="/:id/books" element={<Books />} />
                <Route path="/:id/" element={<Home />} />
              </Routes>
            }
          />

          {/* Admin routes accessible to authenticated administrators */}
          <Route
            path="/admin/*"
            element={
              <Routes>
                <Route path="/:id/about" element={<About />} />
                <Route path="/:id/books/:id" element={<BookDetailPage />} />
                <Route path="/:id/books" element={<Books />} />
                <Route path="/:id/profile" element={<Profile />} />
                <Route path="/:id/" element={<Home />} />
              </Routes>
            }
          />
        </Routes>

        {/* Footer component */}
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
