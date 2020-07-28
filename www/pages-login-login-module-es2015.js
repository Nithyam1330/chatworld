(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/login/login.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content light-gray-gradient>\r\n    <div flex space-around flex-columns style=\"height: 100%;\">\r\n      <div flex flex-columns v-center style=\"height: 192px; min-height: 190px\">\r\n        <ion-img src=\"../../../assets/imgs/fb.png\" style=\"width:100px\"></ion-img>  \r\n        <h3 text-navy>{{ api.admin ? 'Admin' : 'User' }}</h3>\r\n      </div>\r\n      <form [formGroup]=\"loginForm\" flex v-center flex-columns>\r\n          <mat-form-field size-md color=\"accent\" appearance=\"outline\">\r\n            <mat-label>Email</mat-label>\r\n            <input matInput placeholder=\"Email\" formControlName=\"email\">\r\n            <mat-error *ngIf=\"loginForm.controls.email.hasError('email') && !loginForm.controls.email.hasError('required')\">\r\n            Please enter a valid email address\r\n            </mat-error>\r\n            <mat-error *ngIf=\"loginForm.controls.email.hasError('required')\">\r\n            Email is <strong>required</strong>\r\n            </mat-error>\r\n          </mat-form-field>\r\n        \r\n          <mat-form-field size-md color=\"accent\" appearance=\"outline\">\r\n            <mat-label>Password</mat-label>\r\n            <input matInput placeholder=\"Your secret\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\">\r\n            <button height-sm mat-icon-button matSuffix (click)=\"hide = !hide\" [attr.aria-label]=\"'Hide password'\" [attr.aria-pressed]=\"hide\">\r\n                <mat-icon>{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\r\n            </button>\r\n            <mat-error *ngIf=\"loginForm.controls.password.hasError('required')\">\r\n            Please Enter <strong>Password</strong>\r\n            </mat-error>\r\n            <mat-error *ngIf=\"loginForm.controls.password.hasError('minlength')\">\r\n            Minimum length should be <strong>6</strong>\r\n            </mat-error>\r\n          </mat-form-field>\r\n          \r\n          <mat-list>\r\n              <mat-list-item>\r\n                  <button (click)=\"login()\" mat-raised-button init-btn style=\"width: 200px\" [disabled]=\"!loginForm.valid\">\r\n                      <span *ngIf=\"!api.loader\">LogIn</span> \r\n                      <ion-spinner name=\"dots\" *ngIf=\"api.loader\"></ion-spinner>\r\n                  </button>\r\n                  <mat-divider></mat-divider>\r\n              </mat-list-item>\r\n              <mat-list-item *ngIf=\"!api.admin\">\r\n                  <p text-center size-sm m-auto>Not have an account?</p>\r\n              </mat-list-item>\r\n              <mat-list-item *ngIf=\"!api.admin\">\r\n                  <a mat-raised-button color=\"warn\" init-btn routerLink=\"/register\" style=\"width: 200px\">SignUp</a>\r\n              </mat-list-item>\r\n          </mat-list>\r\n      </form>\r\n    </div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");
/* harmony import */ var src_app_amd_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/amd.module */ "./src/app/amd.module.ts");








const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            src_app_amd_module__WEBPACK_IMPORTED_MODULE_7__["AmdModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "./src/app/pages/login/login.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "[size-md] {\n  width: 80%;\n}\n\n[height-sm] {\n  height: 2rem !important;\n}\n\n[size-sm] {\n  font-size: 0.8rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9naW4vRDpcXHNhaVxccHJvamVjdHNcXHNhbXBsZXNcXGlvbmljLW1lc3Nlbmdlci1maXJlYmFzZS9zcmNcXGFwcFxccGFnZXNcXGxvZ2luXFxsb2dpbi5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFVBQUE7QUNBSjs7QURFQTtFQUNJLHVCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxpQkFBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbltzaXplLW1kXSB7XHJcbiAgICB3aWR0aDogODAlO1xyXG59XHJcbltoZWlnaHQtc21de1xyXG4gICAgaGVpZ2h0OiAycmVtICFpbXBvcnRhbnQ7XHJcbn1cclxuW3NpemUtc21dIHtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4iLCJbc2l6ZS1tZF0ge1xuICB3aWR0aDogODAlO1xufVxuXG5baGVpZ2h0LXNtXSB7XG4gIGhlaWdodDogMnJlbSAhaW1wb3J0YW50O1xufVxuXG5bc2l6ZS1zbV0ge1xuICBmb250LXNpemU6IDAuOHJlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/login/login.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var src_app_api_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/api/api.service */ "./src/app/api/api.service.ts");




let LoginPage = class LoginPage {
    constructor(formBuilder, api) {
        this.formBuilder = formBuilder;
        this.api = api;
        this.hide = true;
        this.loginForm = this.formBuilder.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email
            ])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)
            ])),
        });
    }
    ngOnInit() {
    }
    login() {
        this.api.loader = true;
        this.api.signin(this.loginForm.value['email'], this.loginForm.value['password']);
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: src_app_api_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] }
];
LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.page.html"),
        styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/pages/login/login.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], src_app_api_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]])
], LoginPage);



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es2015.js.map