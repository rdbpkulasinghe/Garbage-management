export class ApiResponse {
  error: boolean;
  message: string;
  data: any;

  constructor() {
    this.error = false;
  }
}
