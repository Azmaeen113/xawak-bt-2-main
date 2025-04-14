import React from 'react';

const SolarSystem: React.FC = () => {
  return (
    <div className="solar-system">
      <article className="solar-system__sun"></article>
      <section className="solar-system__mercury-trajectory">
        <article className="solar-system__mercury-trajectory__mercury"></article>
      </section>
      <section className="solar-system__venus-trajectory">
        <article className="solar-system__venus-trajectory__venus"></article>
      </section>
      <section className="solar-system__earth-trajectory">
        <article className="solar-system__earth-trajectory__earth"></article>
      </section>
      <section className="solar-system__mars-trajectory">
        <article className="solar-system__mars-trajectory__mars"></article>
      </section>
      {/* Logo SVG */}
      <svg 
        id="logo" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 400"
        style={{ 
          width: '8dvmin', 
          aspectRatio: '1', 
          position: 'absolute',
          bottom: '1.6dvmin',
          right: '1.6dvmin',
          opacity: '0.3',
          filter: 'saturate(60%)',
          transition: 'opacity 0.7s linear, filter 0.7s linear'
        }}
      >
        <circle cx="200" cy="200" r="196.6" />
        <path d="M302.9,84.4H170.5h-8.1c-23.3,0-34.9,9.1-45,29.4l-26.2,52.3c-6,12.2-8.9,20.8-8.9,34.5c0,11.9,3.3,22,8.6,32.8l27.1,54.3c10.4,21.2,23.9,28,47.1,28h20.3c0,0,0,0,0,0c0,0,0,0,0,0h29.2c7.8,0,14.9-3.5,14.9-14.2c0-10.7-7.2-14.2-14.9-14.2h-15.3v-96.6h74.3c7.8,0,14.9-4.6,14.9-15.4c0-10.7-7.2-15.4-14.9-15.4h-74.3v-45.2h103.6c7.8,0,14.9-4.3,14.9-15.1C317.8,88.8,310.6,84.4,302.9,84.4z M170.3,287.1h-5.5c-12.5,0-15.5-2.2-20.9-13.2l-26.2-53.4c-3.3-6.9-5.7-12.1-5.7-19.6c0-10.1,3.3-15.9,7.5-24.5l24.8-49.8c6.3-12.8,8.9-12,22.7-12h3.4V287.1z" />
      </svg>
    </div>
  );
};

export default SolarSystem;
