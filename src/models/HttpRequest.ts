export interface HttpBaseRequest {
    url: string;
    method: string
  }
  
  export interface HttpRequest {
    url: string;
    method: string;
    headers: object;
    data: object;
  }
  