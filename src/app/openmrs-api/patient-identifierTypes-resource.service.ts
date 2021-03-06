import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

// TODO inject service

@Injectable()
export class PatientIdentifierTypeResService {

  public v: string = 'full';

  constructor(protected http: Http, protected appSettingsService: AppSettingsService) {
  }

  public getUrl(): string {

    return this.appSettingsService.getOpenmrsRestbaseurl().trim() + 'patientidentifiertype';
  }

  public getPatientIdentifierTypes(v: string = null): Observable<any> {

    let url = this.getUrl();
    let params: URLSearchParams = new URLSearchParams();
    params.set('v', (v && v.length > 0) ? v : this.v);

    return this.http.get(url, {
      search: params
    })
      .map((response: Response) => {
        return response.json().results;
      });
  }

}
