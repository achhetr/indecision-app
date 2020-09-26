class Person {
	constructor(name = 'Anonymous', age = 0) {
		this.name = name;
		this.age = age;
	}

	getGreeting() {
		return `Hi. I am ${this.name}`;
	}

	getDescription() {
		return `${this.name} is ${this.age} year(s) old`;
	}
}

class Traveller extends Person {
	constructor(name, age, location) {
		this.location = location;
		super(name, age);
	}

	getGreeting() {
		let greet = super.getGreeting();

		if (this.location) {
			greet += ` I am visiting from ${this.location}`;
		}

		return greet;
	}
}

const me = new Person('Akash', 30, 'Australia');
const mywife = new Person(undefined, 31);

console.log(me.getGreeting());
console.log(mywife.getDescription());
