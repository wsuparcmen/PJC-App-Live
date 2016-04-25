// PHONE CLASS
// Developer: Chris, Jake
//
// This class takes a number as a default argument when an object that is instantiated and then uses a clickToCall and clickToText method to build HTML elements that when clicked on will open up a phone dialer/sms messager, respectively.

var Phone = (function() {
    
    //Constructor
    function Phone(number) {
        Object.defineProperties(this, {
           "number": {
               value: number,
               writable: true
           }
        });
    };
    
    //
    Phone.prototype = Object.create({}, {
       "loadClickToCall": {
           enumerable: false,
           configurable: false,
           writable: false,
           value: function (x) {
                
                console.log("Click to call loaded");  
                
                //Build our href number
                var n = 'tel:'+this.number;
                
                //Build html element with the number
                var phoneElement = document.createElement("a");
                phoneElement.setAttribute("href", n);
                //phoneElement.innerHTML = this.number;
                
                var phoneIcon = document.createElement("i");
                phoneIcon.setAttribute("class", "fa fa-phone fa-4");
                phoneIcon.setAttribute("aria-hidden", "true");
                phoneIcon.style.fontSize = "3.5em";
                phoneElement.appendChild(phoneIcon);
           
                return phoneElement;
                
            }
        },
        "loadClickToText": {
           enumerable: false,
           configurable: false,
           writable: false,
           value: function (m) {
                
                console.log("Click to text loaded");  
                
                //Build our href number
                //var n = 'sms:'+this.number;
                var n = 'sms:'+this.number+'?body='+m;
                
                //Build html element with the number
                var phoneElement = document.createElement("a");
                phoneElement.setAttribute("href", n);
                //phoneElement.innerHTML = this.number;
                
                var phoneIcon = document.createElement("i");
                phoneIcon.setAttribute("class", "fa fa-comment fa-4");
                phoneIcon.setAttribute("aria-hidden", "true");
                phoneIcon.style.fontSize = "3.5em";
                phoneElement.appendChild(phoneIcon);
                
                return phoneElement;
                
            }
        },
        "test": {
           enumerable: false,
           configurable: false,
           writable: false,
           value: function (x) {
                
                console.log("test");
                
            }
        }
    });
    
    return Phone;
})();