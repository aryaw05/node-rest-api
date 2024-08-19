class ResponseError extends Error {
  // berfungsi untuk mengirimkan error ke client 
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
