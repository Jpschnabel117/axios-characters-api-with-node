const router = require("express").Router();
const axios = require("axios");

const iApi = axios.create({
  baseURL: 'https://ih-crud-api.herokuapp.com'
});

/* GET home page */
router.get("/characters", (req, res, next) => {
    iApi.get("/characters")
    .then(responseFromAPI => {
         //console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
});

router.get("/characters/:id", (req, res, next) => {
    iApi.get(`/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.post("/characters/create", (req, res, next) => {
    
    if(req.body.debt === "true"){
        req.body.debt = true
    }else{
        req.body.debt = false
    }
    
    iApi.post(`/characters/`, req.body)
    .then(() => {;
        res.redirect("/characters")
    })
    .catch(err => console.error(err))
});

router.get("/characters/:id/edit", (req,res,next) => {
     iApi.get(`/characters/${req.params.id}`)
    .then(resp => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { character: resp.data })
    })
    .catch(err => console.error(err))
    
})

router.post("/characters/:id/update", (req, res, next) => {
    
    if(req.body.debt === "true"){
        req.body.debt = true
    }else{
        req.body.debt = false
    }
    
    //api.put(`/characters/${characterId}`, characterInfo)
    iApi.put(`/characters/${req.params.id}`, req.body)
    .then((char) => {
        res.redirect("/characters")
    })
    .catch(err => console.error(err))
});

//delete api.delete(`/characters/${characterId}`
router.post("/characters/:id/delete", (req,res,next) => {
    iApi.delete(`/characters/${req.params.id}`).then(()=>{
        res.redirect("/characters")
    })
})


module.exports = router;

