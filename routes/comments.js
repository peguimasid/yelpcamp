var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//nao precisamos colocar o index.js ^^^^ pois index é um nome especial, mas se colocassemos nao iria mudar nada, so iria ficar assim 
//var middleware = require("../middleware/index.js")

//precisamos desse "{mergeParams: true}" para os comentarios funcionarem direitos pq sem ele nao reconhece a id

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
       } else {
		   res.render("comments/new", {campground: campground});
	   }
});
});

//Comments Create
router.post("/",middleware.isLoggedIn, function(req, res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
       } else {
		   Comment.create(req.body.comment, function(err, comment){
			   if(err){
				   req.flash("error", "Algo deu errado, tente novamente mais tarde!");
				console.log(err);
			} else{
				//add username and id to comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				//save comment
				comment.save();
				campground.comments.push(comment);
				campground.save();
				console.log(comment);
				req.flash("success", "Seu comentario foi adicionado com sucesso!");
				res.redirect("/campgrounds/" + campground._id );
			}
         });
	   }
	});
});
//===========EDIT COMMENTS============
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "O Acampamento nao foi encontrado");
			return res.redirect("back");
		} 
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
        });
	});
});
// COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id );
		}
   });
});
//====================================
//=========COMMENT DESTROY============
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Seu comentario foi deleteado com sucesso!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
//====================================




module.exports = router;
