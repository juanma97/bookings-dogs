import React, { useState } from 'react';
import { supabase } from './supabase';
import './index.css';

// ─── Scroll helper ───────────────────────────────────────────────
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// ─── Navbar ──────────────────────────────────────────────────────
function Navbar({ onFindKennel }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="logo"><span className="logo-paw">🐾</span> Booking Canino</span>
        <button className="nav-cta" onClick={() => scrollTo('residencias')}>
          Tengo una residencia →
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero({ onFindKennel }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-badge">
          <span className="badge badge-blue">✅ Solo centros profesionales verificados</span>
        </div>
        <h1>Reserva la mejor residencia<br /><span>para tu perro en 3 clics.</span></h1>
        <p className="hero-sub">Sin WhatsApp, sin esperas, sin llamadas. Booking Canino conecta a dueños con residencias caninas profesionales de forma instantánea.</p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={onFindKennel}>🔍 Buscar residencia</button>
          <button className="btn btn-ghost btn-lg" onClick={() => scrollTo('residencias')}>Tengo una residencia →</button>
        </div>
        <div className="hero-trust">
          <span className="trust-pill">🐶 <strong>+2.400</strong> dueños esperando</span>
          <span className="trust-pill">🏠 Centros 100% profesionales</span>
          <span className="trust-pill">⭐ Verificación de vacunas</span>
        </div>
      </div>
    </section>
  );
}

