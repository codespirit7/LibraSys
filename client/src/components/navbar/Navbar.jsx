import "../navbar/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const handleLogout = async (e) => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    alert("You have been logged out");
    window.location.replace("/login");
  };
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  return (
    <div className="top">
      <div className="topLeft"></div>
      <div className="glassNav">
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link to="/home" className="link">
                LISTED BOOKS
              </Link>
            </li>
            {adminToken ? (
              <li className="topListItem">
                <Link to="/admin" className="link">
                  ADD BOOK
                </Link>
              </li>
            ) : (
              <div></div>
            )}

            <li className="topListItem">
              <Link to="/search" className="link">
                SEARCH
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="topRight">
        <ul className="topList">
          {adminToken || userToken ? (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">
                  USER LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/adminLogin" className="link">
                  ADMIN LOGIN
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}
