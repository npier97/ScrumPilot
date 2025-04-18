import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoot from './AppRoot';
import './utils/i18n';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppRoot />
    </StrictMode>
  );
}
