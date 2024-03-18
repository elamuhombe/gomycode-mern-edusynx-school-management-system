

export default function Main() {
  return (
   <div className="flex-row">
   
    {/* Hero Section */}
    <section className="flex">
      <div className="flex-1">
      <h1 className="text-2xl font-lato font-bold mt-8">Welcome to Edusynx School Management System, where education meets innovation!</h1>
    <p className="mt-4">Are you tired of the old-fashioned administrative hassles that come with managing a school? Look no further! Our cutting-edge platform is designed to streamline every aspect of school management, from student enrollment to academic performance tracking.</p>
      </div>
      <div className="flex-1 flex justify-center">
      <img src="/images/school-system.jpg" alt="school system" />


      </div>
    
    </section>

    {/* Main Features Section */}
    <section className="flex mt-8">
       <h2 className="text-2xl  text-center font-semi-bold">Main Features</h2>
     

      <div>
      <div>
      <h5>Student</h5>
     </div>
     <div>
      <h5>Teachers</h5>
     </div>
     <div>
      <h5>Attendance</h5>
     </div>
     <div>
      <h5>Accounts</h5>
     </div>
     <div>
      <h5>Parents</h5>
     </div>
     <div>
      <h5>Reports</h5>
     </div>
     <div>
      <h5>Admin</h5>
     </div>
     <div>
      <h5>Enrollment</h5>
     </div>
      </div>
     


    </section>
    
      
   </div>
  )
}
