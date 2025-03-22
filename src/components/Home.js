import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg_hi.jpg'; // Importa a imagem da pasta assets

function Home() {
  const states = ['ALAGOAS', 'AMAPÁ', 'GOIÁS', 'MARANHÃO', 'PARÁ', 'PIAUÍ', 'RIO GRANDE DO SUL'];

  return (
    <div className="container">
      <img src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png" alt="Logo" className="logo" />
      <h1>GRUPO EQUATORIAL</h1>
      <p>RELAÇÕES COM INVESTIDORES</p>
      <p>LGPD</p>
      <div className="section">
        <h2>Escolha o seu estado:</h2>
        {states.map((state) => (
          <Link key={state} to="/buscar" className="button">{state}</Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   const states = ['ALAGOAS', 'AMAPÁ', 'GOIÁS', 'MARANHÃO', 'PARÁ', 'PIAUÍ', 'RIO GRANDE DO SUL'];

//   return (
//     <div className="container">
//       <img src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png" alt="Logo" className="logo" />
//       <h1>GRUPO EQUATORIAL</h1>
//       <p>RELAÇÕES COM INVESTIDORES</p>
//       <p>LGPD</p>
//       <div className="section">
//         <h2>Escolha o seu estado:</h2>
//         {states.map((state) => (
//           <Link key={state} to="/buscar" className="button">{state}</Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;