const express = require('express');
const app = express();

app.all('/', (req, res) => {
  res.send('axix stats: \nonline')
})
function keepAlive() {
  app.listen(3000, ()=>{
    console.log("Server is ready!")
  });
}

module.exports = keepAlive;