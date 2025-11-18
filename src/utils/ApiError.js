
class ApiError extends Error{
    constructor(statuscode  , message  ,  data , error=[] ,  stack=""){
        super(message)  ;
        this.statuscode = statuscode ; 
        this.message = message ; 
        this.data = data ;
        this.success = false ;   

    }

}
export default ApiError ; 