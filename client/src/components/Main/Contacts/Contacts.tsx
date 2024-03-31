import React, { useState } from "react";
import { TextField } from "@mui/material";
import CTAButton from "../../shared/CTAButton";

const Contacts: React.FC = () => {
  // State variables to store form input values and validation errors
  const [names, setNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Event handlers to update state variables when form inputs change
  const handleNamesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNames(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!names.trim()) {
      errors.names = "Names field is required";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number field is required";
    }
    if (!emailAddress.trim()) {
      errors.emailAddress = "Email Address field is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      errors.emailAddress = "Email Address is invalid";
    }
    if (!message.trim()) {
      errors.message = "Message field is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      try {
        // Send form data to backend service
        const response = await fetch("./api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ names, phoneNumber, emailAddress, message }),
        });
        // Display success message if email sent successfully
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          // Throw error if email sending failed
          throw new Error("Failed to send email");
        }
      } catch (error) {
        // Log and display error message if an error occurs
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again later.");
      }
    }
  };

  return (
    <div className="flex mt-8">
      {/* Form to collect user input */}
      <form className="flex flex-col flex-1 gap-4" onSubmit={handleSubmit}>
        <h3 className="text-xl font-600">Get In Touch</h3>
        <p>Please feel free to contact us if you have any questions, comments, or inquiries. We'd love to hear from you!</p>
        <div className="flex flex-1 flex-col w-80">
          {/* Text fields for user input */}
          <TextField id="names" label="Names" variant="standard" value={names} onChange={handleNamesChange} error={!!errors.names} helperText={errors.names} />
          <TextField id="phoneNumber" label="Phone Number" variant="standard" value={phoneNumber} onChange={handlePhoneNumberChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
          <TextField id="emailAddress" label="Email Address" variant="standard" value={emailAddress} onChange={handleEmailAddressChange} error={!!errors.emailAddress} helperText={errors.emailAddress} />
          <TextField id="message" label="Message" variant="standard" value={message} onChange={handleMessageChange} multiline rows={4} error={!!errors.message} helperText={errors.message} />
        </div>
        <div>
          {/* Submit button */}
          <CTAButton text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Contacts;
