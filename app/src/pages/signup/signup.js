import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm.js";
import "./signup.css";

const Signup = () => {
  return (
    // Main container for the signup page
    <main className="signup">
      {/* Container for the signup form */}
      <div className="signup-container">
        {/* Render the signup form component */}
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
