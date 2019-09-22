exports.fetch = async function(req, res)
{
	var array = [];

	array.push({
		name: "Kev"
	});
	res.send(array);
}

exports.add = async function(req, res)
{
	res.send("test");
}