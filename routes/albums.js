'use strict'

var express = require('express');
var router = express.Router();

const db = require('../config/database')

/* GET albums page. */
router.get('/', function(req, res) {
    let albumCollection = db.get('albums')
    albumCollection.find({}, (err, albums) => {
    res.render('./albums/main', {albums: albums});
    })
});

router.get('/new', (req, res) => {
    res.render('./albums/new', {})
})

router.post('/', (req, res) => {
    let albumCollection = db.get('albums')
    albumCollection.insert(req.body, (err, car) => {
        res.redirect('/albums')
    })
})

router.get('/:id/edit', (req, res) => {
    let albumCollection = db.get('albums')
    albumCollection.findOne({_id: req.params.id}, (err, album) => {
        res.render('albums/edit', {album: album})
    })
})

router.put('/:id', (req, res) => {

    console.log(req.params.id)
    let albumCollection = db.get('albums')
    albumCollection.findAndModify({
        "query": {_id: req.params.id},
        "update": {'$set': req.body}}, (err, album) => {
            res.redirect('/albums')
        })
    })

router.get('/:id', (req, res) => {
     let albumCollection = db.get('albums')
    albumCollection.findOne({_id: req.params.id}, (err, album) => {
        res.render('albums/detail', {album: album})
    })
})

router.delete('/:id', (req, res) => {
    db.get('albums').remove({_id: req.params.id}, (err, responseCode) => {
        res.redirect('/albums')
    })
})

module.exports = router;