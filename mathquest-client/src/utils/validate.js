export const checkValidData = (email, password, fullName)=>{
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    if (!isEmailValid) return "Email ID is not valid!";
    if(fullName?.length < 8 || fullName?.length > 30) return "Full name lenght should be greater than 8 and less than 30"
    if (!isPasswordValid) return "Password is not valid!";
    return null;
}