const mongoose = require("mongoose");
require("../config/db.config");

const EventSchema = mongoose.Schema({
  date: Date,
  title: String,
  price: Number,
  description: String,
  imageUrl: String,
});
const NewsLetterSchema = mongoose.Schema({
  date: Date,
  email: String,
  usercheckflag: Boolean,
});
const ContactUsSchema = mongoose.Schema({
  date: Date,
  fullName: String,
  email: String,
  description: String,
});
const MembershipSchema = mongoose.Schema({
  userid: String,
  firstName: String,
  lastName: String,
  fatherName: String,
  plan: String,
  address: String,
  gender: String,
  state: String,
  city: String,
  bod: String,
  pincode: Number,
  emailid: String,
  price: Number,
  status: Boolean
});

const Event = mongoose.model("event", EventSchema);
const NewsLetter = mongoose.model("NewLetter", NewsLetterSchema);
const ContactUs = mongoose.model("contactUs", ContactUsSchema);
const Membership = mongoose.model("membership", MembershipSchema);

module.exports = {
  Event,
  NewsLetter,
  ContactUs,
  Membership,
};