_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[33],{"2cix":function(e,t,r){"use strict";r.r(t),r.d(t,"__N_SSP",(function(){return T}));var c=r("nKUr"),s=r("rePB"),a=r("o0o1"),n=r.n(a),o=r("HaE+"),i=r("q1tI"),j=r("20a2"),l=r("R/WZ"),d=r("i6E2"),p=r("i4t8"),m=r("mtPR"),u=(r("um8N"),r("Kg+a")),b=r("A2So"),h=r("2zww"),O=(r("G2Vl"),r("UsYt")),x=r("5LSk"),g=r("IdFE"),f=r("GE9s"),v=r("rOcY"),_=(r("Q6fj"),r("NRhA")),y=r.n(_),N=(r("5Buo"),r("Qanx"),r("UuAW")),w=r.n(N);function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var E={cardCategoryWhite:{color:"#000000",margin:"0",fontSize:"14px",marginTop:"0",marginBottom:"0"},cardTitleWhite:{color:"#000000",marginTop:"0px",minHeight:"auto",fontWeight:"300",fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif",marginBottom:"3px",textDecoration:"none"}};function C(e){var t=e.User_name,r=e.project_details,a=Object(l.a)(E)(),d=Object(f.b)(),_=(d.register,d.watch,d.handleSubmit,d.formState.errors),N=d.setValue,S=Object(i.useState)(),C=S[0],T=S[1],U=Object(j.useRouter)(),D=function(){var e=Object(o.a)(n.a.mark((function e(t){var r,c,s,a,o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=[],c=0;c<B.length;c++)r.push(B[c].value);return alert(r),alert(I),s=""==r?I:r,e.next=7,fetch("".concat(v.a,"/api/project/update_project"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({project_id:J.project_id,project_person:s,project_title:J.project_title,project_description:J.project_description,project_language:J.project_language,project_comment:J.project_comment,project_priority:J.project_priority,project_start:J.start,project_deadline:J.end})});case 7:return a=e.sent,e.next=10,a.json();case 10:o=e.sent,console.log("data"),console.log(o),200==a.status?U.push("".concat(v.a,"/admin/project_module")):alert("Fail");case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=Object(i.useState)([]),R=W[0],k=W[1];Object(i.useEffect)((function(){(function(){var e=Object(o.a)(n.a.mark((function e(){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],t.map((function(e){r.push({label:e.username,value:e.username})})),k(r);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);for(var A=Object(i.useState)([]),B=A[0],L=A[1],M=[],F=0;F<B.length;F++)M.push(B[F].value);var H=Object(i.useState)({project_title:"",project_description:"",project_language:"",project_start:"",project_deadline:"",project_comment:"",project_priority:"",project_person:""}),J=H[0],V=H[1];Object(i.useEffect)((function(){(function(){var e=Object(o.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.map((function(e){V(e)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var z=function(e){var t=e.target,r=t.name,c=t.value;console.log("name"),console.log([r]),V(P(P({},J),{},Object(s.a)({},r,c)))},G=[],I=J.project_person.split(",");for(F=0;F<I.length;F++)G.push({label:I[F],value:I[F]}),M.push({label:I[F],value:I[F]});var K=J.project_start.substring(0,10);console.log(K);var Q=Object(i.useState)(),X=Q[0],Y=Q[1];return Object(c.jsx)("div",{children:Object(c.jsx)(m.a,{children:Object(c.jsx)(p.a,{xs:12,sm:12,md:8,children:Object(c.jsx)("form",{onSubmit:D,children:Object(c.jsxs)(b.a,{children:[Object(c.jsxs)(h.a,{color:"primary",children:[Object(c.jsx)("h4",{className:a.cardTitleWhite,children:"Edit Project"}),Object(c.jsx)("p",{className:a.cardCategoryWhite,children:"Update your project details"})]}),Object(c.jsxs)(O.a,{children:[Object(c.jsx)("br",{}),Object(c.jsx)(m.a,{children:Object(c.jsxs)(p.a,{xs:12,sm:12,md:12,children:[Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("input",{type:"text",className:"form-control signup-input",name:"project_title",value:J.project_title,onChange:z,placeholder:"Project Title"}),Object(c.jsx)("div",{className:"error-msg",children:_.name&&Object(c.jsx)("p",{children:_.name.message})})]}),Object(c.jsx)("div",{className:"error-msg",children:_.username&&Object(c.jsx)("p",{children:_.username.message})})]})}),Object(c.jsx)("br",{}),Object(c.jsx)(m.a,{children:Object(c.jsx)(p.a,{xs:12,sm:12,md:12,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("textarea",{className:"form-control signup-input",name:"project_description",value:J.project_description,onChange:z,placeholder:"Project Description"}),Object(c.jsx)("div",{className:"error-msg",children:_.email&&Object(c.jsx)("p",{children:_.email.message})})]})})}),Object(c.jsx)("br",{}),Object(c.jsx)(m.a,{children:Object(c.jsx)(p.a,{xs:12,sm:12,md:12,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsxs)("select",{name:"project_language",id:"Project_created_by",value:J.project_language,onChange:z,className:"form-control signup-input",children:[Object(c.jsx)("option",{value:"",children:"Select Language"}),Object(c.jsx)("option",{value:"Wordpress",children:"Wordpress"}),Object(c.jsx)("option",{value:"Shopify",children:"Shopify"}),Object(c.jsx)("option",{value:"ReactJS",children:"ReactJS"}),Object(c.jsx)("option",{value:"Laravel",children:"Laravel"}),Object(c.jsx)("option",{value:"Android",children:"Android"}),Object(c.jsx)("option",{value:"Bubble",children:"Bubble"})]}),Object(c.jsx)("span",{className:"icon-eyes adduser-dropdown",children:Object(c.jsx)(g.a,{})}),Object(c.jsx)("div",{className:"error-msg",children:_.department&&Object(c.jsx)("p",{children:_.department.message})})]})})}),Object(c.jsx)("br",{}),Object(c.jsxs)(m.a,{children:[Object(c.jsx)(p.a,{xs:12,sm:12,md:6,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)(y.a,{placeholderText:"Start_Date : dd/mm/yyyy",isClearable:!0,name:"project_start",className:"form-control",selected:X,onChange:function(e){Y(e),N("start",e)},dateFormat:"dd-MM-yyyy",value:J.project_start,onSelect:function(e){Y(e),N("start",e)}}),Object(c.jsx)("div",{className:"error-msg",children:_.dob&&Object(c.jsx)("p",{children:_.dob.message})})]})}),Object(c.jsx)(p.a,{xs:12,sm:12,md:6,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)(y.a,{placeholderText:"End_Date : dd/mm/yyyy",isClearable:!0,name:"project_deadline",className:"form-control",selected:C,onChange:function(e){T(e),N("end",e)},dateFormat:"dd-MM-yyyy",minDate:X,value:J.project_deadline}),Object(c.jsx)("div",{className:"error-msg",children:_.dob&&Object(c.jsx)("p",{children:_.dob.message})})]})})]}),Object(c.jsx)("br",{}),Object(c.jsx)(m.a,{children:Object(c.jsx)(p.a,{xs:12,sm:12,md:12,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("textarea",{className:"form-control signup-input",name:"project_comment",value:J.project_comment,onChange:z,placeholder:"Comment"}),Object(c.jsx)("div",{className:"error-msg",children:_.position&&Object(c.jsx)("p",{children:_.position.message})})]})})}),Object(c.jsx)("br",{}),Object(c.jsxs)(m.a,{children:[Object(c.jsx)(p.a,{xs:12,sm:12,md:6,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsxs)("select",{name:"project_priority",id:"Status",value:J.project_priority,onChange:z,className:"form-control signup-input",children:[Object(c.jsx)("option",{value:"Select...",children:"Select Project Priority"}),Object(c.jsx)("option",{value:"High",children:"High"}),Object(c.jsx)("option",{value:"Medium",children:"Medium"}),Object(c.jsx)("option",{value:"Low",children:"Low"})]}),Object(c.jsx)("span",{className:"icon-eyes adduser-dropdown",children:Object(c.jsx)(g.a,{})}),Object(c.jsx)("div",{className:"error-msg",children:_.status&&Object(c.jsx)("p",{children:_.status.message})})]})}),Object(c.jsx)(p.a,{xs:12,sm:12,md:6,children:Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)(w.a,{displayValue:"value",options:R,selectedValues:G,value:B,onSelect:L,onRemove:L}),Object(c.jsx)("div",{className:"error-msg",children:_.role&&Object(c.jsx)("p",{children:_.role.message})})]})})]}),Object(c.jsx)("br",{})]}),Object(c.jsx)(x.a,{children:Object(c.jsx)(u.a,{color:"primary",type:"submit",children:"Save"})})]})})})})})}C.layout=d.a;var T=!0;t.default=C},mU1U:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/project_module/[update_project]",function(){return r("2cix")}])}},[["mU1U",0,1,9,2,4,5,6,7,8,10,11,12,14,16,3]]]);