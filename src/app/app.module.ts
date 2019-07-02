import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MailingComponent } from './mailing.component';
import { FakeService } from './fake.service';
import { InMemoryDbService, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MemoryService } from './memory.service';

@NgModule({
	imports: [BrowserModule, FormsModule, HttpClientModule, InMemoryWebApiModule.forRoot(MemoryService)],
	declarations: [MailingComponent],
	bootstrap: [MailingComponent],
	//providers: [FakeService]
})

export class AppModule { }