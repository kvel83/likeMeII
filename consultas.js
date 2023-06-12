const { Pool } = require('pg');


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'Alonso01',
    database: 'likeMe',
    allowExitOnIdle: true
    });



    const getPosts = async () => {
        const { rows } = await pool.query("SELECT * FROM posts");
        return rows;
    }

    const postPosts = async (titulo, img , descripcion, likes = 0) => {
        try {
            const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
            const values = [titulo, img, descripcion, likes];
            const result = await pool.query(consulta, values);
            const message = "post agregado exitosamente";
            return message;
        } catch (error) {
            error.send({
                message: "Error al insertar registro"
            });
        }


    }

    const putLikes = async (idUpdate) => {
        try {
            const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 ";
            const values = [idUpdate];
            const result = await pool.query(consulta, values);
        } catch (error) {
            console.log("Error al aumentar los likes")
        }
    }

    const deletePost = async (idDelete) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1 ";
        const values = [idDelete];
        const result = await pool.query(consulta, values);
        const message = "Se ha eliminado el post correctamente";
        return message;
    } catch (error) {
        console.log("Error al borrar un post")
    }
}

    module.exports = {
        getPosts,
        postPosts,
        putLikes,
        deletePost
    }