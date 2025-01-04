const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    userId: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    card: [{ type: mongoose.Schema.ObjectId, ref: 'TravelDetails', require: true }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

const U = () => {
    console.log("Hii")
}

module.exports = User;
