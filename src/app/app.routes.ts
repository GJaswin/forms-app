import { Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'reactive', pathMatch: "full" },
  { path: 'reactive', component: ReactiveFormComponent },
  { path: 'template-driven', component: TemplateFormComponent },
];

