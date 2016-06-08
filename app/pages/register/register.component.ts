import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Page} from "ui/page";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";

@Component({
  selector: "RegisterPage",
  providers: [UserService],
  templateUrl: "pages/register/register.html",
  styleUrls: ["pages/register/register-common.css", "pages/register/register.css"],
})
export class RegisterPage implements OnInit {
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
    this.page.actionBarHidden = true;
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

    this.signUp();
  }

  signUp() {
    this._userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
        },
        (res) => {
          console.log(res.json());
          alert("Unfortunately we were unable to create your account.");
        }
      );
  }

  goToLoginPage(){
    this._router.navigate(["Login"]);
  }
}
