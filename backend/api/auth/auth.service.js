const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken,
    resetPassword,
    sendPasswordResetEmail
}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)

    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}
   

async function signup({username, password, fullname ,email}) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname || !email) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname , email})
}


function getLoginToken(user) {
    const userInfo = {_id : user._id, fullname: user.fullname, isAdmin: user.isAdmin , email : user.email}
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        logger.debug('GOT:', loginToken)
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}


async function sendPasswordResetEmail(email) {
    // Find user by email in your database
    const user = await getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a unique token and store it in the user's document
    const token = generateUniqueToken();
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
    await update(user);

    // Send password reset email to user's email address
    await sendPasswordResetEmail(email, token);
  }


  async function resetPassword(token, newPassword) {
    // Find user by token and check if the token is still valid
    const user = await getByResetToken(token);
    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Update user's password with the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await update(user);
  }


// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()