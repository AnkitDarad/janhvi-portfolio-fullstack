import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body);
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: env.EMAIL_USER,
                      pass: env.EMAIL_PASS,
                    },
                  });

                  await transporter.sendMail({
                    from: `"Portfolio [Dev]" <${env.EMAIL_USER}>`,
                    to: env.EMAIL_TO,
                    replyTo: data.email,
                    subject: `📧 [Dev] New Inquiry: ${data.subject}`,
                    text: `New Portfolio Message\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
                    html: `
                      <div style="font-family: sans-serif; background-color: #f4f4f4; padding: 20px;">
                        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">
                          <div style="background-color: #333; color: #fff; padding: 20px; text-align: center;">
                            <h2 style="margin: 0;">New Message (Local Dev)</h2>
                          </div>
                          <div style="padding: 30px;">
                            <p><strong>From:</strong> ${data.name} (${data.email})</p>
                            <p><strong>Subject:</strong> ${data.subject}</p>
                            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border: 1px solid #eee; margin-top: 20px;">
                              ${data.message.replace(/\n/g, '<br>')}
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                  });

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, message: 'Email sent successfully (Dev Mode)' }));
                } catch (error) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, message: error.message }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    server: {
      host: '127.0.0.1',
      port: 3000,
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
    },
  }
})
