import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import './database';
import { routes } from './routes';

const app = express();

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo ws

io.on('connection', (socket: Socket) => {
  console.log("Se conectou", socket.id);
})

app.use(express.json());

app.use(routes);

/**
 * GET = Buscas
 * POST =  Criação
 * PUT = Alteração
 * DELETE =  Deletar
 * PATCH = Alterar uma informação específica
 */

app.get('/', (request, response) => {
  return response.json({
    message: 'Olá NLW 05!'
  });
});

app.post('/', (request, response) => {
  return response.json({ message: 'Usúario salvo com sucesso!' });
});

http.listen(3333, () => console.log('Server is running on port 3333'));
