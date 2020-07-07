import {Component, OnInit} from '@angular/core';
import {FileShareService} from '../service/file-share.service';
import {NodeDetails} from '../models/node-details';
import {RoutingTable} from '../models/routing-table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchDetails} from '../models/search-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nodeDetails: NodeDetails;
  fileNameList: any;
  routingTable: RoutingTable;
  searchForm: FormGroup;
  searchResults: SearchDetails[];

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
    console.log(searchResult);
  }
}
