import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

// A simple plugin to save plasma.png directly from dev server
const plasmaSavePlugin = () => {
  return {
    name: 'plasma-save-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-plasma', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { image } = JSON.parse(body);
              if (!image) throw new Error('No image data provided');
              
              // Remove the data URI header "data:image/png;base64,"
              const base64Data = image.replace(/^data:image\/png;base64,/, "");
              
              const targetDir = '/Users/kaiserwetter/Projects/26-Project/2604-Narrio/Narrio/ppt-asset';
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              let filename = 'plasma.png';
              let filePath = path.join(targetDir, filename);
              let counter = 1;
              
              while (fs.existsSync(filePath)) {
                filename = `plasma-${counter}.png`;
                filePath = path.join(targetDir, filename);
                counter++;
              }
              
              fs.writeFileSync(filePath, base64Data, 'base64');
              
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, filename, path: filePath }));
            } catch (err) {
              res.statusCode = 500;
              res.end(err.message);
            }
          });
        } else {
          next();
        }
      });
    }
  };
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), plasmaSavePlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Proxy API requests to backend
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8000',
          changeOrigin: true,
        },
        '/ws': {
          target: (env.VITE_API_BASE_URL || 'http://localhost:8000').replace('http', 'ws'),
          ws: true,
        },
      },
    },
  };
});
