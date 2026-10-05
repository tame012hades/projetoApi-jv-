import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());


export const fornecedores = [
    { id: 1, nome: "Distribuidora Alvorada", contato: "alvorada@email.com" }
];

export let produtos = [
    { id: 1, nome: "Arroz 5kg", preco: 25.00, estoque: 50, estoqueMinimo: 10, fornecedorId: 1 },
    { id: 2, nome: "Feijão 1kg", preco: 8.50, estoque: 8, estoqueMinimo: 15, fornecedorId: 1 },
    { id: 3, nome: "Óleo de Soja", preco: 7.20, estoque: 30, estoqueMinimo: 5, fornecedorId: 1 }
];

app.get('/', (req, res) => {
    res.send("<h1>API de Controle de Estoque Comercial no Ar!</h1><p>Adicione <b>/api/produtos</b> na barra de endereços para ver a lista.</p>");
});


app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, estoque, estoqueMinimo, fornecedorId } = req.body;
    
    if (!nome || !preco || estoque === undefined || !estoqueMinimo || !fornecedorId) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });
    }

    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
        nome,
        preco: Number(preco),
        estoque: Number(estoque),
        estoqueMinimo: Number(estoqueMinimo),
        fornecedorId: Number(fornecedorId)
    };

    produtos = [...produtos, novoProduto];

    res.status(201).json(novoProduto);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});