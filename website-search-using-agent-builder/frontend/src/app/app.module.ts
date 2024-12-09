import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ChatComponent } from './components/main/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from '@angular/material/input';
import { NgFor, PathLocationStrategy } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatbarComponent } from './components/main/chat/chatbar/chatbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './components/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { LocationStrategy } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicRatingModule } from 'ionic-emoji-rating';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SuggestionCardComponent } from './components/elements/suggestion-card/suggestion-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {NgIdleModule} from '@ng-idle/core';
import {ClipboardModule} from '@angular/cdk/clipboard';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { ToastMessageComponent } from './components/shared/toast-message/toast-message.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogueBoxComponent } from './dialogue-box/dialogue-box.component';
import { ManageIntentComponent } from './components/manage-intent/manage-intent.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { IntentFormComponent } from './components/manage-intent/intent-form/intent-form.component';
import { CreateIntentFormComponent } from './components/manage-intent/create-intent-form/create-intent-form.component';
import { SearchResultComponent } from './components/search-result/search-result.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ChatComponent,
    ChatbarComponent,
    LoginComponent,
    SuggestionCardComponent,
    ToastMessageComponent,
    DialogueBoxComponent,
    ManageIntentComponent,
    IntentFormComponent,
    CreateIntentFormComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    CdkAccordionModule,
    IonicRatingModule,
    MarkdownModule.forRoot(),
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatAutocompleteModule,
    environment.requiredLogin == "True" ? [provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth())] : [],
    FlexLayoutModule,
    NgIdleModule.forRoot(),
    ClipboardModule,
    MatStepperModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }