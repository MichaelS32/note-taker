const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // API routes
        // Notes get route
        app.get('/api/notes', function(req, res) {
            res.json(data);
        });

        // Notes post route
        app.post('/api/notes', function(req, res) {
            let newNote = req.body;
            newNote.id = uuidv4();
            data.push(newNote);
            dbUpdate();
            return console.log(`Added new note: ${newNote.title}`);
        });

        // retrieves note by id
        app.get('/api/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        })

        // Deletes note with specific id
        app.delete('/api/notes/:id', function(req, res) {
            let noteID = req.params.id.toString();
            dbUpdate();
            console.log(`Deleted note belonging to id:${req.params.id}`);
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