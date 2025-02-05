import React, { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserUpdate: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data from API
    fetch("https://reqres.in/api/users/2")
      .then((response) => response.json())
      .then((data) => setUser(data.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  const updateEmail = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users/2", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "testa@gmail.com" }),
      });

      if (response.ok) {
        setUser((prevUser) => (prevUser ? { ...prevUser, email: "testa@gmail.com" } : null));
        setUpdated(true);
      } else {
        console.error("Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return (
    <div>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <img src={user.avatar} alt="User Avatar" width={100} />
          <br />
          <button onClick={updateEmail}>Update Email</button>
          {updated && <p style={{ color: "green" }}>Email updated successfully!</p>}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserUpdate;
