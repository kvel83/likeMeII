const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { getPosts, postPosts, putLikes, deletePost } = require('./consultas');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT,()=> console.log(`Server initialized in port http://localhost:${PORT}`));

app.get('/posts', async(req,res) => {
    const rows = await getPosts();
    res.json(rows);
})

app.post('/posts', async(req,res) => {
    const {titulo, img, descripcion, likes} = req.body;
    const rows = await postPosts(titulo, img, descripcion, likes);
    res.json({titulo, img, descripcion, likes});
})

app.put('/posts/like/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const update = await putLikes(id);
        res.send(update);
    } catch (error) {
        res.json({
            message: "Error al aumentar los likes"
        })
    }
})

app.delete('/posts/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const deleted = await deletePost(id);
        res.send(deleted);
    } catch (error) {
        res.json({
            message: "Error al borrar un post"
        })
    }
})

