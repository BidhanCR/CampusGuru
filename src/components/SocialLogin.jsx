
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const SocialLogin = () => {
  const {googleSignIn, githubSignIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 
    // sign in With google
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true } );
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true } );
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }
    return (
        <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <h2 className="text-xl font-semibold text-center md:text-left text-gray-800 mb-4">
            Register with Social Accounts
          </h2>
          <div className="flex flex-col space-y-4">
            
            <button onClick={handleGoogleSignIn} className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
              Sign up with Google
            </button>
            <button onClick={handleGithubSignIn} className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md">
              Sign up with GitHub
            </button>
            
          </div>
        </div>
    );
};

export default SocialLogin;