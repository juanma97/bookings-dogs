import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const App = () => {
  // State to manage the user journey flow
  const [step, setStep] = useState('landing'); // landing, search, email, success
  const [formData, setFormData] = useState({
    city: '',
    dates: '',
    dogSize: 'mediano',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to log analytics events
  const trackEvent = (eventName, params = {}) => {
    console.log(`[Analytics Event] ${eventName}`, params);
  };

  // Scroll to top on step change for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Event handlers
  const handleStartSearch = () => {
    trackEvent('cta_click', { section: 'hero' });
    trackEvent('search_started');
    setStep('search');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    trackEvent('search_completed', { 
      city: formData.city, 
      dog_size: formData.dogSize 
    });
    setStep('email');
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    trackEvent('lead_submitted', { email: formData.email });

    try {
      if (supabase) {
        const { data, error: sbError } = await supabase
          .from('leads')
          .insert([
            {
              email: formData.email,
              city: formData.city,
              dog_size: formData.dogSize,
            }
          ]);

        if (sbError) throw sbError;
      } else {
        console.warn('Simulating lead submission (No Supabase client found)');
      }
      
      setStep('success');
    } catch (err) {
      console.error('Error submitting lead:', err);
      // Even if there is an error, for validation we can show success if the data is tracked.
      // But let's show an error if it fails to actually save.
      setError('Hubo un problema al guardar tus datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* HEADER / LOGO */}
      <nav className="navbar">
        <div className="logo">Barkly</div>
      </nav>

      <main className="content">
        {step === 'landing' && (
          <section className="hero">
            <h1 className="headline">Reserva guarderías para tu perro en 2 minutos</h1>
            <p className="subheadline">
              Olvídate de llamadas, WhatsApps sin respuesta y la incertidumbre. 
              Encuentra y reserva guarderías de confianza fácilmente.
            </p>
            <button className="cta-button" onClick={handleStartSearch}>
              Buscar guardería
            </button>
            <p className="secondary-text">Próximamente en tu ciudad — acceso anticipado con descuento</p>

            <div className="features-grid">
              <div className="feature-card problem">
                <h2>Reservar guardería sigue siendo un caos</h2>
                <ul>
                  <li>Tienes que llamar o escribir a varias guarderías</li>
                  <li>No sabes si hay disponibilidad real</li>
                  <li>Tardan horas o días en responder</li>
                  <li>Tienes que repetir la información cada vez</li>
                </ul>
              </div>

              <div className="feature-card solution">
                <h2>Una forma mucho más simple</h2>
                <ul>
                  <li>Busca guarderías disponibles en segundos</li>
                  <li>Reserva online sin llamadas</li>
                  <li>Perfil de tu perro guardado</li>
                  <li>Solo guarderías verificadas</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {step === 'search' && (
          <section className="form-section">
            <div className="form-card">
              <h2>¿Cuándo y dónde?</h2>
              <form onSubmit={handleSearchSubmit}>
                <div className="form-group">
                  <label htmlFor="city">Ciudad</label>
                  <input 
                    type="text" 
                    id="city" 
                    placeholder="Ej. Madrid, Barcelona..." 
                    required 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dates">Fechas</label>
                  <input 
                    type="text" 
                    id="dates" 
                    placeholder="Ej. 12/04 - 15/04" 
                    required 
                    value={formData.dates}
                    onChange={(e) => setFormData({...formData, dates: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dogSize">Tamaño del perro</label>
                  <select 
                    id="dogSize" 
                    value={formData.dogSize}
                    onChange={(e) => setFormData({...formData, dogSize: e.target.value})}
                  >
                    <option value="pequeño">Pequeño (0-10kg)</option>
                    <option value="mediano">Mediano (10-25kg)</option>
                    <option value="grande">Grande (+25kg)</option>
                  </select>
                </div>
                <button type="submit" className="cta-button full-width">Buscar</button>
              </form>
            </div>
          </section>
        )}

        {step === 'email' && (
          <section className="lead-section">
            <div className="form-card text-center">
              <span className="emoji">🐶</span>
              <h2>Estamos lanzando en tu zona</h2>
              <p className="lead-subtext">
                Déjanos tu email y tendrás acceso prioritario + <strong>20% de descuento</strong> en tu primera reserva.
              </p>
              <form onSubmit={handleLeadSubmit}>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Tu mejor email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button 
                  type="submit" 
                  className="cta-button full-width" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Quiero acceso anticipado'}
                </button>
              </form>
            </div>
          </section>
        )}

        {step === 'success' && (
          <section className="success-section text-center">
            <div className="success-card">
              <div className="check-icon">✓</div>
              <h2>¡Gracias!</h2>
              <p>Te avisaremos cuando lancemos 🚀</p>
              <button 
                className="secondary-button"
                onClick={() => setStep('landing')}
              >
                Volver al inicio
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Barkly. Hecho con ❤️ para amantes de los perros.</p>
      </footer>
    </div>
  );
};

export default App;
