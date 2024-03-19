// Importing necessary components from the components folder
import { Footer, Header, Main } from "./components/index";

// Defining the App component
export default function App() {
  return (
    // Wrapping the components in a div with a margin of 4
    <div className="m-4">
      {/* Rendering the Header component */}
      <Header />
      {/* Rendering the Main component */}
      <Main />
      {/* Rendering the Footer component */}
      <Footer />
    </div>
  );
}
