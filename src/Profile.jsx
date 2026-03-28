import "./Profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">
      <div className="profile-card">
        <h1>👤 Profile</h1>

        <p><strong>Name:</strong> {user?.first} {user?.last}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Password:</strong> ******</p>
      </div>
    </div>
  );
}