import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
class Mylogin extends PolymerElement  {
    constructor(){
      super();
     
     
  }
   ready(){
    super.ready();
     console.log("login");
      if (localStorage.getItem("isuser")=='True'){
           this.set('route.path', 'view1');
           console.log("enter");
      };
    
  }
   static get properties () {
    return {
      _login: {
        type: Function 
    }
  }
}
   static get template() {
    return html`
<style>
       iron-pages{
           display:none !important;
       }
.center {
    
  width:100%;
  text-align:center;
         }
paper-card{
    width:37%;
  display:inline-block;
  margin-top: 3%;
            }
       </style>
<div class="center">

<br>
 <app-location route="{{route}}"></app-location>
    <app-route
        route="{{route}}"
        pattern="/:view"
        data="{{routeData}}"
        tail="{{subroute}}"></app-route>
 <iron-ajax
  id="AjaxPost"
        url="http://localhost:4001/loginapi"
        method="POST"
        content-type="application/json"
        handle-as="json"
        on-response="handleResponse"
        on-error="handleAjaxPostError">
      </iron-ajax>
<paper-card class="rate">
  <div class="card-content">
<img src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/512/Login-icon.png" width="33%" />
    <paper-input id="User_name" name="usser"  float-label label="Username" ></paper-input>
     <paper-input id="Password" type="password" name="Password"  float-label label="Password" ></paper-input>
  </div>
  <div class="card-actions">
   <paper-button raised on-tap="_login" class="indigo" style="background:green;color:#fff;width:100%">Login</paper-button>
  </div>

</paper-card>
</div>
    `;
  }
  _login(){
      
      this.$.AjaxPost.body = { "user": this.$.User_name.value, "password": this.$.Password.value };
      this.$.AjaxPost.generateRequest();
  }
  handleResponse(data){
       console.log("sent");
      console.log(data.detail.__data.xhr.response);
if (data.detail.__data.xhr.response.isuser=='True'){
   // alert(this.$.User_name.value);
   // alert(this.$.Password.value);
localStorage.setItem("passNumber",data.detail.__data.xhr.response.passNumber);
localStorage.setItem("isuser",data.detail.__data.xhr.response.isuser);
    this.set('route.path', 'view1');
}else{
    localStorage.setItem("isuser",data.detail.__data.xhr.response.isuser);
    alert("Your username and password are wrong..")
    
}            
  }
    handleAjaxPostError(event, request){
alert("error");
  }
}
window.customElements.define('my-login', Mylogin);
