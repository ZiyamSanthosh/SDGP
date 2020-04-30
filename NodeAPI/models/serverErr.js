//serverErr class for handling and throwing exceptions
class serverErr extends Error{
    constructor(msg, code){
        //create an error with a message and assign error code to serverErr
        super(msg);
        this.errorCode = code;
    }
}

//export serverErr
module.exports = serverErr;