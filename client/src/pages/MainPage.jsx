import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function MainPage() {
  return (
    <>
      <section id="title">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-dark">
            <a href="/" className="navbar-brand">
              TinDog
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar_demo"
              aria-controls="navbar_demo"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar_demo">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="#footer" className="nav-link">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#testimonials" className="nav-link">
                    Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#cta" className="nav-link">
                    Download
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="row">
            <div className="col-lg-6">
              <h1 className="big-heading">
                Meet new and interesting dogs nearby.
              </h1>
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-dark btn-lg download-button"
                >
                  Login
                  <i
                    className="fa-solid fa-arrow-right-to-bracket"
                    style={{
                      color: "white",
                      marginBottom: "5px",
                      marginLeft: "5px",
                    }}
                  ></i>
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg download-button"
                >
                  Register
                </button>
              </Link>
            </div>

            <div className="col-lg-6">
              <img
                className="title-img"
                src={require("../images/dogs.gif")}
                alt="iphone-mockup"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="row">
          <div className="feature-box col-md-4">
            <i className="fa-solid fa-circle-check fa-4x"></i>
            <h3 className="features-title">Easy to use.</h3>
            <p className="fp">So easy to use, even your dog could do it.</p>
          </div>

          <div className="feature-box col-md-4">
            <i className="fa-solid fa-bullseye fa-4x"></i>
            <h3 className="features-title">Elite Clientele</h3>
            <p className="fp">We have all the dogs, the greatest dogs.</p>
          </div>

          <div className="feature-box col-md-4">
            <i className="fa-solid fa-heart fa-4x"></i>
            <h3 className="features-title">Guaranteed to work.</h3>
            <p className="fp">Find the love of your dog's life.</p>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div
          id="testamonial-carousel"
          className="carousel slide"
          data-bs-ride="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h2 className="testimonial-text">
                I no longer have to sniff other dogs for love. I've found the
                hottest Corgi on TinDog. Woof.
              </h2>
              <img
                className="testimonial-img"
                src={require("../images/dog-img.jpg")}
                alt="dog-profile"
              />
              <em>Pebbles, New York</em>
            </div>

            <div className="carousel-item">
              <h2 className="testimonial-text">
                My dog used to be so lonely, but with TinDog's help, they've
                found the love of their life. I think.
              </h2>
              <img
                className="testimonial-img"
                src={require("../images/100_0661.JPG")}
                alt="lady-profile"
              />
              <em>Beverly, Illinois</em>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testamonial-carousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testamonial-carousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      <section id="press">
        <img
          className="press-logo"
          src={require("../images/TechCrunch.png")}
          alt="tc-logo"
        />
        <img
          className="press-logo"
          src={require("../images/tnw.png")}
          alt="tnw-logo"
        />
        <img
          className="press-logo"
          src={require("../images/bizinsider.png")}
          alt="biz-insider-logo"
        />
        <img
          className="press-logo"
          src={require("../images/mashable.png")}
          alt="mashable-logo"
        />
      </section>

      <section id="cta">
        <div className="container-fluid">
          <h2>Find the True Love of Your Dog's Life Today.</h2>
          <button className="btn btn-dark btn-lg download-button" type="button">
            <i className="fab fa-apple"></i>
            Download
          </button>
          <button
            className="btn btn-primary btn-lg download-button"
            type="button"
          >
            <i className="fab fa-google-play"></i>
            Download
          </button>
        </div>
      </section>

      <div id="footer">
        <i className="fa-brands fa-github"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-regular fa-envelope"></i>
        <p>© Copyright 2022 TinDog</p>
      </div>
    </>
  );
}

export default MainPage;
