const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
})

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
})
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


