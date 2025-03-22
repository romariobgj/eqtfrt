import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function PagamentoPix() {
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const [cpf, setCpf] = useState('');
  const [pixData, setPixData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const amountParam = params.get('amount');
    const cpfParam = params.get('cpf');
    setAmount(amountParam);
    setCpf(cpfParam);

    const fetchPix = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL, {
          amount: amountParam,
          cpf: cpfParam
        });
        setPixData(response.data.pix);
        console.log(response);
      } catch (error) {
        console.error('Erro:', error);
        setPixData({ error: 'Erro ao gerar o PIX.' });
      }
    };
    fetchPix();
  }, [location]);

  const copyPixCode = () => {
    if (pixData.qrcode && !pixData.error) {
      navigator.clipboard.writeText(pixData.qrcode)
        .then(() => alert('Código PIX copiado!'))
        .catch(() => alert('Erro ao copiar o código PIX.'));
    } else {
      alert('Nenhum código PIX disponível.');
    }
  };

  return (
    <div className="container">
      <img src="https://www.equatorialenergia.com.br/wp-content/themes/equatorial-energia-child/img/logo-white.png" alt="Logo" className="logo" />
      <div className="section">
        <h2>Pagamento via PIX</h2>
        <p>Valor a pagar: <span className="bold">
          {(parseInt(amount) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span></p>
        <p>Escaneie o QR Code ou copie o código PIX:</p>
        <div className="qr-code">
        {pixData.qrcode && !pixData.error ? (
            <QRCodeSVG value={pixData.qrcode} size={200} /> // Gera o QR Code a partir da string
          ) : (
            <p>{pixData.error || 'Carregando...'}</p>
          )}
        </div>
        <div className="pix-code">{pixData.qrcode || pixData.error}</div>
        <button onClick={copyPixCode}>Copiar Código PIX</button>
        <button onClick={() => window.location.href = '/debitos?cpf=' + cpf}>Voltar</button>
      </div>
    </div>
  );
}

export default PagamentoPix;