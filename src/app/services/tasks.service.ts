import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly URL = 'http://64.225.105.163:3000';

  constructor(
    private http: HttpClient
  ) { }

  getTasksList() {
    return this.http.get<any>(`${this.URL}/tasks`);
  }

  getTask(id: string) {
    return this.http.get<any>(`${this.URL}/tasks/${id}`);
  }

  putTask(id: string, data: any) {
    return this.http.put<any>(`${this.URL}/tasks/${id}`, data);
  }

  postTask(data: any) {
    return this.http.post<any>(`${this.URL}/tasks`, data);
  }

  deleteTask(id: string) {
    return this.http.delete<any>(`${this.URL}/tasks/${id}`);
  }
}

