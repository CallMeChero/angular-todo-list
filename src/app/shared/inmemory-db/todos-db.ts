import { ITodo } from 'src/app/home/models/todo';

export class TodosDB {
    static todos: ITodo[] = [
      { 
          id: '5c7f0521-c889-4af9-81fe-b9517082824b',
          name: 'Oprati zube i lice', 
          title: '123',
          isCompleted: true,
          description: 'Nema trenutnog opisa radnje',
          dateCreated: new Date("2020-03-17T09:0:0+0100")
      },
      { 
        id: '08447da1-067d-4ed6-972e-422ac68a05dd',
        name: 'Prošetati psa', 
        title: '456',
        isCompleted: true,
        description: 'Nema trenutnog opisa radnje',
        dateCreated: new Date("2020-03-17T09:0:0+0100")
      },
    ]
}