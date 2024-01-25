import React from 'react'
import { createRoot } from 'react-dom/client';
import { MainApp } from './Infrastructure'
import '/src/UI/Styles/app.css'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainApp />);