import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '192.168.1.36',
    port: 3000 // Puedes cambiar este puerto según tu preferencia
  }
})
