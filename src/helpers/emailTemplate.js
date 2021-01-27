

const resetPasswordEmail = (username, URL, token) => {
    const url_ = `${URL}/users/reset-password/${token}`;
    return `
    Hello ${username},<br>
        You are receiving this email because you have requested the forgot password <br>
        Click on the reset link bellow to complete the process. <br><br>
        Kindly note that this link will expire in 24 hours ${url_}
        <br><br>Thanks,<br>
    ITARJ Team.`;
}



const newUserVerificationEmail = (username, URL, token) => {
    const url_ = `${URL}/verify/${token}`;
    return `
    Hello ${username},<br><br>
        You are receiving this email because you have registered on ${URL}.<br>
        Verify your account by clicking the link below. <br>
        Kindly note that this link will expire in 48 hours <br><br>
        ${url_}
        <br><br>Thanks,<br>
        ITARJ Team.
    `;
}



module.exports = resetPasswordEmail, newUserVerificationEmail