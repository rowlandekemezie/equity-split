const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000))
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(app.get('port'), () => {
    console.log('listening on port ', app.get('port'));
});
