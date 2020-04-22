var config = {
    dev: {
        mode: 'dev',
        port: 3000,
        db: 'mongodb://sawjiadmin:myqwerty9644@ds263248.mlab.com:63248/heroku_30cntxcf',
        twilio: {
            sid: "ACf327968354d3d32a207f344d2c078102",
            token: "ed696243044ff73bc54b506b3528ddf7",
            no: '+12512206042'
        },
        email: {
            user: 'jaycareer1989@gmail.com',
            pass: 'qwerasdf7330',
            service: "Gmail"

        },
        auth: {
            type: 'oauth2',
            user: 'jksharma7330@gmail.com',
            clientId: '535800188712-vp9sd4dc47mk22c1gtgs0nbgn63g2nfh.apps.googleusercontent.com',
            clientSecret: '5L8NfeEU8P5QDSZSW1wVjP5d',
            refreshToken: '1/Ix7La9ORGBzXSqxqLs7vZpuZrjzYm3ZshHtZ96fpoZo',
            accessToken:'ya29.GlsVB8iAa2cmO80vHYyhVuMghxQRY8E-LWDkXchecoTAkiI9sWg1wTAQo6uqjf2mRXX3qjwGpPyoGpCta5mqpn-jN7Kq0swVB4iuhwcly1gWqU2QjJ0dgihYapAQ'
        },
        // nexmo:{
        //     apiKey: 'ef06b72f',
        //     apiSecret: 'YrGRyGVeTFZtz4bQ',
        // },

        authy: {
            sid: 'ACc85a5ec08b0f1d811dfb84612d11094a'
        },
        callabckurl: "localhost:4200/"
    },
    staging: {
        mode: 'staging',
        port: 3000,
        db: 'mongodb://sawjiadmin:myqwerty9644@ds263248.mlab.com:63248/heroku_30cntxcf',
        twilio: {
            sid: "ACf327968354d3d32a207f344d2c078102",
            token: "ed696243044ff73bc54b506b3528ddf7",
            no: '+12512206042'
        },
        email: {
            user: 'jaycareer1989@gmail.com',
            pass: 'qwerasdf7330',
            service: "Gmail"

        },
        auth: { 
            type: 'oauth2',
            user: 'sawjiretail@gmail.com',
            clientId: '497673940981-afrjmrcluj6tpdnue6aobh5kvpv6gv5i.apps.googleusercontent.com',
            clientSecret: '6WAZ7igNkW2w8Q-xQPNzqtPu',
            refreshToken: '1/Ix7La9ORGBzXSqxqLs7vZpuZrjzYm3ZshHtZ96fpoZo',
        },
        nexmo:{
            apiKey: 'ef06b72f',
            apiSecret: 'YrGRyGVeTFZtz4bQ',
        },

        authy: {
            sid: 'ACc85a5ec08b0f1d811dfb84612d11094a'
        },
        // callabckurl: "https://still-plateau-26625.herokuapp.com/",
        callabckurl: "localhost:4200/"
    },
    production: {
        mode: 'production',
        port: 3000,
        db: 'mongodb://sawjiadmin:myqwerty9644@ds263248.mlab.com:63248/heroku_30cntxcf',
    },

}

module.exports = function (mode) {
    return config[mode || process.argv[2] || 'staging'] || config.staging;
}