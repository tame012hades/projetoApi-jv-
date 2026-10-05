javascript
const express = require('express');
const app = express();
const PORTA = 3000;


app.use(express.json());


const fornecedores = [
  { id: 1, nome: "Distribuidora Alvorada", contato: "alvorada@email.com" }
];

const produtos = [
  { id: 1, nome: "Arroz 5kg", preco: 25.00, estoque: 50, estoqueMinimo: 10, fornecedorId: 1 },
  { id: 2, nome: "Feijão 1kg", preco: 8.50, estoque: 8, estoqueMinimo: 15, fornecedorId: 1 },
  { id: 3, nome: "Óleo de Soja", preco: 7.20, estoque: 30, estoqueMinimo: 5, fornecedorId: 1 }
];



 
app.post('/api/produtos', (req, res) => {
  const { nome, preco, estoque, estoqueMinimo, fornecedorId } = req.body;
  
  if (!nome || !preco || estoque === undefined || !estoqueMinimo || !fornecedorId) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco: Number(preco),
    estoque: Number(estoque),
    estoqueMinimo: Number(estoqueMinimo),
    fornecedorId: Number(fornecedorId)
  };

  produtos.push(novoProduto);
  return res.status(201).json(novoProduto);
});


app.get('/api/produtos', (req, res) => {
  return res.json(produtos);
});


app.get('/', (req, res) => {
  res.json({ mensagem: "API Controle de Estoque - Finalizada Parte 1!" });
});

app.listen(PORTA, () => {
  console.log(`Servidor da Parte 1 rodando com sucesso na porta ${PORTA}!`);
});