const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'] // Assuming three options for gender
    },
    productsPurchased: [{
        type: String // Assuming product names as strings
    }],
    detailedIssues: [{
        type: String // Assuming issue descriptions as strings
    }],
    suggestions: {
        type: String
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
