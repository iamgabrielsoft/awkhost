(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const api = new ItarjApi('/api/v1')

const togglePreloader = (state) => {
    const preloader = document.querySelector('.cover'); 
    preloader.style.display = state; 
}

const formData = {}; 
const username = $('.username')
const password = $('.pass1') 
const confirmPassword = $('.re_typepass'); 
const terms = $('.agree-term')
const signupForm = document.forms.signup;  

const signupFunc = async (username, password, confirmPassword, terms) => {
    console.log(formData); 
    for(let i = 0; i <signupForm; i++){
        let x = formData[signupForm[i].name] = signupForm[i].value;
        console.log(x)
    }
    
    if(password.value != confirmPassword.value){
        //password.setCustomValidity("Passwords Don't Match");
        //alert the user 
    }else {
        //alert the user
        togglePreloader('block'); 
        //password.setCustomValidity(''); 
        api
            .Post('auth/signup', JSON.stringify(formData))
            .then(res => {
            console.log(res);
            togglePreloader('none');
            })

    }
        
}





$('.form-submit').click(event => {
   event.preventDefault(); 
   signupFunc(username, password, confirmPassword, terms)
   console.log('clicked signup')
})

},{}]},{},[1]);
