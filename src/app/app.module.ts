import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { OptionsGraphComponent } from './components/options-graph/options-graph.component';
import { ChartsModule } from 'ng2-charts';
import { ExploreComponent } from './components/explore/explore.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PriceGraphComponent } from './components/price-graph/price-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    OptionsGraphComponent,
    ExploreComponent,
    SummaryComponent,
    PageNotFoundComponent,
    PriceGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    ChartsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
