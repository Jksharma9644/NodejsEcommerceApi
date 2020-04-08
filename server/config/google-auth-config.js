import * as googleAuth from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
scope: string = "https://mail.google.com/";

export const credentials = {
    "web": {
        "client_id": "1010327913804-jgnm4hf2i9qt1s328a79vua4afop1tdf.apps.googleusercontent.com",
        "project_id": "sawji-241817",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "QNGVoxPRZrL0fdVKSbgZ7zuO",
        "redirect_uris": ["http://localhost:3000"],
		"javascript_origins": ["http://localhost:3000"]
    }
};
export function getAuthorizeUrl(callback){
    const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id,credentials.web.client_secret,credentials.web.redirect_uris[0]);

    const autUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
		scope: scope
    });
    callback(null,autUrl);
}
getAuthorizeUrl((err, url) => {
	if(err) return console.log(err);
	console.log("Auth url is: ", url);
});



