import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [username, setUsername] = useState(""); // State for username input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password input
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State to track password match error
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [usernameAvailable, setUsernameAvailable] = useState(true); // State to track username availability
  const [emailExists, setEmailExists] = useState(true); // State to track existing email
  const [emailFormatValid, setEmailFormatValid] = useState(true); // State to check email validity
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  }); // State to track password strength
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // State to track if password input is focused
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const [name, setName] = useState(""); // State for name input
  const [age, setAge] = useState(); // State for age input
  const [gender, setGender] = useState(""); // State for gender selection
  const [city, setCity] = useState(""); // State for city input
  const [state, setState] = useState(""); // State for state input
  const [country, setCountry] = useState(""); // State for country input

  useEffect(() => {
    // Function to check username availability
    const checkUsernameAvailability = async () => {
      try {
        const response = await fetch(
          `/api/authentication/check-username?username=${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsernameAvailable(data.available);
        } else {
          throw new Error("Failed to check username availability");
        }
      } catch (error) {
        console.error("Error checking username availability:", error.message);
      }
    };

    // Call the function to check username availability whenever the username state changes
    checkUsernameAvailability();
  }, [username]); // Trigger the effect whenever username changes

  useEffect(() => {
    // Function to validate email format
    const checkEmailFormat = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (email.trim() !== "") {
      setEmailFormatValid(checkEmailFormat());
    }
  }, [email]); // Trigger the effect whenever email changes

  useEffect(() => {
    // Function to check if email already exists
    const checkEmailExists = async () => {
      try {
        const response = await fetch(
          `/api/authentication/check-email?email=${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setEmailExists(data.exists);
        } else {
          throw new Error("Failed to check email exists");
        }
      } catch (error) {
        console.error("Error checking email exists:", error.message);
      }
    };

    checkEmailExists();
  }, [email]); // Trigger the effect whenever email changes

  // Event handler for username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Event handler for email input change
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (newEmail.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailFormatValid(emailRegex.test(newEmail));
    } else {
      setEmailFormatValid(true); // Reset to true when email field is empty
    }
  };

  // Event handler for password input change
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordMatchError(confirmPassword && newPassword !== confirmPassword);
    validatePassword(newPassword);
  };

  // Event handler for confirm password input change
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatchError(password !== newConfirmPassword);
  };

  // Function to toggle visibility of password
  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle visibility of confirm password
  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordStrength(validations);
  };

  // Event handler for name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Event handler for age input change
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  // Event handler for gender selection change
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // Event handler for city input change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Event handler for state input change
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  // Event handler for country input change
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form validation
    if (
      !usernameAvailable ||
      !emailFormatValid ||
      emailExists ||
      passwordMatchError ||
      !passwordStrength.minLength ||
      !passwordStrength.upperCase ||
      !passwordStrength.lowerCase ||
      !passwordStrength.number ||
      !passwordStrength.specialChar ||
      !name.trim() ||
      !age ||
      age < 1 || // Added validation to ensure age is a positive number
      !gender ||
      gender === "" || // Added validation to ensure gender is selected
      !city.trim() ||
      !state.trim() ||
      !country.trim()
    ) {
      // Don't submit if any of the validations fail
      return;
    }

    try {
      // Send signup request to backend
      const response = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          name,
          age,
          gender,
          city,
          country,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json(); // Extract user ID from response
      console.log("The response from backend is: ", JSON.stringify(data));
      const { _id } = data;
      console.log("The id is: ", _id);
      setSignupSuccess(true);
      console.log("Signup successful");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // Render signup success message if signup is successful
  if (signupSuccess) {
    return (
      <div className="signup-success">
        <h2>Signup Successful!</h2>
        <p>
          Thank you & Congratulations on becoming a member! You can now proceed
          to{" "}
          <a
            href={`/login`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate(`/login`); // Navigate to profile page
            }}
          >
            Login
          </a>
        </p>
      </div>
    );
  }

  // Render signup form
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Member Sign Up</h1>
      <div className="signupForm-field-container">
        {/* Username input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupFor-username">Username</label>
          <input
            type="text"
            id="signupForm-username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          {/* Display username availability message */}
          {!usernameAvailable && (
            <p className="error-message">
              Username not available as it already exists
            </p>
          )}
        </div>
        {/* Email input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupFor-email">Email Address</label>
          <input
            type="email"
            id="signupForm-email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {/* Display email validation messages */}
          {!emailFormatValid && (
            <p className="error-message">Please enter a valid email address</p>
          )}
          {emailFormatValid && emailExists && (
            <p className="error-message">
              An account with this email already exists. Please{" "}
              <a href="/login">log in</a>.
            </p>
          )}
        </div>
        {/* Password input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-pwd">Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="signupForm-pwd"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            {/* Toggle button to show/hide password */}
            <span
              className="password-toggle-icon"
              onClick={handlePasswordVisibilityToggle}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {/* Display password strength requirements when the password field is focused */}
          {isPasswordFocused && (
            <div className="password-strength-container">
              <p>Password must contain:</p>
              <ul>
                <li
                  className={passwordStrength.minLength ? "valid" : "invalid"}
                >
                  Minimum 8 characters
                </li>
                <li
                  className={passwordStrength.upperCase ? "valid" : "invalid"}
                >
                  At least one uppercase letter
                </li>
                <li
                  className={passwordStrength.lowerCase ? "valid" : "invalid"}
                >
                  At least one lowercase letter
                </li>
                <li className={passwordStrength.number ? "valid" : "invalid"}>
                  At least one number
                </li>
                <li
                  className={passwordStrength.specialChar ? "valid" : "invalid"}
                >
                  At least one special character
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Confirm Password input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-confirm-pwd">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="signupForm-confirm-pwd"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {/* Toggle button to show/hide confirm password */}
            <span
              className="password-toggle-icon"
              onClick={handleConfirmPasswordVisibilityToggle}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>
          {/* Display error message if passwords do not match */}
          {passwordMatchError && (
            <p className="error-message">Passwords do not match</p>
          )}
        </div>

        {/* Name input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-name">Name</label>
          <input
            type="text"
            id="signupForm-name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Age input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-age">Age</label>
          <input
            type="number"
            id="signupForm-age"
            min="1" /* Added min attribute to allow only positive numbers */
            value={age} /* Assuming you have state for age */
            onChange={handleAgeChange}
            required
          />
        </div>

        {/* Gender selection dropdown */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-gender">Gender</label>
          <select
            id="signupForm-gender"
            value={gender} /* Assuming you have state for gender */
            onChange={handleGenderChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Country input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-country">Country</label>
          <input
            type="text"
            id="signupForm-country"
            value={country}
            onChange={handleCountryChange}
            required
          />
        </div>

        {/* State input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-state">State</label>
          <input
            type="text"
            id="signupForm-state"
            value={state}
            onChange={handleStateChange}
            required
          />
        </div>

        {/* City input field */}
        <div className="signupForm-input-container">
          <label htmlFor="signupForm-city">City</label>
          <input
            type="text"
            id="signupForm-city"
            value={city}
            onChange={handleCityChange}
            required
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="signupForm-input-container">
        <input type="submit" value="Sign-Up" />
      </div>

      {/* Link to login page */}
      <p>
        Already a member?{" "}
        <a href="/login" className="login-link">
          Log in
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
