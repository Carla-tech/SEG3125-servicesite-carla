import { useMemo, useState } from 'react';

const designerEmail = 'carla.hajjali@gmail.com';

const services = [
  {
    id: 'classic-manicure',
    category: 'Manicure',
    icon: '✦',
    name: 'Classic manicure',
    time: '40 min',
    price: '$38+',
    description: 'Nail shaping, cuticle care, hand massage, and regular polish application.',
  },
  {
    id: 'gel-manicure',
    category: 'Manicure',
    icon: '◆',
    name: 'Gel manicure',
    time: '55 min',
    price: '$52+',
    description: 'Long-lasting gel polish with a glossy finish, ideal for busy schedules.',
  },
  {
    id: 'spa-pedicure',
    category: 'Pedicure',
    icon: '◎',
    name: 'Spa pedicure',
    time: '60 min',
    price: '$58+',
    description: 'Foot soak, nail care, exfoliation, massage, and polish in a calm setting.',
  },
  {
    id: 'nail-art',
    category: 'Design',
    icon: '◇',
    name: 'Nail art add-on',
    time: '25 min',
    price: '$15+',
    description: 'Simple accent designs, chrome, French tips, or seasonal nail art details.',
  },
  {
    id: 'repair-removal',
    category: 'Care',
    icon: '+',
    name: 'Gel removal or nail repair',
    time: '30 min',
    price: '$20+',
    description: 'Safe gel removal, broken nail repair, and personalized nail-care advice.',
  },
];

const faqs = [
  {
    question: 'How long does a gel manicure usually last?',
    answer: 'A gel manicure usually lasts around two to three weeks depending on nail growth, daily activities, and aftercare. The site gives this information before booking so users can choose the right service.',
  },
  {
    question: 'Can I book without calling?',
    answer: 'Yes. Select a service, date, and time in the booking panel. The prototype then creates a confirmation summary so the interaction feels complete.',
  },
  {
    question: 'How are prices presented?',
    answer: 'Prices are shown as starting ranges because final cost can depend on nail length, design complexity, and add-ons. This keeps information transparent while avoiding false precision.',
  },
];

