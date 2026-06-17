export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed. Please try again.";
}

export type RequestStatus =  "idle" | "loading" | "saving" | "success" | "error"
