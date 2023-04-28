const mongoose = require("mongoose");
const config = require("./config");

const exec = async (func) => {
  try{
    const options =  { useNewUrlParser: true };
    await mongoose.connect(
      "mongodb+srv://" + config.mongodb.user +
        ":" + config.mongodb.pass +
        "@" + config.mongodb.cluster +
        "/" + config.mongodb.collection +
        "?retryWrites=true&w=majority",
        options
     )
     return await func()
  }
  catch (err){
    console.log(err)
  }

};
const queryMany = async (schema, opts={}) => {
  return await exec(async () => await schema.find(opts));
};

const query = async (schema, opts={}) => {
  return await exec(async () => await schema.findOne(opts));
};

const update = async(req, schema, obj) => {
  await exec(async () => await schema.findByIdAndUpdate(obj._id, obj));
};

const insert = async (req, obj) => {
  await exec(async () => await obj.save());
};

const truncate = async (schema, opts={}) => {
  await exec(async () => await schema.deleteMany(opts));
};

module.exports = {
  insert,
  update,
  query,
  queryMany,
  truncate
};