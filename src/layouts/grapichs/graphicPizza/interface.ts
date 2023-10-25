export interface Data {
    date: string;
    name: string;
    rocket: string;
    success: number;
    fail: number;
    cores: {
      reused: number;
      flight: number;
      hexadecimal: string;
    };
    status: number;
  }