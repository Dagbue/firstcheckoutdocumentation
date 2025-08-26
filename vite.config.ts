import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: "redirect",
      configureServer(server) {
        server.middlewares.use((req: any, res, next) => {
          if (req?.url === "/") {
            res.statusCode = 302;
            res.setHeader("Location", "/onlinedoc/");
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ],
  base: "/onlinedoc",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
