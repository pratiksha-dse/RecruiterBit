const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        
    },
    contact:{
        type: String,
        required:true,
        min:1
    },
    email:{
        type: String,
        required:true,
        min:1
    },
    skills: {
        type: String,
        required: true,
        min: 1
    },
    node: {
        type: SchemaTypes.Double,
        required: true,
        min: 0
    },
    react: {
        type: SchemaTypes.Double,
        required: true,
        min: 0
    },
    salary:{
        type: Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        required:true,
        min:1,
    },
   
});

module.exports = mongoose.model('Candidate', CandidateSchema);
