import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((_req, res) => {
	fs.readFile('./public/index.html', (error, page) => {
		if (error) {
			res.writeHead(500);
			res.end('Unable to load chat app');
			return;
		}

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(page);
	});
});

const wss = new WebSocketServer({ server });

function broadcast(message) {
	const data = JSON.stringify(message);
	for (const client of wss.clients) {
		if (client.readyState === 1) {
			client.send(data);
		}
	}
}

wss.on('connection', (socket, req) => {
	const username = new URL(req.url, 'http://localhost').searchParams.get(
		'username',
	);

	broadcast({ type: 'system', text: `${username} joined` });

	socket.on('message', (message) => {
		const { username, text } = JSON.parse(message);
		broadcast({ type: 'chat', username, text });
	});

	socket.on('close', () => {
		broadcast({ type: 'system', text: `${username} left` });
	});
});

server.listen(PORT, () => {
	console.log('Chat server running at http://localhost:3001');
});
