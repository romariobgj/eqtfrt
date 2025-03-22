import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Buscar() {
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const navigate = useNavigate();

  // Função para validar CPF
  const validateCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  // Função para validar data de nascimento
  const validateBirthdate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    
    // Verifica formato básico
    if (!day || !month || !year) return false;
    
    // Verifica ranges básicos
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    // Verifica dias por mês
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) return false;

    // Verifica se é uma data futura
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    if (inputDate > today) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica formato do CPF
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfPattern.test(cpf)) {
      alert('Por favor, insira um CPF válido no formato 000.000.000-00');
      return;
    }

    // Validação completa do CPF
    if (!validateCpf(cpf)) {
      alert('CPF inválido');
      return;
    }

    // Verifica formato da data
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(birthdate)) {
      alert('Por favor, insira a data no formato dd/MM/aaaa');
      return;
    }

    // Validação completa da data
    if (!validateBirthdate(birthdate)) {
      alert('Data de nascimento inválida');
      return;
    }

    navigate(`/debitos?cpf=${cpf}`);
  };

  const formatCpf = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  };

  const formatDate = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    return value;
  };

  return (
    <div className="container">
      <img src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png" alt="Logo" className="logo" />
      <div className="section">
        <h2>Segunda via e outros serviços</h2>
        <p>Para você que é o <span className="bold">titular</span>:</p>
        <form onSubmit={handleSubmit}>
          <p className="bold">Seu CPF ou CNPJ</p>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            placeholder="Digite aqui"
            maxLength="14"
            required
          />
          <p className="bold">Sua data de nascimento</p>
          <input
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(formatDate(e.target.value))}
            placeholder="dd/mm/aaaa"
            maxLength="10"
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Buscar;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Buscar() {
//   const [cpf, setCpf] = useState('');
//   const [birthdate, setBirthdate] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
//     const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

//     if (!cpfPattern.test(cpf)) {
//       alert('Por favor, insira um CPF válido no formato 000.000.000-00');
//       return;
//     }
//     if (!datePattern.test(birthdate)) {
//       alert('Por favor, insira a data no formato dd/MM/aaaa');
//       return;
//     }

//     navigate(`/debitos?cpf=${cpf}`);
//   };

//   const formatCpf = (value) => {
//     value = value.replace(/\D/g, '');
//     if (value.length > 11) value = value.substring(0, 11);
//     value = value.replace(/(\d{3})(\d)/, '$1.$2');
//     value = value.replace(/(\d{3})(\d)/, '$1.$2');
//     value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
//     return value;
//   };

//   const formatDate = (value) => {
//     value = value.replace(/\D/g, '');
//     if (value.length > 8) value = value.substring(0, 8);
//     value = value.replace(/(\d{2})(\d)/, '$1/$2');
//     value = value.replace(/(\d{2})(\d)/, '$1/$2');
//     return value;
//   };

//   return (
//     <div className="container">
//       <img src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png" alt="Logo" className="logo" />
//       <div className="section">
//         <h2>Segunda via e outros serviços</h2>
//         <p>Para você que é o <span className="bold">titular</span>:</p>
//         <form onSubmit={handleSubmit}>
//           <p className="bold">Seu CPF ou CNPJ</p>
//           <input
//             type="text"
//             value={cpf}
//             onChange={(e) => setCpf(formatCpf(e.target.value))}
//             placeholder="Digite aqui"
//             maxLength="14"
//             required
//           />
//           <p className="bold">Sua data de nascimento</p>
//           <input
//             type="text"
//             value={birthdate}
//             onChange={(e) => setBirthdate(formatDate(e.target.value))}
//             placeholder="dd/MM/aaaa"
//             maxLength="10"
//             required
//           />
//           <button type="submit">Entrar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Buscar;