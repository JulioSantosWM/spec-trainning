import { Routes } from '@angular/router';
import { TheorySet1Component } from './theory-set1/theory-set1.component';
import { TheorySet2Component } from './theory-set2/theory-set2.component';
import { TheorySet3Component } from './theory-set3/theory-set3.component';
import { WidgetComponent } from './exercises/widget.component';


export const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'spec-1' },
 { path: 'theory-1', component: TheorySet1Component},
 { path: 'theory-2', component: TheorySet2Component },
 { path: 'theory-3', component: TheorySet3Component },
 { path: 'exercise', component: WidgetComponent }
];
