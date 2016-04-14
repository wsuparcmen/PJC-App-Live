jQuery(document).ready(function () {
    
    //Here we would have a function call that returns the contact's phone number
    //Instead we will use a variable for now.
    var contactNumber = '801-777-4035';
    
    var p = new Phone(contactNumber);
    
    //p.test();
    
    var phoneContact = document.getElementById("phoneContact");
    phoneContact.appendChild(p.loadClickToCall());
    
});
