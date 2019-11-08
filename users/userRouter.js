const express = 'express';

const router = express.Router();

const userDb = require('./userDb');


router.post('/', (req, res) => {
   
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        return res.status(500).json({error: "Cannot find Any User Information"})
    })

});

router.get('/:id', (req, res) => {
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

});

router.get('/:id/posts', (req, res) => {
    const id: req.params.id;

    if(!id) {
        return res.status(404).json({message: "There are no posts for this user"})
    }


});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

    if(!body) {
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
