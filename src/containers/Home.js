import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    setLoading(true);

    axios.get("https://reqres.in/api/users").then((res) => {
      setUsers(res.data.data);
      setLoading(false);
    });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("User Deleted");
        }
      })
      .catch((err) => console.log(err));
  };

  if (!localStorage.getItem("currentUser")) {
    return "Please login to access data...!";
  }

  return (
    <div>
      <Header />

      <div>
        <div class="relative overflow-x-auto ml-10 mr-10">
          {loading ? (
            "Loading..."
          ) : (
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.email}
                    </th>
                    <td class="px-6 py-4">{user.first_name}</td>
                    <td class="px-6 py-4">{user.last_name}</td>
                    <td class="px-6 py-4">
                      <div className="flex">
                        <Link to={`/edit-user/${user.id}`}>Edit</Link>
                        <button
                          onClick={(e) => deleteUser(user.id)}
                          className="ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
