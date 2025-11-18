
class ApiResponse{
    constructor(statuscode  , message  ,  data){
        this.statuscode = statuscode , 
        this.message = message , 
        this.data = data , 
        this.success = true  

    }

}

export default ApiResponse