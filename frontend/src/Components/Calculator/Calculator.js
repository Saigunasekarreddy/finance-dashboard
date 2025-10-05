import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.navContainer}>
        <Navigation active={active} setActive={setActive} />
      </div>
      <div style={styles.calculatorWrapper}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          ⬅ Back
        </button>

        <div style={styles.calculatorContainer}>
          <div style={styles.screen}>{input || '0'}</div>
          <div style={styles.buttonContainer}>
            {['7', '8', '9', '/',
              '4', '5', '6', '*',
              '1', '2', '3', '-',
              '0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '=' ? handleEvaluate() : handleButtonClick(btn)}
                style={styles.button}
              >
                {btn}
              </button>
            ))}
          </div>
          <button onClick={handleClear} style={styles.clearButton}>Clear</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
  },
  navContainer: {
    width: '250px',
    backgroundColor: '#fff',
    height: '100vh',
    overflowY: 'auto',
    borderRight: '1px solid #e0e0e0',
  },
  calculatorWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.2s ease-in-out',
  },
  calculatorContainer: {
    width: '300px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  screen: {
    width: '100%',
    height: '60px',
    backgroundColor: '#f1f3f6',
    padding: '10px',
    textAlign: 'right',
    fontSize: '26px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    width: '100%',
  },
  button: {
    padding: '18px',
    fontSize: '20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e7ff',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  clearButton: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    backgroundColor: '#ff4e4e',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    transition: 'background 0.3s ease',
  },
};

export default Calculator;
