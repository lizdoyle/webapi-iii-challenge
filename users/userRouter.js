const express = require('express');
const router = express.Router();

const userDb = require('./userDb');


router.post('/', validateUser, (req, res) => {
    const userInfo = req.body;

    if(!userInfo.name) {
        return res.status(400).json({errorMessage: "Please provide a unique name for the user"})
    }
    else {
        userDb.insert(userInfo)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error while saving the user"})
            })
    }
   
});

router.post('/:id/posts', validateUser, validatePost, validateUserId,  (req, res) => {
    const userInfo = req.body;
    const id = req.params.id;

    if(!id) {
        res.status(404).json({message: "The user with the specified id does not exist"})
    }
    else {
        userDb.insert(userInfo)
            .then(user => {
                res.status(201).json(userInfo)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error saving the post for the specified user id"})
            })
    }

});

router.get('/', validateUser, (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        return res.status(500).json({error: "Cannot find Any User Information"})
    })

});

router.get('/:id', validateUser, validateUserId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        userDb.getById(id)
            .then(users => {
                return res.status(200).json(users)
            })
            .catch(err => {
                return res.status(500).json({ error: "The user information could not be retrieved." })
            })
    }
});

router.get('/:id/posts', validatePost, validateUserId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: "There are no posts for this user"})
    }
    else {
        userDb.getUserPosts(id)
            .then(posts => {
                return res.status(200).json(posts)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error returning posts for this user"})
            })
    }


});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: 'The user with the specified id does not exist'})
    }
    else {
        userDb.remove(id) 
            .then(count => {
                return res.status(200).json({message: `The user with id of ${id} was deleted`})
            })
            .catch(err => {
                return res.status(500).json({error: `The user with id of ${id} could not be deleted`})
            })
        }
    
    

});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    if(!id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    else {
        userDb.update(id, update)
            .then(user => {
                res.status(200).json(user)
            }) 
            .catch(err => {
                return res.status(500).json({ error: "The user information could not be modified." })
            })
    }

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    if(id) {
      //   - if the `id` parameter is valid, store that user object as `req.user`
      return res.status(200).json({user: req.user})
      
    }
     if(!id) {
      return res.status(400).json({ message: "invalid user id" })
    };

    next();
};

function validateUser(req, res, next) {
    const body = req.body;

    if(Object.entries(body).length === 0) {
      return res.status(400).json({ message: "missing user data" })
   
    }
    else if (!body.name) {
      return res.status(400).json({ message: "missing required name field" })
    }
    next();

};

function validatePost(req, res, next) {
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
