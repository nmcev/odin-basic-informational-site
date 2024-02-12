const http = require('http');
const fs = require('fs');
const path = require('path')
const port = process.env.PORT || 8080;


http.createServer((req, res) => {
    const userReq = req.url;
    let pathToFile;


    if (req.url.endsWith(".css")) {
        pathToFile = path.join(__dirname, userReq);
    } else {
        switch (userReq) {
            case "/":
                pathToFile = path.join(__dirname, "index.html");
                break;
            case "/about":
                pathToFile = path.join(__dirname, "about.html")
                break;
            case "/contact-me":
                pathToFile = path.join(__dirname, "contact-me.html")
                break;
            default:
                pathToFile = path.join(__dirname, "404.html")
                break;
        }
    }

    fs.readFile(pathToFile, "utf8", function (err, content) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" })
            res.end("404")
        } else {
            const contentType = getContentType(pathToFile)
            res.writeHead(200, { "Content-Type": contentType })
            res.end(content)
        }

    })
}).listen(port, () => console.log("Server running on port: " + port))


function getContentType(filePath) {
    const extname = path.extname(filePath)

    switch (extname) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        default:
            return "text/plain";
    }
}
