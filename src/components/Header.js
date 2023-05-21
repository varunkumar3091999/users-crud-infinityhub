import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Header = ({ hideNewUserButton }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then((res) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-14 px-3 bg-cyan-400 mb-5 flex items-center justify-between">
      <h2 className="text-2xl text-white">Users</h2>
      <div>
        {hideNewUserButton ? null : (
          <Link to="/create" className=" bg-white p-2 rounded">
            New Users
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="mx-4 bg-cyan-800 p-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