const timeSlots = ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM', '5:00 PM'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [bookingDate, setBookingDate] = useState('2026-06-12');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const categories = useMemo(() => ['All', ...new Set(services.map((service) => service.category))], []);
  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((service) => service.category === selectedCategory);

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation({
      name: visitorName.trim() || 'Guest user',
      email: visitorEmail.trim() || 'not provided',
      service: selectedService.name,
      date: bookingDate,
      time: selectedTime,
      notes: notes.trim() || 'No additional notes',
    });
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero selectedService={selectedService} />
        <Services
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredServices={filteredServices}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        <Booking
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          visitorName={visitorName}
          setVisitorName={setVisitorName}
          visitorEmail={visitorEmail}
          setVisitorEmail={setVisitorEmail}
          notes={notes}
          setNotes={setNotes}
          handleSubmit={handleSubmit}
          confirmation={confirmation}
        />
        <Education openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-nav" aria-label="Main navigation">
      <div className="container">
        <a className="navbar-brand brand" href="#home">Lumière Nail Studio</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#booking">Book</a>
            <a className="nav-link" href="#learn">Care guide</a>
            <a className="nav-link" href="#contact">Contact</a>
            <a className="btn btn-sm btn-accent" href="#booking">Reserve a visit</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({ selectedService }) {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="eyebrow">Appointment-based nail salon in Ottawa</p>
            <h1>Elegant nail services with a simple booking experience.</h1>
            <p className="hero-copy">
              Lumière Nail Studio is a high-fidelity service-site prototype that helps users compare manicure,
              pedicure, design, and nail-care services, then request an appointment in one clear flow.
            </p>
            <div className="hero-actions">
              <a className="btn btn-accent btn-lg" href="#booking">Book an appointment</a>
              <a className="btn btn-outline-dark btn-lg" href="#services">Compare services</a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-card" aria-label="Featured selected service summary">
              <div className="hero-card-top">
                <span className="sparkle" aria-hidden="true">✦</span>
                <span>Selected service</span>
              </div>
              <h2>{selectedService.name}</h2>
              <p>{selectedService.description}</p>
              <div className="quick-facts">
                <span>{selectedService.time}</span>
                <span>{selectedService.price}</span>
                <span>{selectedService.category}</span>
              </div>
              <a className="mini-link" href="#booking">Continue to booking →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ categories, selectedCategory, setSelectedCategory, filteredServices, selectedService, setSelectedService }) {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Services and prices</p>
          <h2>Choose the nail service that matches your occasion.</h2>
          <p>Cards make the options easy to scan, while the filter supports users who already know what they need.</p>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Service category filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="row g-4 mt-2">
          {filteredServices.map((service) => (
            <div className="col-md-6 col-xl-4" key={service.id}>
              <button
                type="button"
                onClick={() => setSelectedService(service)}
                className={`service-card ${selectedService.id === service.id ? 'selected' : ''}`}
              >
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-category">{service.category}</span>
                <strong>{service.name}</strong>
                <span className="service-description">{service.description}</span>
                <span className="service-meta"><b>{service.time}</b> · {service.price}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking({ selectedService, setSelectedService, bookingDate, setBookingDate, selectedTime, setSelectedTime, visitorName, setVisitorName, visitorEmail, setVisitorEmail, notes, setNotes, handleSubmit, confirmation }) {
  return (
    <section id="booking" className="booking-section section-padding">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <p className="eyebrow">Interactive booking</p>
            <h2>Reserve a nail appointment in three clear steps.</h2>
            <p>
              The booking flow follows the first storyboard: service selection, date/time choice, and confirmation.
              It reduces memory load by keeping the selected service visible throughout the process.
            </p>
            <div className="process-list">
              <span>1. Choose service</span>
              <span>2. Pick time</span>
              <span>3. Confirm</span>
            </div>
          </div>
          <div className="col-lg-7">
            <form className="booking-card" onSubmit={handleSubmit}>
              <div className="form-step">
                <label htmlFor="service-select">Service</label>
                <select
                  id="service-select"
                  className="form-select"
                  value={selectedService.id}
                  onChange={(event) => setSelectedService(services.find((service) => service.id === event.target.value))}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.name} - {service.price}</option>
                  ))}
                </select>
              </div>
              <div className="row g-3">
                <div className="col-md-6 form-step">
                  <label htmlFor="booking-date">Preferred date</label>
                  <input
                    id="booking-date"
                    className="form-control"
                    type="date"
                    value={bookingDate}
                    onChange={(event) => setBookingDate(event.target.value)}
                  />
                </div>
                <div className="col-md-6 form-step">
                  <label>Preferred time</label>
                  <div className="time-grid" role="radiogroup" aria-label="Preferred appointment time">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-chip ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6 form-step">
                  <label htmlFor="visitor-name">Name</label>
                  <input id="visitor-name" className="form-control" value={visitorName} onChange={(event) => setVisitorName(event.target.value)} placeholder="Your name" />
                </div>
                <div className="col-md-6 form-step">
                  <label htmlFor="visitor-email">Email</label>
                  <input id="visitor-email" className="form-control" type="email" value={visitorEmail} onChange={(event) => setVisitorEmail(event.target.value)} placeholder="name@email.com" />
                </div>
              </div>
              <div className="form-step">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" className="form-control" rows="3" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Tell us your preferred nail style, colour, or occasion."></textarea>
              </div>
              <button className="btn btn-accent w-100 btn-lg" type="submit">Create appointment request</button>
              {confirmation && <Confirmation confirmation={confirmation} />}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Confirmation({ confirmation }) {
  return (
    <div className="confirmation-card" role="status" aria-live="polite">
      <span className="confirmation-icon" aria-hidden="true">✓</span>
      <div>
        <h3>Appointment request created</h3>
        <p>
          {confirmation.name}, your request for <b>{confirmation.service}</b> on <b>{confirmation.date}</b> at <b>{confirmation.time}</b> is ready.
        </p>
        <p className="small mb-0">Confirmation email: {confirmation.email}. Notes: {confirmation.notes}.</p>
      </div>
    </div>
  );
}

function Education({ openFaq, setOpenFaq }) {
  return (
    <section id="learn" className="section-padding learn-section">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <p className="eyebrow">Nail-care information</p>
            <h2>Understand the service before committing.</h2>
            <p>
              This section supports users like Daniel who need information and price transparency before requesting a visit.
              The accordion keeps the page clean while still offering detailed answers.
            </p>
          </div>
          <div className="col-lg-7">
            <div className="faq-list">
              {faqs.map((item, index) => (
                <div className="faq-item" key={item.question}>
                  <button className="faq-question" type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    <span>{item.question}</span>
                    <span aria-hidden="true">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && <p className="faq-answer">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="contact-card">
          <div>
            <p className="eyebrow light">Contact</p>
            <h2>Questions before booking?</h2>
            <p>
              Contact information is kept visible so users can reach the service designer/prototype owner without searching.
            </p>
          </div>
          <div className="contact-details">
            <a href={`mailto:${designerEmail}`}>{designerEmail}</a>
            <span>Ottawa, Ontario</span>
            <span>Monday-Friday · 9:30 AM-6:00 PM</span>
            <span>Designed by Carla El Hajj Ali</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
        <span>© 2026 Lumière Nail Studio prototype</span>
        <span>SEG3125 Assignment 2 · Designed by Carla El Hajj Ali</span>
      </div>
    </footer>
  );
}

export default App;
