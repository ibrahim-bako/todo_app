import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  inputs: ['newTaskName', 'newTaskDescription'],
  styles: ` 
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
      padding: 5px 20px 5px 20px
    }
  `,
  template: `
    <div class="space-y-8">
      <div>
        <h2 class="font-semibold text-xl mb-2">ToDo List</h2>

        <table style="">
          <thead>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>status</th>
            <th>action</th>
          </thead>
          <tbody>
            <tr *ngFor="let task of tasks">
              <td>
                {{ task.id }}
              </td>
              <td>
                {{ task.name }}
              </td>
              <td>
                {{ task.description }}
              </td>
              <td>
                <span
                  class="font-semibold text-sm px-2 py-1 border-0.5 bg-blue-100 rounded-full uppercase"
                  [ngClass]="task.status ? 'bg-green-500' : ''"
                >
                  {{ task.status ? 'TERMINER' : 'EN COURS' }}
                </span>
              </td>

              <td>
                <button
                  (click)="toggleTask(task.id)"
                  [disabled]="task.status"
                  class="px-2 py-1 border bg-blue-700 hover:bg-blue-800 font-semibold rounded-xl text-white text-sm focus:ring-2 ring-blue-800"
                  [ngClass]="
                    task.status
                      ? 'bg-slate-200 text-black hover:bg-slate-200'
                      : ''
                  "
                >
                  {{ 'Marquer comme terminée' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 class="font-semibold text-xl mb-2">Ajouter une nouvelle tâche</h3>

        <form (submit)="addTask()" class="space-x-6">
          <input
            type="text"
            placeholder="Nom de la tâche"
            [(ngModel)]="newTaskName"
            [ngModelOptions]="{ standalone: true }"
            required
            class="rounded-lg"
          />
          <input
            type="text"
            placeholder="Description de la tâche"
            [(ngModel)]="newTaskDescription"
            [ngModelOptions]="{ standalone: true }"
            required
            class="rounded-lg"
          />
          <button
            type="submit"
            (click)="addTask()"
            class="px-4 py-2 border bg-blue-700 hover:bg-blue-800 font-semibold rounded-xl text-white focus:ring-2 ring-blue-800"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  `,
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskName.trim() && this.newTaskDescription.trim()) {
      this.taskService.addTask(
        this.newTaskName.trim(),
        this.newTaskDescription.trim()
      );
      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }

  toggleTask(id: number) {
    this.taskService.toggleTaskStatus(id);
  }
}
