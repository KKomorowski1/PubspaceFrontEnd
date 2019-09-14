import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pub} from "../pubs/model/pub";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Seat} from "../pubs/model/seat";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080";
  private ALL_PUBS_URL = `${this.BASE_URL}\\pubs`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\api\\feedback`;
  private SAVE_PUB = `${this.BASE_URL}\\pubs`;
  private DELETE_PUB = `${this.BASE_URL}\\pubs\\`;
  private LAST_10_URL = `${this.BASE_URL}\\pubs\\last10`;
  private LATEST_5_URL = `${this.BASE_URL}\\pubs\\latest\\`;
  private SAVE_UPDATE = `${this.BASE_URL}\\pubs\\addUpdate\\`;

  constructor(private http: HttpClient) {
  }

  getAllPubs(): Observable<Pub[]> {
   return this.http.get<Pub[]>(this.ALL_PUBS_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postPub(pub: Pub): Observable<Pub>{
    return this.http.post<Pub>(this.SAVE_PUB, pub);
  }

  deletePub(id: number): Observable<any>{
    return this.http.delete(this.DELETE_PUB + id);
  }

  getLast10Updates(): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.LAST_10_URL);
  }

  getLatest5Updates(pubId: number): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.LATEST_5_URL + pubId)
  }

  postNewUpdate(seat: Seat, id: number): Observable<Seat>{
    return this.http.post<Seat>(this.SAVE_UPDATE + id, seat);
  }
}
