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
        id: 1,
        name: 'Platiti račune za 3. mjesec', 
        title: 'Računi',
        isCompleted: true,
        description: 'Stajati u redu i čekati plaćanje računa ili platiti putem internet bankarstva',
        dateCreated: new Date(2020, 3, 15)
      },
      { 
        id: 2,
        name: 'Raditi na završnom radu', 
        title: 'Završni rad',
        isCompleted: true,
        description: 'Izrada završnog rada, izrada aplikacije',
        dateCreated: new Date(2020, 3, 16)
      },
      { 
        id: 3,
        name: 'Proučavati .net', 
        title: '.net',
        isCompleted: true,
        description: 'Proučavanje LINQ i Entity Framework',
        dateCreated: new Date(2020, 3, 17)
      },
      { 
        id: 4,
        name: 'Obaviti fizioterapiju', 
        title: 'Fizioterapija',
        isCompleted: true,
        description: 'Otići kod fizioterapeutra i odraditi tretman',
        dateCreated: new Date(2020, 3, 18)
      },
      { 
        id: 5,
        name: 'Rad u Dalmaciji', 
        title: 'Dalmacija',
        isCompleted: false,
        description: 'Otici u dalmaciju i raditi na apartmanu',
        dateCreated: new Date(2020, 3, 24)
      },
      { 
        id: 6,
        name: 'Preseliti se kod cure', 
        title: 'Srednja žalost',
        isCompleted: false,
        description: 'Smejem se a plače mi se',
        dateCreated: new Date(2020, 3, 30)
      },
      { 
        id: 7,
        name: 'Naučiti kuhati', 
        title: 'Kuhanje',
        isCompleted: false,
        description: 'Skinuti sa interneta kuharicu te započet proučavati',
        dateCreated: new Date(2020, 4, 5)
      },
      { 
        id: 8,
        name: 'Nabaviti novu curu', 
        title: 'TODO',
        isCompleted: false,
        description: 'Task visokog prioriteta',
        dateCreated: new Date(2020, 4, 20)
      },
      { 
        id: 9,
        name: 'Biti u karanteni', 
        title: 'COVID-19',
        isCompleted: false,
        description: 'Barem je ljepši i čišći zrak',
        dateCreated: new Date(2020, 4, 25)
      },
      { 
        id: 10,
        name: 'Obaviti okulista', 
        title: 'Okulist',
        isCompleted: false,
        description: 'Provjera dioptrije',
        dateCreated: new Date(2020, 4, 48)
      },
      { 
        id: 11,
        name: 'Spremanje za ljeto', 
        title: 'Zmijsko telo',
        isCompleted: false,
        description: 'U kući je David, ušao ko regal',
        dateCreated: new Date(2020, 4, 30)
      },
      { 
        id: 12,
        name: 'Otići i obaviti', 
        title: 'Ispovijed',
        isCompleted: false,
        description: 'Ne znam ko tu kog laže...',
        dateCreated: new Date(2020, 5, 1)
      },
    ]
    return {todos};
  }
}
