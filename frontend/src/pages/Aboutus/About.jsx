import React from "react";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../../components/navbar/Navbar";
import carouselImage from "../../components/Assets/image.png"; // Add your own images
import "../Aboutus/About.css";

const About = () => {
  return (
    <div className="aboutus">
      <Navbar />
      
      {/* Carousel Section at the top */}
      <section className="carousel-section">
        <Container>
          <Row>
            <Col lg="12">
              <div className="carousel">
                <img
                  src={carouselImage}
                  alt="Cook Together"
                  className="w-100 rounded-3"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* About Section */}
      <section className="about__page-section mt-5">
        <Container>
          <Row>
            <Col lg="12" md="12" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">About Us</h2>

                <p className="section__description">
                  Cook Together is your one-stop online platform for grocery shopping. Whether you're planning a special family meal, need daily essentials, or looking to explore organic food options, we’ve got it all! Our mission is to provide a seamless shopping experience with top-quality groceries, delivered right to your doorsteps.
                </p>
                
                <p className="section__description">
                  At Cook Together, we aim to make shopping for groceries easy, affordable, and enjoyable. We offer a wide variety of products, from fresh produce to pantry staples, all with a focus on quality and convenience. Our user-friendly interface allows you to browse, select, and pay for your groceries effortlessly, and we deliver them with care directly to your doorstep. Whether you're an expert chef or a home cook, Cook Together ensures you have access to the finest ingredients at your fingertips.
                </p>

                <p className="section__description">
                  Cooking together with your family and friends has never been easier. We provide the ingredients you need to create delicious meals, along with helpful recipes that make meal prep a breeze. Join us today and start cooking with fresh, high-quality groceries delivered straight to your door!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Us Section in Orange Box */}
      <section className="contact-section mt-5">
        <Container>
          <div className="contact-box">
            <h5 className="contact-title">Contact Us</h5>
            <Row>
              <Col sm="12" md="6">
                <div className="contact-info">
                  <h6>Email:</h6>
                  <p className="contact-email">support@cooking-together.com</p>
                </div>
              </Col>
              <Col sm="12" md="6">
                <div className="contact-info">
                  <h6>Phone:</h6>
                  <p className="contact-phone">+123-456-7890</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
