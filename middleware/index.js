var Campground = require("../models/campground");
var Comment = require("../models/comment");
//MIDDLEWARE

var middlewareObj = {};


//Checar se o usuario e dono do acampamento
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
		 if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
					if(err || !foundCampground){
							req.flash("error", "Ooh, O acampamento nao foi encontrado!");
							res.redirect("back");
						} else {
							//verify the user is the owner of the campground
							if(foundCampground.author.id.equals(req.user._id)){
								next();
							} else {
								req.flash("error", "Você não tem permissão para fazer isso");
								res.redirect("back");
							}
							
						}
			    });
		} else {
		 req.flash("error", "Voce precisa estar logado para fazer isso!");
		 res.redirect("back");
  }
}


//Checar se o usuario e dono do comentario
middlewareObj.checkCommentOwnership = function(req, res, next) {
		 if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
					if(err || !foundComment){
							req.flash("error", "Comentario não encontrado!");
							res.redirect("back");
						} else {
							//verify the user is the owner of the comment
							if(foundComment.author.id.equals(req.user._id)){
								next();
							} else {
								req.flash("error", "Você não tem permissão para fazer isso");
								res.redirect("back");
							}
							
						}
			    });
		} else {
		 req.flash("error", "Voce precisa estar logado para fazer isso!");
		 res.redirect("back");
  }
}

//Checar se o usuario esta logado
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){ 
		return next();
	}
	req.flash("error", "Voce precisa estar logado para fazer isso!");
	res.redirect("/login");
}

module.exports = middlewareObj;