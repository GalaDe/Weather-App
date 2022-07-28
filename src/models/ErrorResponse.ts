export interface ErrorResponse {
  code: string,
  description: string,
  status: number
}


export function generateResponse(error: any) {
  const errorResponse = {
    code: error.code,
    description: error.response.data.message,
    status: error.response.status,
  } as ErrorResponse;
  return errorResponse;
}


