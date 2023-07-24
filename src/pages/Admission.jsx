import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const Admission = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const { handleSubmit, control, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetch("https://campus-guru-server.vercel.app/colleges")
      .then((response) => response.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error("Error fetching college data:", error));
  }, []);

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
    // Reset the form fields when a new college is clicked
    reset({
      candidateName: "",
      subject: "",
      candidateEmail: "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
      image: null,
    });
  };

  const onSubmit = async (data) => {
    try {
      // Upload the image to imgbb using FormData
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = import.meta.env.VITE_IMGBB_KEY;
      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

      const response = await fetch(imgbbUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const imageData = await response.json();
      const imageUrl = imageData.data.display_url;

      // Do something with the form data, like submitting it to a backend server
      const AdmissionData = {
        college: selectedCollege,
        ...data,
        image: imageUrl, // Use the uploaded image URL
      };

      const admissionResponse = await fetch(
        "https://campus-guru-server.vercel.app/admission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(AdmissionData),
        }
      );

      const responseData = await admissionResponse.json();
      if (responseData.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admission completed successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading image or submitting data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-100">
      <div className="space-y-4">
        {colleges.map((college) => (
          <p
            className="cursor-pointer text-center p-2 rounded-md hover:bg-blue-400 hover:text-white"
            key={college._id}
            onClick={() => handleCollegeClick(college)}
          >
            {college.name}
          </p>
        ))}
      </div>
      <div>
        {selectedCollege && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Admission Form for {selectedCollege.name}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Input fields */}
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Candidate Name:</span>
                  <Controller
                    name="candidateName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Subject:</span>
                  <Controller
                    name="subject"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Candidate Email:</span>
                  <Controller
                    name="candidateEmail"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="email"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Candidate Phone number:</span>
                  <Controller
                    name="candidatePhone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="tel"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Address:</span>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Date of Birth:</span>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="date"
                        {...field}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Image:</span>
                  <Controller
                    name="image"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <input
                        type="file"
                        onChange={(e) => {
                          setImageFile(e.target.files[0]);
                          field.onChange(e.target.files[0]);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admission;
