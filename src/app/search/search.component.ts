import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@/_services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	query: any;
	posts: any;
	users: any;
	loading: true;

  constructor(
  	private route: ActivatedRoute,
  	private searchService: SearchService,
  	) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.query = { query: params.query }
  		this.searchService.search(this.query)
			.subscribe(
				res => {
					this.posts = res.posts;
					this.users = res.users;		  					
				});

  	})      
  }

}
