import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import UserDetails from "./UserDetails";
const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-12 bg-white">
          <UserDetails />
        </div>
        <Footer />
      </div>

    </>
  );
}

export default Home;