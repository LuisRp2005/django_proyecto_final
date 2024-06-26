import React from 'react';
import Navbar from '../components/navbar';
import '../pages/styles.css';

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero carousel */}
      <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5 align-items-center">
                <div className="col-md-6">
                  <img className="img-fluid" src="carrusel_zapa.jpg" alt="Hero Image" />
                </div>
                <div className="col-md-6">
                  <div className="text-start">
                    <h1 className="h1 text-success"><b>Shapes</b> Shifter</h1>
                    <h3 className="h2">Encuentra variedad de zapatillas en nuestra tienda virtual</h3>
                    <p>
                      Explora nuestra amplia selección de zapatillas en línea y descubre el estilo perfecto para ti.
                      Desde las últimas tendencias hasta los clásicos atemporales, nuestra tienda ofrece opciones 
                      para cada ocasión y preferencia. Ya sea que busques comodidad para el día a día o un diseño 
                      único que destaque, nuestra colección está diseñada para satisfacer tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
          <i className="fas fa-chevron-left"></i>
        </a>
        <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>

      {/* Categories section */}
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-8 m-auto">
            <h2 className="h1">Categorías Preferidas</h2>
            <p>
              Descubre las últimas tendencias en calzado de esta temporada. Desde zapatillas casuales hasta zapatos de alto rendimiento para correr.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm h-100">
              <img src="zapa1.webp" className="card-img-top" alt="Category 1" />
              <div className="card-body">
                <h5 className="card-title mb-3">Zapatillas Deportivas</h5>
                <p className="card-text">Descubre el equilibrio perfecto entre estilo y funcionalidad con nuestras zapatillas deportivas.</p>
                <a href="/productos" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm h-100">
              <img src="zapa2.jpg" className="card-img-top" alt="Category 2" />
              <div className="card-body">
                <h5 className="card-title mb-3">Zapatillas Urbanas</h5>
                <p className="card-text">Combina estilo y comodidad con nuestras zapatillas urbanas diseñadas para la vida diaria.</p>
                <a href="/productos" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm h-100">
              <img src="zapa3.jpg" className="card-img-top" alt="Category 3" />
              <div className="card-body">
                <h5 className="card-title mb-3">Zapatillas Casuales</h5>
                <p className="card-text">Encuentra estilo y confort con nuestras zapatillas casuales diseñadas para adaptarse a tu vida diaria.</p>
                <a href="/productos" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light" id="template-footer">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#">Home</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h5>Support</h5>
              <ul className="list-unstyled">
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h5>Social</h5>
              <ul className="list-unstyled">
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h5>Contact Us</h5>
              <address>
                <a href="mailto:info@example.com">info@example.com</a><br />
                <a href="tel:+123456789">+1 (234) 567-89</a>
              </address>
            </div>
          </div>
        </div>
        <div className="w-100 bg-black py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-12">
                <p className="text-left text-light">
                  Copyright &copy; {new Date().getFullYear()} Company Name | Designed by <a href="https://templatemo.com" target="_blank" rel="noopener noreferrer">TemplateMo</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
