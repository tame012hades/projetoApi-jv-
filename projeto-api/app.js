import express from 'express';

const app = express();

app.use(express.json());


app.locals.fornecedores = [
  { id: 1, nome: "Distribuidora Alvorada", contato: "alvorada@email.com" }
];

app.locals.produtos = [
  { id: 1, nome: "Arroz 5kg", preco: 25.00, estoque: 50, estoqueMinimo: 10, fornecedorId: 1 },
  { id: 2, nome: "Feijão 1kg", preco: 8.50, estoque: 8, estoqueMinimo: 15, fornecedorId: 1 },
  { id: 3, nome: "Óleo de Soja", preco: 7.20, estoque: 30, estoqueMinimo: 5, fornecedorId: 1 }
];


app.locals.vendas = [];
app.locals.itensVenda = [];
app.locals.movimentacoes = [];


app.get('/', (req, res) => {
  res.send("<h1>API de Controle de Estoque Comercial no Ar!</h1><p>Adicione <b>/api/produtos</b> na barra de endereços para ver a lista.</p>");
});

app.get('/api/produtos', (req, res) => {
  res.json(app.locals.produtos);
});

app.post('/api/produtos', (req, res) => {
  const { nome, preco, estoque, estoqueMinimo, fornecedorId } = req.body;
  
  if (!nome || !preco || estoque === undefined || !estoqueMinimo || !fornecedorId) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios."
    });
  }

  const produtosAtuais = app.locals.produtos;
  
  const novoProduto = {
    id: produtosAtuais.length > 0 ? produtosAtuais[produtosAtuais.length - 1].id + 1 : 1,
    nome,
    preco: Number(preco),
    estoque: Number(estoque),
    estoqueMinimo: Number(estoqueMinimo),
    fornecedorId: Number(fornecedorId)
  };

  app.locals.produtos = [...produtosAtuais, novoProduto];

  res.status(201).json(novoProduto);
});

export default app;