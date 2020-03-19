import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { ITodo } from 'src/app/home/models/todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: ITodo[] = [
      { 
          id: '5c7f0521-c889-4af9-81fe-b9517082824b',
          name: 'Otići u banku i platiti račune', 
          title: '123',
          isCompleted: true,
          description: 'Nema trenutnog opisa radnje',
          dateCreated: new Date(2020, 3, 15)
      },
      { 
        id: '08447da1-067d-4ed6-972e-422ac68a05dd',
        name: 'Raditi na završnom radu', 
        title: '456',
        isCompleted: true,
        description: 'Nema trenutnog opisa radnje',
        dateCreated: new Date(2020, 3, 16)
      },
    ]
    return {todos};
  }
}
