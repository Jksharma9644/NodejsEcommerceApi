'use strict';
var mongoose = require('mongoose');
// mongoose.connect('mongodb://13.127.56.24:27017/test');
var jsonwebToken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
var Otp = mongoose.model('Otp');
var Admin = mongoose.model('Admin');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var twilio = require('twilio');
const config = require('../../server/config/config')();
var authy = require('authy')(config.authy.sid);
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;





/*******************Signup********************************/

exports.sign_up = function (req, res, next) {
    // Make sure this account doesn't already exist

    User.findOne({ email: req.body.email }, function (err, user) {
        // Make sure user doesn't already exist
        if (user) return res.status(200).json({ status: false, message: 'The email You have Entered is already Registered' });
        // Create and save the user
        user = new User({ username: req.body.username, email: req.body.email, password: req.body.password, mobile: req.body.mobile , platform:req.body.platform });
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err) {
            if (err) { return res.status(200).json({ status: false, message: err.message }); }
            // Create a verification token for this user
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });


            // Save the verification token
            token.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).json({ status: true, data: user, message: 'you are registered  ' + user.email + '.' });
            //    sendEmail(user,token,res);
                
            });
        })

    })
}

/***********Login handlers***************/

exports.sign_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.status(200).json({ status: false, message: 'Authentication Failed .user Not found' })
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                return res.status(200).json({ status: false, message: 'Authentication Failed Wrong password' })
            } else {
                if(user.isVerified){
                    if(!user.isNumberVerified){
                        return res.status(200).json({ status: false, message: 'Your Mobile  No is  is not verified ' })
                    }else{
                       var token = new Token({
                         _userId: user._id,
                         token: crypto.randomBytes(16).toString("hex"),
                       });

                       return res.status(200).json({
                         status: true,
                         data: {
                           email: user.email,
                           name: user.username,
                           mobile:user.mobile,
                           user_id: user._id,
                           token: token,
                         },
                       });
                    }
                }else if(!user.isVerified){
                    if(!user.isNumberVerified){
                        return res.status(200).json({ status: false, message: 'Your Mobile  No is  is not verified ' })
                    }else{
                        return res.status(200).json({ status: false, message: 'Your account has not been verified,please verify your mobile and email ' })

                    }
                }
            }
        }
    });
};

/***********Mobile Verification Code***************/
exports.sendVerificationCode = function (req, res) {
    var mobileNo = req.body.mobile;
    var min = 10000;
    var max = 99999;
    var otp = Math.floor(Math.random() * (max - min + 1)) + min;

    var client = twilio(config.twilio.sid, config.twilio.token);

    client.messages.create(
        {
            to: '+91' + mobileNo,
            from: config.twilio.no,
            body: otp + '  ' + 'is your OTP to proceed on sawji gorcerry store' + ' ' +
                'valid for 15 Minutes',
        },
        (err, message) => {
            // console.log(message);
            if (err) throw err;
            var OTP = new Otp({ _userId: req.body._id, MobileNo: req.body.mobile, otp: otp });

            OTP.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                return res.status(200).json({ status: true, message: 'OTP is sent to your registered mobile no' })
            });

        }
    );
}

exports.VerifyOTP = function (req, res) {

    Otp.findOne({ otp: req.body.otp }, function (err, otp) {
        // If we found a token, find a matching user
        if (!otp) return res.status(200).json({ status: false, message: "We were unable to find a user for this otp" });

        User.findOne({ _id: otp._userId }, function (err, user) {
            if (!user) return res.status(200).json({ status: false, message: "We were unable to find a user for this token" });

            if (user.isNumberVerified) return res.status(200).json({ status: true, message: "Mobile No has been Verified already" });

            // Verify and save the user
            user.isNumberVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).json({ status: true, message: "Mobile No has been Verified please verify your email" });
            });
        });





    });

}
/***********Email Verification Code***************/

exports.confirmationPost = function (req, res) {
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(200).json({ status: false, message: 'We were unable to find a valid token. Your token my have expired' });
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(200).json({ status: false, message: "We were unable to find a user for this token" });

            if (user.isVerified) return res.status(200).json({ status: true, message: "this user has already verified Please login" });

            var numbermsg = "";
            var login = false;
            if (!user.isNumberVerified) {
                numbermsg = "Mobile No is Not verified";
                login = false;
            } else {
                numbermsg = "Please log in";
                login = true;
            }

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).json({ status: true, login: login, message: "The account has been verified" + numbermsg });
            });
        });
    });
};

/********************Resend Token*************/
exports.resend = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "jaycareer1989@gmail.com",
                    pass: "qwerasdf7330"
                }
            });
            var mailOptions = { from: 'jaycareer1989@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:4200/auth/activated/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });

    });
}

/************Login  Required handlers*/

exports.loginRequired = function (req, res) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorised User' })
    }
}


/*****************Admin login and Registraion**********/

exports.adminSignup = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, user) {
        // Make sure user doesn't already exist
        if (user) return res.status(400).send({ msg: 'The email You have Enteered is already Registered' });
        // Create and save the user
        user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save(function (err) {
            return res.status(500).send({ msg: err.message });
            if (err) { return res.status(500).send({ msg: err.message }); }
            // Create a verification token for this user
            return res.status(200).json({ token: jsonwebToken.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs'), email: user.email, name: user.name, user_id: user._id })
        })

    })
}
exports.adminSignin = function (req, res) {
    Admin.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication Failed .user Not found' })
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication Failed Wrong password' })
            } else {
                return res.json({ status: true, token: jsonwebToken.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs'), email: user.email, name: user.name, user_id: user._id })
            }
        }
    });
}
async function sendEmail(user,token,res) {
    const oauth2Client = new OAuth2(
        "775138700295-rhokherulrl6pkaecq1mc9f314252q9r.apps.googleusercontent.com",//client id
        "pPo1rfWhkQRtuJ0atha_D8XE", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    )

    oauth2Client.setCredentials({
        refresh_token: "1/doGwnDj7o0zjaepHXMEmS6h6Ms_Q4UQ98o6HZvaQzBk"
    });

    const tokens = await oauth2Client.getRequestHeaders()
    const accessToken = tokens.credentials.access_token;
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "sawjiretail@gmail.com",
            clientId: "497673940981-afrjmrcluj6tpdnue6aobh5kvpv6gv5i.apps.googleusercontent.com",
            clientSecret: "6WAZ7igNkW2w8Q-xQPNzqtPu",
            refreshToken: "1//04LAOILhJwGHfCgYIARAAGAQSNwF-L9IrfPXJbrTXZgRko2J7u2B1lQKs5Xo1R_fFUSs0Ts1YWGPsS7FrlbM6zfdfFTPGhtvOcYE",
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: "sawjiretail@gmail.com",
        to: user.email,
        subject: "Account Verification Token",
        generateTextFromHTML: true,
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + config.callabckurl + 'auth/activated/' + token.token + '.\n',
        // html: "<p>Please verify your account by clicking the link</p><br/> <p><a></a>"
    };
    smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            res.status(400).json({status:false,msg:""})
        }
        res.status(200).json({ status: true, data: user, message: 'A verification email has been sent to ' + user.email + '.' });
    });


}

