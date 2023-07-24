import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyCollege = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: myAdmissions = [] } = useQuery(
    ["myAdmissions", user?.email],
    async () => {
      const res = await axiosSecure.get(`/admission/${user?.email}`);
      return res.data;
    }
  );
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {myAdmissions.map((admission) => (
          <div className="flex flex-col md:flex-row justify-evenly items-center border border-gray-700 p-6 m-6 rounded-lg gap-6 md:gap-0" key={admission._id}>
            <div className="">
              <img
                className="w-72 h-40 object-cover rounded-t-lg"
                src={admission.college.image}
                alt={admission.college.name}
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">{admission.college.name}</h2>
                <p className="text-gray-700 text-lg">
                  Admission Dates: {admission.college.admissionDate}
                </p>
                <p className="text-gray-700 text-lg">
                  Admission Process: {admission.college.admissionProcess.method}
                </p>

                <p className="text-gray-700 text-lg">
                  Upcoming Event: {admission.college.event}
                </p>
                <p className="text-gray-700 text-base">
                  Event Details: {admission.college.eventDetails}
                </p>
                <p className="text-gray-700 text-lg">
                  Sports: {admission.college.sports}
                </p>
                <p className="text-gray-700 text-lg">
                  Research Works: {admission.college.researchWorks}
                </p>
              </div>
            </div>
            <div className="">
            <img
                className="w-72 h-72 object-cover rounded-t-lg"
                src={admission.image}
                alt={admission.name}
              />
              <p className="text-gray-700 text-lg mt-4">
                CandidateName : {admission.candidateName}
              </p>
              <p className="text-gray-700 text-lg">
              CandidateEmail : {admission.candidateEmail}
              </p>
              <p className="text-gray-700 text-lg">
                Subject : {admission.subject}
              </p>
              <p className="text-gray-700 text-lg">
              CandidatePhone : {admission.candidatePhone}
              </p>
              <p className="text-gray-700 text-lg">
              Date Of Birth : {admission.dateOfBirth}
              </p>
              <button className="btn bg-blue-600 mt-4">Give Review about college</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollege;
