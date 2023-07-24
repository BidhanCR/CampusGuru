
import { useLocation } from "react-router-dom";

const CollegeDetails = () => {
  const location = useLocation();
  const { collegeDetails } = location.state;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Image */}
          <div className="md:w-1/3">
            <img
              src={collegeDetails.image}
              alt={collegeDetails.name}
              className="h-80 w-full object-cover"
            />
          </div>

          {/* Right Side - College Information */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">{collegeDetails.name}</h2>
            <p className="text-gray-700 text-lg mb-6">Admission Dates: {collegeDetails.admissionDate}</p>
            <p className="text-gray-700 text-lg mb-6">
              Admission Process: {collegeDetails.admissionProcess.method}
            </p>
            <p className="text-gray-700 text-base mb-4">{collegeDetails.admissionProcess.details}</p>
            <p className="text-gray-700 text-lg mb-6">Upcoming Event: {collegeDetails.event}</p>
            <p className="text-gray-700 text-base mb-4">Event Details: {collegeDetails.eventDetails}</p>
            <p className="text-gray-700 text-lg mb-6">Sports: {collegeDetails.sports}</p>
            <p className="text-gray-700 text-lg">Research Works: {collegeDetails.researchWorks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;

