class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode=statusCode
    this.data=data
    this.message=message
    this.success=statusCode<400 //in success status code  will be always less than 400 
  }
}

export {ApiResponse }
