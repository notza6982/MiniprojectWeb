import React from 'react'
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light" >
        <div class="container-fluid">
          <a class="navbar-brand" >Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" >Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" >Link</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ backgroundColor: '#000000', color: "white", textAlign: 'right', height: 50 }}>
        <button style={{ paddingRight: 5 }}><Link to="/GlassShop/AI">AI</Link></button>
        <button style={{ paddingRight: 5 }}><Link to="/GlassShop/Shopping">Shop</Link></button>
        <button style={{ paddingRight: 5 }}><Link to="/GlassShop/Contact">Contact Us</Link></button>
      </div>
    </div>
  );
}

export default Menu;
