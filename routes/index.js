var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/" , function(req, res){
	res.render("landing");
});

//AUTHENTICATION ROUTES

//===============
//   REGISTER
//===============
//mostrar form de criar conta
router.get("/register", function(req, res){
	res.render("register");
});
//handling user sign up
router.post("/register", function(req,res){
	
	var newUser = new User({username: req.body.username});
	
	User.register(newUser, req.body.password, function(err, user){
	   if(err){
			req.flash("error", err.message);
		    return res.render('register');
		} 
		  passport.authenticate("local")(req, res, function(){
			req.flash("success", "Seja Bem Vindo ao YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});
//==========
//  LOGIN
//==========
//show login form
router.get("/login", function(req, res){
	res.render("login");
	//a flash message que estava aqui foi passada como um req.locals no app.js line 42 para podemos exportar 
	//<%= message %> para todos os files sem precisar definir em cada "router.get".
});
//login logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}) ,function(req, res){
});

//===========
//  LOGOUT
//===========

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Voce nao esta mais na sua conta!");
	res.redirect("/campgrounds");
});


module.exports = router;