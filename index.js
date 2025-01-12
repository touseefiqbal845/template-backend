const app = require('./app');

const PORT =  5000;


app.get("/", (req, res) => {
  console.log("Success");
  res.send("Hello, World!"); 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
