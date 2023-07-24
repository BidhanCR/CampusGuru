import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
const navItems = [
  { title: "Home", link: "/" },
  { title: "Colleges", link: "/colleges" },
  { title: "Admission", link: "/admission" },
  { title: "My College", link: "/my-college" },
];
const Header = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-base-100 sticky top-0 left-0 w-full z-50 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item) => (
              <Link key={item.title} to={item.link}>
                {item.title}
              </Link>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li className="space-x-4 text-2xl" key={item.title}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div>
              {user ? (
                <img className="w-10 rounded-full" src={user?.photoURL} />
              ) : (
                <FaUserCircle className="text-[40px]" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to={"/login"}>Log in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
