const Event =
require("../models/Event");

exports.createEvent =
async (req,res)=>{

 const event =
 await Event.create(req.body);

 res.json(event);

};

exports.getEvents =
async(req,res)=>{

 const events =
 await Event.find().sort({ date: 1 });

 res.json(events);

};

exports.deleteEvent =
async(req,res)=>{

 await Event.findByIdAndDelete(
  req.params.id
 );

 res.json({
  message:"Deleted"
 });

};