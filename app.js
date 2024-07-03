import express from "express"

const app = express()

app.use(express.json())

const db = []

app.get("/books", (req, res) =>{
    res.json(db)
})

app.get("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const getBook = db.find((e) => e.id === id)

    if(getBook === -1){
        res.status(404).json({"mensaje":"Libro no encontrado"})
    }

    res.json(getBook)
})

app.post("/books", (req, res) =>{
    const id = new Date().getTime()
    const {title, author, year} = req.body

    const newBook = {
        "id" : id,
        "title": title,
        "author": author,
        "year": parseInt(year)
    }

    if( !title.trim() || !author.trim() || (!year)){
        res.json({"mensaje":"Datos Erroneos"})
    }

    db.push(newBook);

    res.json({"mensaje":"Libro agregado", newBook})
})

app.put("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const {title, author} = req.body
    const newYear = parseInt(req.body.year)
    const bookIndex = db.findIndex((e) => e.id === id)

    if(bookIndex === -1){
        res.status(404).json({"mensaje":"Libro no encontrado"})
    }

    if( !title.trim() || !author.trim() || (!newYear)){
        res.status(204).json({"mensaje":"Datos Erroneos"})
    }

    db[bookIndex].title = title
    db[bookIndex].author = author
    db[bookIndex].year = newYear

    res.json({"mensaje":"Libro actualizado", "libro": db[bookIndex]})
})
app.delete("/books/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const bookIndex = db.findIndex((e) => e.id === id )
    
    if(bookIndex === -1){
        res.status(404).json({"mensaje":"Libro no encontrado"})
    }

    db.splice(bookIndex, 1)

    res.json({"mensaje":"Libro eliminado"})
})

app.listen(3000, console.log("Servidor funcionando"))