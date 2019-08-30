const app = require('./app.js');

console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
