//Front controller
var express = require('express');
var app = express();
var mongojs = require('mongojs');

var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser'); 

//var jade = require('jade');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//var fn = jade.compile(jadeTemplate);
//var htmlOutput = fn({
  //maintainer: {
    //name: 'Forbes Lindesay',
    //twitter: '@ForbesLindesay',
    //blog: 'forbeslindesay.co.uk'
  //}
//});
  //, bodyParser = require('body-parser')
 //, port = process.env.PORT || 3000


//var mongoose   = require('mongoose');
//mongoose.connect('localhost:27017/todos'); // connect to our database


//app.all('/secret',function(req, res, next){
	//res.send("Hello");
//	next();
//});
app.route('/route1')
.get(function(req, res){
	//res.render('/public/index');
	//res.send('Cherche la bonne route');
	res.status(200).send('<h1>Welcome to Jade</h1>');
});


app.get('/contactlist',function(req, res){
	//res.send("Hello");
console.log("Received GET");

	//person1 = {
//name: 'Tim',
//email: 'tim@gmail.com',
//number: '111'
//	};

//	person2 = {
//name: 'Emily',
//email: 'Emily@gmail.com',
//number: '222'
//	};


//	person3 = {
//name: 'John',
//email: 'John@gmail.com',
//number: '333'
//	};

//	var contactlist = {person1, person2, person3};
//res.json(contactlist);
//récup les datas de la base de donnée

db.contactlist.find(function(err,docs){
	console.log(docs);
	res.json(docs);
	});
});

app.post('/contactlist',function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});

});

app.delete('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.get('/contactlist/:id',function(req, res){
	var id = req.params.id;
		db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.put('/contactlist/:id',function(req, res){
	var id = req.params.id;

	//fonction de www.howtonode.org
db.contactlist.update({_id: mongojs.ObjectId(id)},
 {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, function(err, updated, doc) {
  if( err || !updated ) 
  console.log("Not updated");
  
  else console.log("Updated, id: "+mongojs.ObjectId(id));
  res.json(doc);
});
//Fonction de Mickael

	//	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
	//	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	//	new: true}, function (err, doc){
	//		res.json(doc);
	//})
});

//Recup la liste des object dans la bdd via requete post

app.post('/info',function(req, res){
	//var id = req.params.id;
	if (req.is('application/*'))
	{
	console.log("Requete application")	
	}
	else
	{
		console.log("Requete: "+req.protocol)		
	}
	db.contactlist.find(function(err,docs){
	console.log(docs);
	res.json(docs);
	});
});

//Requete de supp d'un object par son nom
app.delete('/info/:name', function(req,res){
	var name = req.params.name;
	console.log("Supprimer: "+name);
	db.contactlist.remove({"name":name},{justOne:true},function(err, doc){
	res.json(doc);
	})
	//db.contactlist.deleteOne({name: name}, function(err, doc){
		//res.json("Supprimer: "+name);
	//})
});

//Requete d'ajout d'un object
app.put('/info', function(req,res){
	//var data = req.params.data;
	//console.log("Ajouter: "+data);
	//console.log(req.get('Content-Type'));
	console.log(req.data);
	//db.contactlist.insert(req.body,function(err, doc){
	res.json("Ok");
	//})
	//db.contactlist.deleteOne({name: name}, function(err, doc){
		//res.json("Supprimer: "+name);
	//})
});

app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log('Time: %d', Date.now());
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  res.send('Welcome '+req.path+" "+req.ip);
  next();
});


app.listen(3000);
console.log("Server running on port 3000");