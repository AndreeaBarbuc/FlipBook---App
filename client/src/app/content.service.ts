import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Content } from './content';
 
@Injectable({
 providedIn: 'root'
})

export class ContentService {
 private url = 'http://localhost:5200';
 private contents$: Subject<Content[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshContents() {
   this.httpClient.get<Content[]>(`${this.url}/contents`)
     .subscribe(contents => {
       this.contents$.next(contents);
     });
 }
 
 getContents(): Subject<Content[]> {
   this.refreshContents();
   return this.contents$;
 }
 
 getContent(id: string): Observable<Content> {
   return this.httpClient.get<Content>(`${this.url}/contents/${id}`);
 }
 
 createContent(content: Content): Observable<string> {
   return this.httpClient.post(`${this.url}/contents`, content, { responseType: 'text' });
 }
 
 updateContent(id: string, content: Content): Observable<string> {
   return this.httpClient.put(`${this.url}/contents/${id}`, content, { responseType: 'text' });
 }
 
 deleteContent(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/contents/${id}`, { responseType: 'text' });
 }
}
