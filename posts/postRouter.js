const express = require('express');

const router = express.Router();

const postDb = require('./postDb');


router.get('/', validatePostId, (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            return res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else{
        postDb.getById(id)
            .then(posts => {
                return res.status(200).json(posts)
            })
            .catch(err => {
                return res.status(500).json({ error: "The post information could not be retrieved." })
            })
        }

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: 'The post with the specified id does not exist'})
    }
    else {
        postDb.remove(id) 
            .then(count => {
                return res.status(200).json({message: `The post with id of ${id} was deleted`})
            })
            .catch(err => {
                return res.status(500).json({error: `The post with id of ${id} could not be deleted`})
            })
        }
    

});

router.put('/:id', (req, res) => {
    const update = req.body;

    if(!id) {
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if(!update.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the post." })
    }

    else {
        postDb.update(id, update)
            .then(post => {
                res.status(200).json(post)
            }) 
            .catch(err => {
                return res.status(500).json({ error: "The post information could not be modified." })
            })
    }

});

// custom middleware

function validatePostId(req, res, next) {
    const body = req.body;

    if(!body) {
      return res.status(400).json({ message: "missing post data" })
  
    }
    else if(!body.text) {
      return res.status(400).json({ message: "missing required text field" })
  
    }
  
    next();

};

module.exports = router;