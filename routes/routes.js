const fs = require('fs');
const path = require('path');
// npm to set unique id
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    // API routes
    // Notes get route
    app.get('/api/notes', function(req, res) {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    });

    // Notes post route
    app.post('/api/notes', function(req, res) {
        let newNote = req.body;
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        return console.log(`Added new note: ${newNote.title}`);
    });

    // retrieves note by id
    app.get('/api/notes/:id', function(req, res) {
        res.json(notes[req.params.id]);
    });

    // Deletes note with specific id
    app.delete('/api/notes/:id', function(req, res) {
        let noteId = req.params.id.toString();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data to get notes except the one to delete
        const newData = data.filter( note => note.id.toString() !== noteId );

        // Write new data to 'db.json' file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        // Send response
        res.send(`Deleted note belonging to id:${req.params.id}`);
        
    });
    // HTML Routes
    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });

    function dbUpdate() {
        fs.writeFile('db/db.json', JSON.stringify(notes, '/t'), err => {
            if (err) throw err;
            return true;
        });
    };

};