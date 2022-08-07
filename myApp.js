require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);






const createAndSavePerson = (done) => {
  var personInfo = new Person({
    name:"Aparna",
    age:29,
    favoriteFoods: ["Pasta","Pizza","Noodles"]
  });
  personInfo.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  
};






/*var arrayOfPeople = [
  {name: "Sudharsh", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sahasra", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Guru", age: 78, favoriteFoods: ["wine"]},
  {name: "Sowmya", age: 70, favoriteFoods: ["wine","sambar"]}
];*/
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });

};




//var personName= "Sudharsh"
const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err,peopleName) {
    if(err) return console.error(err);
    done(null, peopleName);
  });
};





//var food="wine";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function(err,favFood){
    if(err) return console.error(err);  
    done(null,favFood);
  });
};





//var personId=""
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data){
    if(err) return console.error(err);  
    done(null,data);
  });
};



const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, function(err, data){
    if (err) return console.log(err);
      data.favoriteFoods.push(foodToAdd);
      data.save((err,updatedPer) => {
      if(err) return console.log(err);
      done(null, updatedPer)
    })
  }) 
};





const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, function(err, data){
    if (err) return console.log(err);
    done(null,data)
  })
};




const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err, data){
    if (err) return console.log(err);
    done(null,data)
  })
};





const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function(err,data){
    if (err) return console.log(err);
    done(null,data)
  })
};




const queryChain = (done) => {
  const  foodToFind= "burrito";
  var findQuery = Person.find({favoriteFoods: foodToFind })
  .sort({name:1})
  .limit(2)
  .select({age:0})
  .exec(function(err,people){
       if (err) return console.log(err);
       done(null,people)
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
