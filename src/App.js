import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Login from "./containers/Login";
import CreateUser from "./containers/CreateUser";
import { useEffect, useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  console.log(currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("currentUser", currentUser?.uid);
        setAuthenticated(true);
      } else {
        navigate("/login");
        setAuthenticated(true);
      }
    });
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} authenticated={currentUser} />
        <Route path="/create" key="create" element={<CreateUser />} />
        <Route
          path="/edit-user/:id"
          key="edit-user"
          element={<CreateUser />}
          authenticated={authenticated}
        />
      </Routes>
    </div>
  );
}
// }

export default App;
