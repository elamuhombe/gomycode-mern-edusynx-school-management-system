import React, { useState } from "react";
import { TextField } from "@mui/material";
import useSubmitForm from "./../../hooks/useSubmitForm"

const defaultFormData = {
  names: "",
  phoneNumber: "",
  email: "",
  message: ""
};
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  

  const { error, submitForm } = useSubmitForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Log formData object
      const result = await submitForm("http://localhost:5100/sendEmail", "POST", formData);
      console.log("Result:", result);
      // Reset form data after successful submission if needed
      setFormData(defaultFormData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex mt-8">
      <form className="flex flex-col flex-1 gap-4" onSubmit={handleSubmit}>
        <h3 className="text-xl font-600">Get In Touch</h3>
        <p>Please feel free to contact us if you have any questions, comments, or inquiries. We'd love to hear from you!</p>
        <div className="flex flex-1 flex-col w-80">
          <TextField id="names" label="Names" variant="standard" name="names" value={formData.names} onChange={handleChange} />
          <TextField id="phoneNumber" label="Phone Number" variant="standard" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <TextField id="email" label="Email Address" variant="standard" name="email" value={formData.email} onChange={handleChange} />
          <TextField id="message" label="Message" variant="standard" name="message" value={formData.message} onChange={handleChange} multiline rows={4} />
        </div>
        <button className=" bg-red-400 w-60 text-white font-bold py-2 px-4 rounded-full" type="submit">
  Submit
</button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
