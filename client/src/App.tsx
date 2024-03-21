// Importing necessary components from the components folder
import HomePageWrapper from "./components/shared/templates/Home/HomePageWrapper";


// Defining the App component
export default function App() {
  return (
    // Wrapping the components in a div with a margin of 4
    <div className="m-4">
      <HomePageWrapper />
    </div>
  );
}
