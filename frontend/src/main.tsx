import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// Task 2: The Modern E-Commerce Catalog Dashboard
// Initialize a modern React app using Vite with the TypeScript template.

// Build a dashboard that fetches data from a mock catalog API (Use: [https://fakestoreapi.com/products](https://fakestoreapi.com/products)).

// The Rules:

// Use a typed custom state array: const [products, setProducts] = useState<Product[]>([]);

// Fetch the data inside a useEffect hook.

// Map through the data to display clean product cards using basic Flexbox or Grid.

// Add a search input bar at the top to filter items by title in real-time as you type.