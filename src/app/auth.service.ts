import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;

  Constants: any = {
    // public static apiRoot = 'https://securingangularappscourse-api.azurewebsites.net/';

    apiRoot: 'http://localhost:2112/api/',
    //stsAuthority: 'http://localhost:4242/',

    stsAuthority: "https://securingangularappscourse-sts.azurewebsites.net/",
    // stsAuthority: 'https://ghoul007.auth0.com/',


    clientId: 'spa-client',
    // clientId: 'O9s9IldRzIn660EFGLJ5tDii0zf4yP67', //softinsight

    clientRoot: 'http://localhost:4200/'
  }

  constructor(private http: HttpClient) {


    var config = {
      authority: this.Constants.stsAuthority,
      client_id: this.Constants.clientId,
      redirect_uri: `${this.Constants.clientRoot}assets/oidc-login-redirect.html`,
      scope: 'openid projects-api profile',
      response_type: 'id_token token',
      post_logout_redirect_uri: `${this.Constants.clientRoot}?postLogout=true`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      // metadata: {
      //   authorization_endpoint: `${this.Constants.stsAuthority}authorize`,
      //   issuer: `${this.Constants.stsAuthority}`,
      //   jwks_uri: `${this.Constants.stsAuthority}.well-know/jwks.json`,
      //   end_session_endpoint: `${this.Constants.stsAuthority}v2/logout?returnTo=http://localhost:4200/?postLogout=true`
      // }
    };
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
        // this.loadSecurityContext();
      }
    });
  }




  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  logout(): Promise<any> {
    return this._userManager.signoutRedirect();
  }



  isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }



}
