import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Page} from "ui/page";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";

@Component({
  selector: "LoginPage",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})
export class LoginPage implements OnInit {
  user: User;

  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private _router: Router, private _userService: UserService, private page: Page) {
    this.user = new User();
    this.user.email = "";
    this.user.password = "";
  }

  ngOnInit() {
    console.log('inited');
    this.page.actionBarHidden = true;
    this._userService.check()
        .subscribe(
            () => this._router.navigate(["Map"]),
            (error) => alert("Your token is wrong or non existant")
        );
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    this.login();
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        () => this._router.navigate(["Map"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  goToRegisterPage(){
    this._router.navigate(["Register"]);
  }
}
