import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";
import ResearchPaper from "../components/ResearchPaper";
import Review from "../components/Review";
const Home = () => {
  const [collegeData, setCollegeData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/college")
      .then((res) => res.json())
      .then((data) => setCollegeData(data));
  }, []);
  return (
    <div>
      <div className="flex justify-center my-6">
      <div className="join">
        <input className="input input-bordered join-item  w-80 md:w-96 px-6 md:px-0 text-center" placeholder="Search Colleges" />
        <button className="btn join-item rounded-r-full">Search</button>
      </div>
      </div>
      {
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collegeData.map((college) => (
            <div
              key={college._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                src={college.image}
                alt={college.collegeName}
                className="w-full h-56 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{college.name}</div>
                <p className="text-gray-700 text-base">
                  Admission Dates: {college.admissionDate}
                </p>
                <p className="text-gray-700 text-base">
                  Upcoming Events: {college.event}
                </p>
                <p className="text-gray-700 text-base">
                  Research History: {college.researchHistory}
                </p>
                <p className="text-gray-700 text-base">
                  Sports: {college.sports}
                </p>
                <button className="btn bg-primary my-2 text-white hover:bg-primary/50">
                  <Link
                    state={{ collegeDetails: college }}
                    to={`/college/${college._id}`}
                  >
                    View Details
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      }

      <div className="my-8">
      <h1 className="text-3xl text-center py-8">Photo Album</h1>
      <Gallery/>
      </div>
      <ResearchPaper/>
      <Review/>
    </div>
  );
};

export default Home;
