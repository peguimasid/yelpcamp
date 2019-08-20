var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//nao precisamos colocar o index.js ^^^^ pois index é um nome especial, mas se colocassemos nao iria mudar nada, so iria ficar assim 
//var middleware = require("../middleware/index.js")

//INDEX - mostra todos os acampamentos
router.get("/", function(req, res){
	//pegar todos os acampamentos que estao no banco de dados
	Campground.find({}, function(err, allCampgrounds){
		if(err){
		console.log(err);
} else{
		res.render("campgrounds/index", {campgrounds: allCampgrounds});	
}
});
});

 // adicionar novo campground para o banco de dados
router.post("/", middleware.isLoggedIn, function(req, res){
	//pegar os dados d form e adicionar a array "campgrounds"
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc= req.body.description;
	var author = {
				id: req.user._id,
				username: req.user.username
			};
	var newCampground = {name : name , image: image , description: desc, author:author, price: price};
	//Criar um novo acampamento e salvar ao banco de dados
	Campground.create(newCampground, function(err, newlyCampground){
		if(err){
			console.log("have an error");
			console.log(err);
} else{
		res.redirect("/campgrounds");
}
});
	
});

//NEW - mostrar a "form"  para criarmos o banco de dados

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - mostra as informacoes do acampamento quando clicamos nele

router.get("/:id", function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		   if(err || !foundCampground){
			 req.flash("error", "Acampamento não encontrado");
			   res.redirect("back");
     } else{
		// render informations about that campground
	  res.render("campgrounds/show", {campground: foundCampground});
     }
});
});

//EDIT CAMPGROUND =============================================================
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
			Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground}); 		
	});
});
//UPDATE CAMPGROUND WITH NEW INFORMATIONS
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
		Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
			if(err){
				res.redirect("/campgrounds");
			} else {
				res.redirect("/campgrounds/" + req.params.id);
			}
		});
	//redirect somewere (show page)
});

//==============================================================================
//DELETE CAMPGROUND ==========
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
		Campground.findByIdAndRemove(req.params.id, function(err){
			if(err){
					res.redirect("/campgrounds");
				} else {
					res.redirect("/campgrounds");
				}
      });
});
//============================

module.exports = router;
