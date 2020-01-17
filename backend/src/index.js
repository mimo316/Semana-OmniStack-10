const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes  = require('./routes')
const { setupWebsocket } = require('./websocket');
const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://user:capoeira@ominstack-f0h1h.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// app.get('/', (req,res) => {
//     console.log(req.body)
//     return res.json({message: 'Hello Oministack'});
// });
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(routes);

server.listen(3333);


// Query Params : (Filtros, ordenação paginação,...)
// Route Params : (Identificar um recurso na alteração ou remoção)
// Body: (Dados para criação ou alteração de um registro)

// MongoDb (Não Relacional)

