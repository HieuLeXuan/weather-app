import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FbService } from 'src/app/service/fb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fbService: FbService, 
    public router: Router,
    private toater: ToastrService,
  ) {}

  ngOnInit(): void {}

  async login(e: any) {
    await this.fbService.login(e.target.email.value, e.target.password.value)
      .then((result) => {
        this.fbService.SetUserData(result.user);
        this.toater.success('', 'Logged in successfully!');
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.toater.error('', 'Login failed, please contact admin for assistance!');
      });
  }
}