// ─── Problem / Solution ───────────────────────────────────────────
function ProblemSolution() {
  const problems = ['Buscar por WhatsApp y esperar horas sin respuesta','Enviar fotos de vacunas una y otra vez','No saber si hay disponibilidad real hasta confirmar','Repetir la ficha de tu perro en cada residencia'];
  const solutions = ['Disponibilidad en tiempo real, sin llamadas','Pasaporte Digital de tu perro precargado','Reserva confirmada en menos de 60 segundos','Vacunas e historial enviados automáticamente'];
  return (
    <section className="section ps-section">
      <div className="container">
        <p className="ps-eyebrow text-center">El problema</p>
        <h2 className="ps-title text-center">Encontrar una residencia no debería<br />ser tan complicado.</h2>
        <div className="ps-grid">
          <div className="ps-card problem">
            <div className="ps-card-label"><span>❌</span> Cómo funciona hoy</div>
            <ul className="ps-list">{problems.map((t,i)=><li key={i}><span className="icon">✕</span>{t}</li>)}</ul>
          </div>
          <div className="ps-card solution">
            <div className="ps-card-label"><span>✅</span> Con Booking Canino</div>
            <ul className="ps-list">{solutions.map((t,i)=><li key={i}><span className="icon">✓</span>{t}</li>)}</ul>
          </div>
        </div>
        <div className="passport-callout">
          <span className="pc-icon">🐶</span>
          <div>
            <h4>El Pasaporte Digital de tu perro</h4>
            <p>Vacunas, historial y preferencias precargadas. La residencia lo recibe todo automáticamente al confirmar la reserva. Sin formularios, sin PDFs por WhatsApp, nunca más.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How it Works (owners) ────────────────────────────────────────
function HowItWorksOwners({ onFindKennel }) {
  const steps = [
    { icon: '🔍', title: 'Busca', desc: 'Filtra por ciudad, fechas y tamaño de tu perro. Ve la disponibilidad real al instante.' },
    { icon: '📋', title: 'Reserva', desc: 'Tu Pasaporte Digital se envía automáticamente. Cero formularios extra.' },
    { icon: '✅', title: 'Confirmado', desc: 'Recibe confirmación instantánea y comunicación directa con el centro.' },
  ];
  return (
    <section className="section hiw-section text-center">
      <div className="container">
        <p className="section-eyebrow blue">Cómo funciona</p>
        <h2 className="section-title">Tan fácil como pedir una pizza.</h2>
        <p className="section-sub">Tres pasos y tu perro tiene su estancia reservada en un centro profesional.</p>
        <div className="steps">
          {steps.map((s,i)=>(
            <div className="step" key={i}>
              <div className="step-number blue">{i+1}</div>
              <span className="step-icon">{s.icon}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:'40px'}}>
          <button className="btn btn-primary btn-lg" onClick={onFindKennel}>🔍 Buscar mi residencia</button>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────
function DashboardMockup() {
  const bookings = [
    { emoji:'🐕', name:'Max (Golden)', dates:'24 - 28 abr', status:'confirmed', label:'Confirmada' },
    { emoji:'🐩', name:'Luna (Caniche)', dates:'25 - 27 abr', status:'confirmed', label:'Confirmada' },
    { emoji:'🦮', name:'Rocky (Labrador)', dates:'26 abr', status:'pending', label:'Pendiente' },
  ];
  return (
    <div className="dashboard-mockup">
      <div className="dash-header">
        <span className="dash-title">📊 Panel Residencia — Hoy</span>
        <span className="dash-date">Jue, 24 Abr 2025</span>
      </div>
      <div className="dash-stats">
        <div className="dash-stat"><span className="dash-stat-val">6</span><span className="dash-stat-lbl">Reservas hoy</span></div>
        <div className="dash-stat"><span className="dash-stat-val">340€</span><span className="dash-stat-lbl">Ingresos hoy</span></div>
        <div className="dash-stat"><span className="dash-stat-val">100%</span><span className="dash-stat-lbl">Vacunas OK</span></div>
        <div className="dash-stat"><span className="dash-stat-val">85%</span><span className="dash-stat-lbl">Ocupación</span></div>
      </div>
      <div className="dash-bookings">
        {bookings.map((b,i)=>(
          <div className="dash-booking-row" key={i}>
            <div className="dash-dog">
              <div className="dash-dog-avatar">{b.emoji}</div>
              <div>
                <span className="dash-dog-name">{b.name}</span>
                <span className="dash-dog-dates">{b.dates}</span>
              </div>
            </div>
            <span className={`dash-status ${b.status}`}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Business Section ─────────────────────────────────────────────
function BusinessSection() {
  const features = [
    { icon:'🔄', title:'Sync instantáneo', desc:'Disponibilidad siempre actualizada. Cero doble reserva.' },
    { icon:'🩺', title:'Verificación de vacunas', desc:'El sistema comprueba los documentos automáticamente.' },
    { icon:'💳', title:'Pagos integrados', desc:'Cobra en el momento de la reserva. Sin gestión manual.' },
    { icon:'📊', title:'Dashboard inteligente', desc:'Reservas, ingresos y ocupación en una sola pantalla.' },
  ];
  return (
    <section className="business-section" id="residencias">
      <div className="container text-center">
        <p className="section-eyebrow">Para residencias y guarderías</p>
        <h2 className="section-title" style={{color:'#fff'}}>Deja de gestionar tu residencia<br />por WhatsApp.</h2>
        <p className="section-sub">Un panel de control que automatiza reservas, verifica vacunas y cobra por ti.</p>
        <div className="biz-value-badge">⚡ Ahorra +10 horas semanales en coordinación</div>
        <DashboardMockup />
        <div className="biz-features-grid">
          {features.map((f,i)=>(
            <div className="biz-feature" key={i}>
              <span className="biz-feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it Works (business) ──────────────────────────────────────
function HowItWorksBusiness() {
  const steps = [
    { icon:'🏠', title:'Crea tu perfil', desc:'Tu residencia aparece en la plataforma con fotos, servicios y disponibilidad.' },
    { icon:'📲', title:'Recibe reservas', desc:'Confirmación y pago automáticos. Sin llamadas ni WhatsApps.' },
    { icon:'📋', title:'Gestiona sin estrés', desc:'Dashboard con todo centralizado. Vacunas verificadas, pagos cobrados.' },
  ];
  return (
    <section className="section hiw-section business-bg text-center" id="business-hiw">
      <div className="container">
        <p className="section-eyebrow teal">Cómo funciona para residencias</p>
        <h2 className="section-title">Tu residencia, en piloto automático.</h2>
        <p className="section-sub">Solo una pequeña tarifa por reserva completada. Sin cuotas mensuales al inicio.</p>
        <div className="steps">
          {steps.map((s,i)=>(
            <div className="step" key={i}>
              <div className="step-number teal">{i+1}</div>
              <span className="step-icon">{s.icon}</span>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon:'🏅', title:'Solo centros profesionales', desc:'Cero particulares ni soluciones Airbnb. Cada centro pasa por un proceso de verificación antes de aparecer en la plataforma.' },
    { icon:'🩺', title:'Verificación de vacunas', desc:'El sistema comprueba automáticamente que la documentación de cada perro esté al día antes de confirmar la reserva.' },
    { icon:'🔒', title:'Pago 100% seguro', desc:'Integración con Stripe. El pago se retiene en reserva y se libera tras el check-in. Dueño y residencia protegidos.' },
  ];
  return (
    <section className="trust-section text-center">
      <div className="container">
        <p className="section-eyebrow" style={{color:'#6EE7B7'}}>Por qué confiar en Booking Canino</p>
        <h2 className="section-title" style={{color:'#fff'}}>Construido sobre confianza.</h2>
        <p className="section-sub" style={{color:'#9CA3AF'}}>Estándares profesionales en cada reserva, para ambos lados.</p>
        <div className="trust-grid">
          {items.map((item,i)=>(
            <div className="trust-item" key={i}>
              <span className="trust-item-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Owner Form ───────────────────────────────────────────────────
function OwnerForm() {
  const [data, setData] = useState({ name:'', email:'', frustration:'' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const set = (k,v) => setData(p=>({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (supabase) {
        const { error } = await supabase.from('owner_leads').insert([{ name: data.name, email: data.email, frustration: data.frustration }]);
        if (error) throw error;
      }
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div className="form-success">
      <div className="success-icon">✓</div>
      <h4>¡Estás en lista!</h4>
      <p>Te avisaremos en cuanto lancemos en tu zona. Acceso prioritario garantizado.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="owner-name">Tu nombre</label>
        <input id="owner-name" type="text" placeholder="Ej. Laura García" required value={data.name} onChange={e=>set('name',e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="owner-email">Email</label>
        <input id="owner-email" type="email" placeholder="tu@email.com" required value={data.email} onChange={e=>set('email',e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="owner-frustration">¿Cuál es tu mayor frustración al buscar residencia?</label>
        <textarea id="owner-frustration" placeholder="Ej. Nunca sé si hay plaza hasta que llamo..." value={data.frustration} onChange={e=>set('frustration',e.target.value)} />
      </div>
      {status === 'error' && <p className="error-text">Algo salió mal. Inténtalo de nuevo.</p>}
      <button type="submit" className="btn btn-primary btn-full" disabled={status==='loading'}>
        {status==='loading' ? 'Enviando...' : '🐾 Quiero acceso anticipado'}
      </button>
      <p className="form-note">Sin spam. Solo te avisamos cuando lancemos.</p>
    </form>
  );
}

// ─── Business Form ────────────────────────────────────────────────
function BusinessForm() {
  const [data, setData] = useState({ kennelName:'', location:'', monthlyBookings:'', email:'' });
  const [status, setStatus] = useState('idle');
  const set = (k,v) => setData(p=>({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (supabase) {
        const { error } = await supabase.from('business_leads').insert([{ kennel_name: data.kennelName, location: data.location, monthly_bookings: data.monthlyBookings, email: data.email }]);
        if (error) throw error;
      }
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div className="form-success">
      <div className="success-icon">✓</div>
      <h4>¡Nos ponemos en contacto!</h4>
      <p>Te contactaremos en las próximas 48 horas para darte acceso al panel de gestión.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="biz-name">Nombre de tu residencia</label>
        <input id="biz-name" type="text" placeholder="Ej. Residencia Canina El Bosque" required value={data.kennelName} onChange={e=>set('kennelName',e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="biz-location">Ciudad / Localización</label>
        <input id="biz-location" type="text" placeholder="Ej. Madrid, Getafe..." required value={data.location} onChange={e=>set('location',e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="biz-bookings">¿Cuántas reservas gestionáis al mes?</label>
        <select id="biz-bookings" value={data.monthlyBookings} onChange={e=>set('monthlyBookings',e.target.value)} required>
          <option value="">Selecciona un rango</option>
          <option value="1-20">1–20 reservas</option>
          <option value="21-50">21–50 reservas</option>
          <option value="51-100">51–100 reservas</option>
          <option value="100+">Más de 100 reservas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="biz-email">Email de contacto</label>
        <input id="biz-email" type="email" placeholder="reservas@miresidencia.com" required value={data.email} onChange={e=>set('email',e.target.value)} />
      </div>
      {status === 'error' && <p className="error-text">Algo salió mal. Inténtalo de nuevo.</p>}
      <button type="submit" className="btn btn-business btn-full" disabled={status==='loading'}>
        {status==='loading' ? 'Enviando...' : 'Unirme como residencia →'}
      </button>
      <p className="form-note">Acceso gratuito durante el lanzamiento.</p>
    </form>
  );
}

// ─── Lead Capture Section ─────────────────────────────────────────
function LeadCapture() {
  return (
    <section className="section forms-section" id="unirse">
      <div className="container">
        <div className="text-center" style={{marginBottom:'48px'}}>
          <p className="section-eyebrow blue">Únete ahora</p>
          <h2 className="section-title">Sé de los primeros.</h2>
          <p className="section-sub">Acceso prioritario para dueños y residencias que se apunten hoy.</p>
        </div>
        <div className="forms-grid">
          <div className="form-card owner-card">
            <div className="form-card-header">
              <span className="form-card-icon">🐶</span>
              <h3>Soy dueño de un perro</h3>
              <p className="form-card-sub">Quiero reservar residencias profesionales online, sin WhatsApp.</p>
            </div>
            <OwnerForm />
          </div>
          <div className="form-card business-card">
            <div className="form-card-header">
              <span className="form-card-icon">🏠</span>
              <h3>Tengo una residencia</h3>
              <p className="form-card-sub">Quiero automatizar mis reservas y eliminar la gestión manual.</p>
            </div>
            <BusinessForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Owner Modal ──────────────────────────────────────────────────
function OwnerModal({ onClose }) {
  const [data, setData] = useState({ name:'', email:'', frustration:'' });
  const [status, setStatus] = useState('idle');
  const set = (k,v) => setData(p=>({...p,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (supabase) {
        const { error } = await supabase.from('owner_leads').insert([{ name: data.name, email: data.email, frustration: data.frustration }]);
        if (error) throw error;
      }
      setStatus('success');
    } catch { setStatus('error'); }
  };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        {status === 'success' ? (
          <div className="form-success">
            <div className="success-icon">✓</div>
            <h4>¡Estás en lista de espera!</h4>
            <p>Te avisaremos cuando lancemos en tu zona. Acceso prioritario + 20% de descuento en tu primera reserva.</p>
            <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={onClose}>Genial, gracias 🐾</button>
          </div>
        ) : (
          <>
            <span className="modal-icon">🔍</span>
            <h2>Buscar residencias</h2>
            <p className="modal-sub">Estamos lanzando. Déjanos tus datos y tendrás acceso prioritario con <strong>20% de descuento</strong> en tu primera reserva.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="m-name">Tu nombre</label>
                <input id="m-name" type="text" placeholder="Ej. Laura García" required value={data.name} onChange={e=>set('name',e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="m-email">Email</label>
                <input id="m-email" type="email" placeholder="tu@email.com" required value={data.email} onChange={e=>set('email',e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="m-frustration">¿Cuál es tu mayor frustración al buscar residencia?</label>
                <textarea id="m-frustration" placeholder="Ej. Nunca sé si hay disponibilidad real..." value={data.frustration} onChange={e=>set('frustration',e.target.value)} />
              </div>
              {status === 'error' && <p className="error-text">Algo salió mal. Inténtalo de nuevo.</p>}
              <button type="submit" className="btn btn-primary btn-full" disabled={status==='loading'}>
                {status==='loading' ? 'Enviando...' : '🐾 Quiero acceso anticipado'}
              </button>
              <p className="form-note">Sin spam. Sin cuotas. Solo te avisamos cuando lancemos.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">🐾 Booking Canino</div>
        <p className="footer-tagline">Solo centros profesionales. Solo amor por los perros.</p>
        <div className="footer-links">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos de uso</a>
          <a href="mailto:hola@bookingcanino.com">Contacto</a>
        </div>
        <p className="footer-copy">© 2025 Booking Canino. Hecho con ❤️ para amantes de los perros.</p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar onFindKennel={() => setShowModal(true)} />
      <main>
        <Hero onFindKennel={() => setShowModal(true)} />
        <ProblemSolution />
        <HowItWorksOwners onFindKennel={() => setShowModal(true)} />
        <BusinessSection />
        <HowItWorksBusiness />
        <TrustStrip />
        <LeadCapture />
      </main>
      <Footer />
      {showModal && <OwnerModal onClose={() => setShowModal(false)} />}
    </>
  );
}
