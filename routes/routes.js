const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile('db/db.json','utf-8', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);


        // API routes
        // Notes get route
        app.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        // Notes post route
        app.post('/api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            dbUpdate();
            return console.log(`Added new note: ${newNote.title}`);
        });

        // retrieves note by id
        app.get('/aoi/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        })

        // Deletes note with specific id
        app.delete('/api/notes/:id', function(req, res) {
            notes.splice(req.params.id, 1);
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

    });
};