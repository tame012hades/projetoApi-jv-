const app = require('./src/app');
const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORTA}!`);
  console.log(`Disponível em: http://localhost:${PORTA}`);
});
