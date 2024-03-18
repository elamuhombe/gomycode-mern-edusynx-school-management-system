

export default function Header() {
  return (
    <div>
    <header className="flex justify-between items-center">
      <h1 className="text-4 font-bold text-gray-800 pb-4">Edusynx School Management System</h1>
      <nav className="flex">
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-800 hover:text-gray-600">Home</a></li>
          <li><a href="#" className="text-gray-800 hover:text-gray-600">Contact</a></li>
          <li><a href="#" className="text-gray-800 hover:text-gray-600">Login</a></li>
          <li><a href="#" className="text-gray-800 hover:text-gray-600">Register</a></li>
        </ul>
      </nav>
    </header>
  </div>  
  )
}
