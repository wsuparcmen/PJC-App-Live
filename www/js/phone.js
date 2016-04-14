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
                phoneElement.innerHTML = this.number;
                
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