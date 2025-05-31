import { useState } from 'react';
import './App.css';

function App() {
  const [selectedMethod, setSelectedMethod] = useState('sqrt');
  const [x0, setX0] = useState(0.0);
  const [maxIter, setMaxIter] = useState(100);
  const [tolerance, setTolerance] = useState(0.01);
  const [results, setResults] = useState([]);
  const [currentFunction, setCurrentFunction] = useState('x² - 2x - 3 = 0');

  // Fungsi-fungsi iterasi
  const iterationFunctions = {
    sqrt: (x) => Math.sqrt(2 * x + 3),
    fraction: (x) => 3 / (x - 2),
    polynomial: (x) => (Math.pow(x, 2) - 3) / 2
  };

  // Metode iterasi titik tetap
  const fixedPointIteration = () => {
    let iterations = [];
    let x = parseFloat(x0);
    let iter = 0;
    let error = 1;
    let gx;

    while (error > tolerance && iter < maxIter) {
      const prevX = x;
      
      // Pilih fungsi berdasarkan metode yang dipilih
      switch(selectedMethod) {
        case 'sqrt':
          gx = iterationFunctions.sqrt(x);
          break;
        case 'fraction':
          gx = iterationFunctions.fraction(x);
          break;
        case 'polynomial':
          gx = iterationFunctions.polynomial(x);
          break;
        default:
          gx = iterationFunctions.sqrt(x);
      }

      x = gx;
      error = Math.abs(x - prevX);
      
      iterations.push({
        iteration: iter + 1,
        x: x,
        error: error
      });

      iter++;
    }

    setResults(iterations);
  };

  return (
    <div className="app-container">
      <h1>Metode Iterasi Titik Tetap</h1>
      <div className="function-display">
        <h2>Persamaan: {currentFunction}</h2>
      </div>

      <div className="method-selection">
        <h2>Pilih Fungsi Iterasi:</h2>
        <div className="method-options">
          <label>
            <input 
              type="radio" 
              name="method" 
              checked={selectedMethod === 'sqrt'} 
              onChange={() => setSelectedMethod('sqrt')}
            />
            x = √(2x + 3)
          </label>
          <label>
            <input 
              type="radio" 
              name="method" 
              checked={selectedMethod === 'fraction'} 
              onChange={() => setSelectedMethod('fraction')}
            />
            x = 3/(x - 2)
          </label>
          <label>
            <input 
              type="radio" 
              name="method" 
              checked={selectedMethod === 'polynomial'} 
              onChange={() => setSelectedMethod('polynomial')}
            />
            x = (x² - 3)/2
          </label>
        </div>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label>Nilai awal (x₀):</label>
          <input 
            type="number" 
            value={x0} 
            onChange={(e) => setX0(e.target.value)} 
            step="0.1"
          />
        </div>
        
        <div className="input-group">
          <label>Jumlah iterasi maksimum:</label>
          <input 
            type="number" 
            value={maxIter} 
            onChange={(e) => setMaxIter(e.target.value)} 
            min="1"
          />
        </div>
        
        <div className="input-group">
          <label>Toleransi kesalahan (ε):</label>
          <input 
            type="number" 
            value={tolerance} 
            onChange={(e) => setTolerance(e.target.value)} 
            step="0.001"
            min="0.0001"
          />
        </div>
      </div>

      <button className="calculate-btn" onClick={fixedPointIteration}>
        Hitung Akar
      </button>

      {results.length > 0 && (
        <div className="results-section">
          <h2>Hasil Iterasi</h2>
          <div className="final-result">
            <p>Akar hampiran: <strong>{results[results.length - 1].x.toFixed(6)}</strong></p>
            <p>Jumlah iterasi: <strong>{results.length}</strong></p>
            <p>Error akhir: <strong>{results[results.length - 1].error.toFixed(6)}</strong></p>
          </div>
          
          <div className="iteration-table">
            <table>
              <thead>
                <tr>
                  <th>Iterasi</th>
                  <th>x</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    <td>{row.iteration}</td>
                    <td>{row.x.toFixed(6)}</td>
                    <td>{row.error.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;