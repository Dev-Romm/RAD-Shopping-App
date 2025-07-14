import { Link } from "react-router-dom";


function Header() {
    const handleLogout = () => {
        // Logic for logging out the user
        console.log("User logged out");
        // Redirect to home or login page if needed
    };
  return (
    <header>
      <h1>Shopping Cart</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
