(this.webpackJsonptwitter=this.webpackJsonptwitter||[]).push([[9],{117:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,s=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(c){r=!0,s=c}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return r}))},118:function(e,t,a){},129:function(e,t,a){"use strict";a.r(t);var n,r=a(36),s=a(117),i=a(1),o=a(6),c=a(25),d=a(39),l=a(24),u=(a(118),a(38)),b=a(37),h=a(2),j=void 0,m=new l.a;t.default=Object(c.b)((function(e){return{authedUser:e.users.authedUser.name,addingStatus:e.polls.addedQuestion.status,addingMessage:e.polls.addedQuestion.message}}),(function(e){return{dispatch_question:function(t){return e(Object(d.a)(t))}}}))(Object(o.g)((function(e){var t=Object(i.useState)(""),a=Object(s.a)(t,2),c=a[0],d=a[1],l=Object(i.useState)(""),g=Object(s.a)(l,2),f=g[0],p=g[1],O=Object(i.useState)(""),v=Object(s.a)(O,2),y=v[0],x=v[1],S=Object(i.useState)(""),w=Object(s.a)(S,2),N=w[0],U=w[1],A=Object(u.a)(n||(n=Object(r.a)(["\n  display: block;\n  margin: 0 auto;\n  border-color: tomato;\n  "]))),q=function(e){d(e.target.value)},P=function(e){p(e.target.value)},M=function(t){t.preventDefault();var a={author:e.authedUser,timestamp:Date.now(),optionOne:{text:c,votes:[]},optionTwo:{text:f,votes:[]}};""===c&&x("invalid"),""===f&&U("invalid"),""!==f&&""!==f&&(x("valid"),U("valid"),e.dispatch_question(a))},k=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h1",{className:"center",children:" Would You Rather? "}),Object(h.jsxs)("form",{onSubmit:M.bind(j),children:[Object(h.jsxs)("div",{className:"form-group",children:[Object(h.jsx)("label",{children:"Option One"}),Object(h.jsx)("textarea",{className:"form-control",rows:"3",placeholder:"type here",onChange:q.bind(j)})]}),Object(h.jsxs)("div",{className:"form-group",children:[Object(h.jsx)("label",{children:"Option Two"}),Object(h.jsx)("textarea",{className:"form-control",rows:"3",placeholder:"type here",onChange:P.bind(j)})]}),Object(h.jsx)("div",{className:"form-group",children:Object(h.jsx)("input",{className:"btn btn-success active add",type:"submit",value:"Submit"})})]}),"adding"===e.addingStatus?Object(h.jsx)(b.DotLoader,{color:"tomato",loading:!0,css:A,size:60}):"added"===e.addingStatus?"valid"===y&&"valid"===N?Object(h.jsxs)("h3",{className:"adding-message",children:[" ",e.addingMessage," "]}):"invalid"===y&&"invalid"===N&&Object(h.jsx)("h3",{className:"warning-message",children:"Please provide a valid text for both option one and two"}):"failed"===e.addingStatus?Object(h.jsxs)("h3",{className:"error-message",children:[" ",e.addingMessage," "]}):Object(h.jsx)("h3",{className:"warning-message",children:"* Both fields are required"})]})};return Object(h.jsxs)(h.Fragment,{children:[m.get("authedUser")&&"PUSH"===e.history.action&&e.history.location.state||"POP"===e.history.action&&e.history.location.state?k():Object(h.jsx)(o.a,{to:{pathname:"/users/login",state:{desc:"sign in required",redirected:!0,prevPath:e.history.location.pathname}}}),!m.get("authedUser")&&Object(h.jsx)(o.a,{to:{pathname:"/users/login",state:{desc:"sign in required",redirected:!0,prevState:e.history.location.pathname}}})]})})))}}]);
//# sourceMappingURL=9.217bd83c.chunk.js.map