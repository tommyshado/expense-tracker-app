import express from "express";



// Express instance
const app = express();

// Run server on PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 app started at PORT", PORT);
});