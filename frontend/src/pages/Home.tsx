import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import AboutUs from "../components/AboutUs";
import InstructorCTA from "../components/InstructorCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <AboutUs />
        <InstructorCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
