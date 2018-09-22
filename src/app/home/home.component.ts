import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Repo } from '../data/repo';
import { Starring } from '../data/starring';
import { RepoService } from '../data/repo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  repositories: Repo;
  starring: Starring[];

  searchForm: FormGroup;

  constructor (
    private rs: RepoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({     // validations form 
      'searchRepo': ['', [Validators.required]]
    });
    this.updateStarring();  
  }

  get searchRepo() { return this.searchForm.get('searchRepo'); }    // getter for search bar value

  onSubmit() {    
    this.rs.getRepositories(this.searchRepo.value).subscribe(data => {   // call service to render list of 10 repositories
      this.repositories = data;

      this.getLastestTag(this.repositories.items);       // getting lastest tag for search table
    });
  }

  clear(input) {
    if (input.length < 1) {
      this.repositories = null;
    }
    return input.length < 1 ? false : true;
  }

  updateStarring() {        
    this.rs.getStarring().subscribe(data => {     // call service to render starring list
      this.starring = data;

      this.getLastestTag(this.starring);    // getting lastest tag for starring table
    });
  }

  getLastestTag(item) {       
    let size = item.length;

    for (let i = 0; i < size; i++) {
      this.rs.getTags(item[i].tags_url).subscribe(data => {   // call service to render lastest tag 
        item[i].latestTag = (data[0]) ? data[0].name : '';
      });
    }
  }

  add(star) {
    console.log(star);
    this.rs.saveStarring(star).subscribe();     // call service to put the selected repository to star list
    this.updateStarring();
  }

  remove(star) {
    this.rs.deleteStarring(star).subscribe();   // call service to delete the selected repository from star list
    this.updateStarring();
  }

  starredList(item, starred) {
    return starred.filter(star => star.id === item.id).length > 0
  }
}
