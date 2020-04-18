import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services';


@Component({ template: `` })
export class ExternalLoginCallbackComponent implements OnInit {
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

    
            // get return url from route parameters or default to '/'
            let returnUrl = this.route.snapshot.queryParams['returnUrl'];
            let remoteError = this.route.snapshot.queryParams['remoteError'];
            this.authenticationService.externalLoginCallback(returnUrl, remoteError).subscribe(x=>console.log('secccces'));
        
            
     
    }

   
}