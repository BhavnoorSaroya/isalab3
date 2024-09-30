// const getCurrentDate =  
//     function(){
//         return Date()
        
//     }

// exports.Date = getCurrentDate



// Define the DateModule class
class DateModule {
    constructor() {
        // You can initialize any properties here if needed
    }

    // Method to get the current date
    getCurrentDate() {
        return new Date();  // Use 'new Date()' to get the current date and time as a Date object
    }
}

// Export the class
module.exports = DateModule;
