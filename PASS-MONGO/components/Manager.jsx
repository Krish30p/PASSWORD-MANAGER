import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray ] = useState([]);

  // Fetch all passwords from backend
  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      setPasswordArray(passwords);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Toggle password visibility
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eye.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eyecross.png";
    }
  };

  // Save password to backend
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        // Delete old entry if editing
        if (form.id) {
          await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id }),
          });
        }

        const newPassword = { ...form, id: uuidv4() };
        setPasswordArray([...passwordArray, newPassword]);

        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPassword),
        });

        // Reset form
        setForm({ site: "", username: "", password: "" });
      } catch (err) {
        console.error("Error saving password:", err);
      }
    } else {
      alert("All fields must have at least 4 characters.");
    }
  };

  // Delete password
  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

  // Edit password
  const editPassword = (id) => {
    const selected = passwordArray.find((i) => i.id === id);
    if (selected) {
      setForm(selected);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Heading */}
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-500">WORD/&gt;</span>
        </h1>
        <p className="text-blue-600 text-lg text-center">
          Your Password Manager
        </p>

        {/* Input Form */}
        <div className="text-white flex flex-col p-4 gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-gray-400 w-full p-2"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-gray-400 w-full p-2"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-gray-400 w-full p-2"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eyecross.png"
                  alt="eye"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-900 hover:bg-green-800 rounded-full px-4 py-2 w-fit border-2 border-green-900 text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
      </div>

      {/* Password List */}
      <div className="passwords">
        <h2 className="font-bold text-gray-400 text-2xl py-4">Your Passwords</h2>

        {passwordArray.length === 0 && (
          <div className="text-white text-xl">No Passwords To Show</div>
        )}

        {passwordArray.length > 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-800">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 border border-white text-center w-32 text-white">
                    <a href={item.site} target="_blank" rel="noreferrer">
                      {item.site}
                    </a>
                  </td>
                  <td className="py-2 border border-white text-center w-32 text-white">
                    {item.username}
                  </td>
                  <td className="py-2 border border-white text-center w-32 text-white">
                    {item.password}
                  </td>
                  <td className="py-2 border border-white text-center w-32 text-white">
                    <span
                      className="cursor-pointer mx-3"
                      onClick={() => editPassword(item.id)}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                    <span
                      className="cursor-pointer mx-3"
                      onClick={() => deletePassword(item.id)}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
