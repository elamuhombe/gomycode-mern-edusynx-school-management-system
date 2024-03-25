import React from 'react';
import CTAButton from './CTAButton';

const Hero: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row">
        <div className="flex-1">
          <h1 className="text-2xl font-lato font-bold mt-8">Edusynx School Management System, where education meets innovation!</h1>
          <p className="mt-4">Are you tired of the old-fashioned administrative hassles that come with managing a school? Look no further! Our cutting-edge platform is designed to streamline every aspect of school management, from student enrollment to academic performance tracking.</p>
          <hr className="w-full mt-4 mb-4"></hr>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Benefits of Edusynx</h4>
          <div className="flex flex-wrap">
            <div className="flex-1">
              <ul className="bullet pb-2 h-4 md:h-8">Centralized Data Management</ul><br></br>
              <ul className="bullet h-4 md:h-8">Efficient Administration</ul><br></br>
              <ul className="bullet h-4 md:h-8">Automated Attendance Tracking</ul><br></br>
              <ul className="bullet h-4  md:h-8 ">Enhanced Parental Involvement</ul>
            </div>
            <div className="flex-1">
              <ul className="bullet h-4 md:h-8">Improved Communication</ul><br></br>
              <ul className="bullet h-4 md:h-8">Data Analysis and Reporting</ul><br></br>
              
              <ul className="bullet h-4 md:h-8">Accurate Fee Management</ul><br></br>
            </div>
          </div>
          <CTAButton text="Click Me" onClick={handleClick} />
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/images/school-software.png" alt="School System" />
        </div>
      </section>
    </div>
  );
}

export default Hero;
