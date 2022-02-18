const mongoose =require("mongoose");

const textSchema=mongoose.Schema({
    code:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model("Text", textSchema);