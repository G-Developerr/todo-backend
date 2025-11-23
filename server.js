const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Προσωρινή "βάση δεδομένων" (array στη μνήμη)
let todos = [
    { id: 1, text: "Μάθε React", completed: false },
    { id: 2, text: "Φτιάξε το backend", completed: false },
];

// Routes
// ROOT route - Αρχική σελίδα
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Todo API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
          }
          h1 { margin: 0 0 20px 0; }
          a {
            color: #fff;
            text-decoration: none;
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 8px;
            display: inline-block;
            margin-top: 20px;
          }
          a:hover { background: rgba(255,255,255,0.3); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Todo API is Running!</h1>
          <p>Backend server δουλεύει κανονικά</p>
          <a href="/api/todos">Δες τα Todos (JSON)</a>
        </div>
      </body>
    </html>
  `);
});

// GET - Πάρε όλα τα todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// POST - Δημιούργησε νέο todo
app.post("/api/todos", (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT - Ενημέρωσε todo (mark as complete/incomplete)
app.put("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if (todo) {
        todo.completed = req.body.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});

// DELETE - Διέγραψε todo
app.delete("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((t) => t.id !== id);
    res.json({ message: "Todo deleted" });
});

// Ξεκίνα τον server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
