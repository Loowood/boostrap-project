var Model = {};
Model.books = [{
	title: 'The Lord of the Rings' ,
	author: {
		name: 'J.R.R.' ,
		surname: 'Tolkien'
	},
	summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel feugiat j usto, eget vestibulum ex.Cras fermentum convallis vulputate.Curabitur tempus, mi sit amet tristique congue, metus dolor aliquam dui, id tempus ante erat sed ante.Sed molestie, est vel sollicitudin bibendum, ex libero efficitur est, in porttitor neque massa pharetra nisi.Duis erat lacus, vestibulum in risus nec, mollis laoreet sem.Nulla vel augue a nisl bibendum ves tibulum ac at nisl.Nulla eget magna tincidunt, lacinia diam vel, tempor neque.Morbi lorem m i, rhoncus vel porta semper, mollis non eros.Etiam vulputate suscipit justo a pellentesque. Cras eu nisl a quam aliquet porttitor.Integer fermentum fringilla urna, eget maximus nunc auctor eu.Phasellus quis felis blandit, tristique purus non, cursus erat.Maecenas sagittis la cus viverra efficitur tristique.' ,
	comments: []
}, {
	title: 'Dracula ' ,
	author: {
		name: 'Bram' ,
		surname: 'Stoker'
	},
	summary: 'Aliquam sed dolor mollis, pharetra risus non, hendrerit diam. Morbi eget facilisis metus, non consequat urna. Curabitur pharetra velit nulla, quis tincidunt orci commodo et. Mauris et nibh imperdiet, rhoncus nisl a, euismod est. Vivamus id gravida ante. Aenean dapibus sem odio, in hendrerit felis feugiat in. Sed tincidunt ex ac laoreet vulputate. Nunc in neque lorem. Nam placerat lectus leo, eget suscipit enim ornare at. Suspendisse nec tincidunt diam. Nullam semper interdum urna, et auctor urna fermentum vel. Nam in dapibus quam, scelerisque vestibulum augue.' ,
	comments: []
}];

Model.getBooks = function () {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(Model.books)
		}, 1000);
	});
};

Model.addCommentToBook = function (bid, comment) {
	return Model.getBook(bid)
		.then(function (book) {
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					book.comments.push(comment);
					resolve(book);
				}, 1000);
			});
		})
};
Model.getBook = function (id) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			var i = 0;
			while (i < Model.books.length && Model.books[i].id !== id) i++;
			if (i < Model.books.length)
				resolve(Model.books[i]);
			else
				reject('Book not found' );
		}, 1000);
	});
};