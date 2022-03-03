const User = require("./User");
const Fish = require("./Fish");
const Tank = require("./Tank");

User.hasMany(Fish)
Fish.belongsTo(User);

User.hasMany(Tank);
Tank.belongsTo(User);

Tank.hasMany(Fish);
Fish.belongsTo(Tank);

module.exports = {User,Fish,Tank}