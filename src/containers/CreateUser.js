import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import SuccessAlert from "../components/SuccessAlert";

const CreateUser = () => {
  const [showModal, setShowModal] = useState(false);

  // const params

  const { id } = useParams();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const saveUser = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", {
        name: "morpheus",
        job: "leader",
      })
      .then((res) => {
        if (res.status === 201) {
          setJob("");
          setName("");
          setShowModal(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (e) => {
    e.preventDefault();

    axios
      .patch(`https://reqres.in/api/users/${id}`, {
        name: "morpheus",
        job: "leader",
      })
      .then((res) => {
        if (res.status === 200) {
          setJob("");
          setName("");
          setShowModal(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!localStorage.getItem("currentUser")) {
    return "Please login to access data...!";
  }

  return (
    <div>
      <Header hideNewUserButton={true} />

      <div className="h-screen w-screen flex justify-center items-center">
        {showModal ? <SuccessAlert show={setShowModal} /> : null}
        <div class="w-full max-w-xs">
          <div className="h-10 bg-green-100 w-full flex items-center text-md pl-7">
            {id ? "Update User" : "New User"}
          </div>
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={id ? updateUser : saveUser}
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Jhon Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Job
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="job"
                type="text"
                placeholder="Leader"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save User
              </button>
              <Link
                class="border border-blue-500  text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                to="/"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
