import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './app'

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(<App />);