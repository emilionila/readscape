import { createRoot } from 'react-dom/client';
import React from "react";
import {Root} from "./Root";

const container = document.getElementById('root');

createRoot(container).render(<Root/>)
