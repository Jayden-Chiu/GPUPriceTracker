const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gpuSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		brand: String,
		price: Mixed,
		link: String,
		img: String,
	},
	{ timestamps: true }
);

const Gpu = mongoose.model('Gpu', gpuSchema);

module.exports = Gpu;
