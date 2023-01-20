import { Component, OnInit } from '@angular/core';
import {HelpsService} from './helps.service';

@Component({
  selector: 'ecm-loder',
  templateUrl: './app-loder.component.html',
  styleUrls: ['./app-loder.component.scss']
})
export class EcmLoderComponent implements OnInit {

  loading: boolean = false;
  constructor(private loaderService: HelpsService) { 
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
   }

  ngOnInit(): void {
  }

}
