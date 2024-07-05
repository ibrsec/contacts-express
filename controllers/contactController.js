const asyncHandler = require("express-async-handler");
const Contact = require("../models/contacModel");

//@desc: Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@desc: Get one contacts
//@route GET /api/contacts/:id
//@access public
const getOneContact = asyncHandler(async (req, res) => {
  let contact =false ;
    try {
       contact = await Contact.findById(req.params.id);
    } catch (error) {
      
      console.log('catch calistti ,error =',error.message);
    }
    
    console.log(contact);
    // const contacts = await Contact.find();
    // const contact = contacts.find((item) =>   item.id == req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
    
  
}) ;

//@desc: Create new contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("Request body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    user_id:req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc: Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {

  //?all fieldas are mandatory=>
  console.log("Request body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
    //?-------------------------------
    let contact =false ;
    try {
       contact = await Contact.findById(req.params.id);
    } catch (error) {
      
      console.log('catch calistti ,error =',error.message);
    } 


  //? user can update just his contacts
    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error('User dont have permission to update other user\'s contact');
    }
   
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
console.log('updated contact',updatedContact);
  res
    .status(202)
    .json({ message: "Contact is updated",updatedContact });
});

//@desc: delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {

  let contact =false ;
  try {
     contact = await Contact.findById(req.params.id);
  } catch (error) {
    
    console.log('catch calistti ,error =',error.message);
  }  


  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }


  //? user can delete just his contacts
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error('User dont have permission to delete other user\'s contact');
  }



  const deletedContact = await Contact.findByIdAndDelete(
    req.params.id
  );
console.log('deleted contact = ',deletedContact);

  res.status(200).json({ message: "Contact is deleted",deletedContact });
});

module.exports = {
  getContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
