import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import axios from 'axios';

import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';

const axiosInstance = axios.create();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: HttpClient,
      useValue: axiosInstance,
    },
  ],
};
