const router = require('express').Router();

const Item = require('../../models/Item');

// --- @route 	GET api/items
// --- @desc 	  Get All Items
// --- @access  Public
router.get('/', (request, response) => {
	Item.find()
		.sort({ data: -1 })
		.then(items => response.json(items))
		.catch(error => console.log(error));
});

// --- @route 	POST api/items
// --- @desc 	  Create An Item
// --- @access  Public
router.post('/', (request, response) => {

	const newItem = new Item({
		name: request.body.name
	});

	newItem.save()
		.then(item => response.json(item))
		.catch(error => response.json(error));

});

// --- @route 	DELETE api/items
// --- @desc 	  Delete An Item
// --- @access  Public
router.delete('/:id', (request, response) => {
	Item.findById(request.params.id)
		.then(item => item.remove().then(() => response.json({ success: true })))
		.catch(error => response.status(404).json({ success: false }));
});

module.exports = router;