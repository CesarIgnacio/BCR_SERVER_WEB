const model = require('../models/modified model');
const path = require('path');
const multer = require('multer');

const images = multer.diskStorage({
	destination: './dev-data/img',
	filename: function(req, file, cb)
	{
		cb(null, file.fieldname = '-' + Date.now().toLocaleString() + path.extname(file.originalname));
	}
});
const videos = multer.diskStorage({
	destination: './dev-data/videos',
	filename: function(req, file, cb)
	{
		cb(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});
const audio = multer.diskStorage({
	destination: './dev-data/audio',
	filename: function(req, file, cb)
	{
		cb(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});


const imgUpload = multer({
	storage: images
}).single('myImage');

const audioUpload = multer({
	storage: images
}).single('myImage');

const videoUpload = multer({
	storage: images
}).single('myImage');

exports.getOptions = (req, res) =>
{	
	res.status(200).render('buttons', { title: 'buttons' });
};

exports.queryOptionsGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.deleteGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataGet = (req, res) => 
{
	
	res.status(200).render('tester', { title: 'tester' });
};

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};


exports.addDataPost = (req, res) => 
{
imgUpload(req, res, (err) =>
	{
		if(err)
		{
			res.render('tester');
			res.send('MEOWWWW!!!!');
		}
		else
		{
			console.log(req.file);
			res.send('test');

		}
	})
};


exports.deletePost = (req, res) => 
{
	res.send("Not Implemented yet");
};


