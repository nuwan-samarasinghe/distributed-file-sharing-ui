import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {NodeDetails} from '../models/node-details';
import {RoutingTable} from '../models/routing-table';
import {SearchDetails} from '../models/search-details';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {

  constructor(private httpClient: HttpClient) {
  }

  getNodeDetails(): Observable<NodeDetails> {
    return this.httpClient.get<NodeDetails>(`${environment.distributed_file_sharing_app_service}/node`);
  }


  getNodeFileList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.distributed_file_sharing_app_service}/file`);
  }

  getRoutingTable(): Observable<RoutingTable> {
    return this.httpClient.get<RoutingTable>(`${environment.distributed_file_sharing_app_service}/ip-table`);
  }

  searchFiles(fileName: string): Observable<SearchDetails[]> {
    return this.httpClient
      .get<SearchDetails[]>(`${environment.distributed_file_sharing_app_service}/file/{fileName}`.replace('{fileName}', fileName));
  }


}
