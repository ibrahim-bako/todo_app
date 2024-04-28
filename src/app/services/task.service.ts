// task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [...fakeTasks];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(name: string, description: string) {
    const id =
      this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const status = false; // Nouvelles tâches sont non terminées par défaut
    this.tasks.push({ id, name, description, status });
  }

  toggleTaskStatus(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.status = !task.status; // Inverser le statut de la tâche
    }
  }
}

const fakeTasks: Task[] = [
  {
    id: 1,
    name: 'Faire les courses',
    description: 'Acheter du lait, des œufs et du pain',
    status: false,
  },
  {
    id: 2,
    name: 'Nettoyer la maison',
    description: "Passer l'aspirateur et faire la poussière",
    status: true,
  },
  {
    id: 3,
    name: 'Répondre aux e-mails',
    description: 'Répondre aux e-mails en attente',
    status: false,
  },
  {
    id: 4,
    name: 'Faire du sport',
    description: 'Aller courir pendant 30 minutes',
    status: false,
  },
];
