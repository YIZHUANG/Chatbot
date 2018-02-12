import React from "react";
import AppBar from "material-ui/AppBar";

const Header = () => {
  return (
    <nav>
      <ul class="topnav" id="dropdownClick">
        <li>
          <a class="active">Home</a>
        </li>
        <li>
          <a>News</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li class="topnav-right">
          <a href="#signup">Sign In</a>
        </li>
        <li class="topnav-right">
          <a href="#signup">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
