
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
