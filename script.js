// Cookie consent management
const STORAGE_KEY = 'cookie-consent';

const necessaryCookies = {
  id: 'necessary',
  label: 'Cookies técnicas',
  description: 'Necesarias para el funcionamiento básico del sitio',
  enabled: true
};

const analyticsCookies = {
  id: 'analytics',
  label: 'Cookies analíticas',
  description: 'Google Analytics para medir el tráfico',
  enabled: false
};

const advertisingCookies = {
  id: 'advertising',
  label: 'Cookies de publicidad',
  description: 'Segmentación de anuncios en redes sociales y Google Ads',
  enabled: false
};

function getCookies() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return {
    necessary: true,
    analytics: false,
    advertising: false
  };
}

function saveCookies(consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  updateUI(consent);
}

function updateUI(consent) {
  // Update necessary cookies - always enabled
  document.getElementById('cookie-necessary').checked = consent.necessary;
  
  // Update analytics
  document.getElementById('cookie-analytics').checked = consent.analytics;
  
  // Update advertising
  document.getElementById('cookie-advertising').checked = consent.advertising;
  
  // Show/hide based on consent
  if (consent.necessary) {
    document.querySelectorAll('.cookie-section').forEach(section => {
      section.style.display = 'block';
    });
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  const consent = getCookies();
  updateUI(consent);
  
  // Accept all button
  document.getElementById('accept-all').addEventListener('click', () => {
    saveCookies({
      necessary: true,
      analytics: true,
      advertising: true
    });
  });
  
  // Reject all button (non-necessary disabled)
  document.getElementById('reject-all').addEventListener('click', () => {
    saveCookies({
      necessary: true,
      analytics: false,
      advertising: false
    });
  });
  
  // Individual toggles
  document.querySelectorAll('input[name="cookie-type"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const type = e.target.value;
      consent[type] = e.target.checked;
      saveCookies(consent);
    });
  });
});