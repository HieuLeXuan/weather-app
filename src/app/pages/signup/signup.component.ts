import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FbService } from 'src/app/service/fb.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    public fb: FbService, 
    public router: Router,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
  }

  async signup(e: any) {
    const user = await this.fb.register(e.target.email.value, e.target.password.value);
    if (user) {
      this.router.navigateByUrl('/home');
      this.toastr.success('', 'You have successfully registered, please post!');
    } else {
      this.toastr.error('', 'You have failed to register, please try again!');
    }
  }
}
