export default function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h2 className="about-title">Restoran Hakkında</h2>
        <p className="about-text">
          Lezzetin ve kalite anlayışının birleştiği mekanımıza hoş geldiniz. Menümüzdeki her ürün, taze malzemelerle ve özenle hazırlanmaktadır.
        </p>

        <h3 className="about-subtitle">Adres</h3>
        <p className="about-text">📍 Atatürk Caddesi No:123, Ankara</p>

        <div className="map-container">
          <iframe
            title="Restoran Konumu"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.707665514257!2d32.85974121535996!3d39.92078897942656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34fbcaaaaaaab%3A0xb5a4aaf7ac4e3a33!2sAtat%C3%BCrk%20Caddesi%2C%20Ankara!5e0!3m2!1str!2str!4v1622643612345!5m2!1str!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
