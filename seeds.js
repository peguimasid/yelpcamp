var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
	{name:"Stars Sanctuary",
	 image:"https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=997&q=80",
	 description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	{name:"Rest Body",
	 image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
	 description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
	{name:"River Side",
	 image:"https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	 description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
];

function seedDB(){
	
	//remove all campgrounds
	Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds!");
		//add new campgrounds
	data.forEach(function(seed){
		    Campground.create(seed, function(err, campground){
		    	if(err){
		    	console.log(err);
	} else {
		    	console.log("added a campground");
				 //create a comment in each campground
				 Comment.create(
					 {
						text:"is the best camp of the world",
						author:"Guilhermo Masid"
	}, function(err, comment){
						if(err){
						  console.log(err);
					} else {
					 	  campground.comments.push(comment);
						  campground.save();
						  console.log("created new comment");
					}
				});
		     }
	});	
	});
 });
	
	//add comments
}

module.exports = seedDB;
