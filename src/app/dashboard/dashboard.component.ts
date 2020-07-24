import {Component, OnInit} from '@angular/core';
import {FileShareService} from '../service/file-share.service';
import {NodeDetails} from '../models/node-details';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchDetails} from '../models/search-details';
import {Neighbour} from '../models/neighbour';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nodeDetails: NodeDetails;
  fileNameList: any;
  routingTable: Neighbour[];
  searchForm: FormGroup;
  searchResults: SearchDetails[];
  fileDownloadStatusText = undefined;
  fileDownloadStatus = undefined;

  constructor(private fileShareService: FileShareService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      fileName: ['', Validators.compose([Validators.required])]
    });

    this.fileShareService.getNodeDetails().subscribe(node => {
      this.nodeDetails = node;
    });

    this.fileShareService.getNodeFileList().subscribe(fileList => {
      this.fileNameList = fileList;
    });

    this.fileShareService.getRoutingTable().subscribe(routingTableData => {
      this.routingTable = routingTableData;
    });
  }

  // tslint:disable-next-line:typedef
  public onRefreshInitiated() {
    this.fileShareService.getRoutingTable().subscribe(routingTableData => {
      this.routingTable = routingTableData;
    });
  }

  // tslint:disable-next-line:typedef
  public onSearchFileInitiated() {
    this.fileShareService.searchFiles(this.searchForm.getRawValue().fileName).subscribe(fileSearchResults => {
      this.searchResults = fileSearchResults;
    });
  }

  onDownloadInitiated(searchResult: SearchDetails) {
    this.fileShareService.downloadFile(searchResult).subscribe(statusString => {
      this.fileDownloadStatusText = statusString.message;
      this.fileDownloadStatus = statusString.httpStatus;
    });
  }
}
