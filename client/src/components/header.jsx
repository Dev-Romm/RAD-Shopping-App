import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/header.css";

function Header() {
    const handleLogout = () => {
         Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                Swal.fire("Logged out!", "You have been logged out.", "success");
                navigate("/");
            }
        });
        
    };
  return (
    <header>
      <h1>RAD Shopping App</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li onClick={handleLogout} className="logout"><button>Log Out</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
