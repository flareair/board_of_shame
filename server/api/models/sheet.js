'use strict';

const google = require('googleapis');
const GoogleAuth = require('google-auth-library');

const request = require('request');


class Sheet {

    constructor(options) {
        this.options = options;
        this.scope = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        this.oldApiUrl = `http://spreadsheets.google.com/feeds/list/${this.options.sheetId}/od6/public/values?alt=json`;
        this.google = google;
        this.authFactory = new GoogleAuth();
    }


    auth(callback) {
        let that = this;
        that.authFactory.getApplicationDefault(function(err, authClient) {
            if (err) {
                console.error('Authentication failed because of ', err);
                return callback(err);
            }
            if (authClient.createScopedRequired && authClient.createScopedRequired()) {

                authClient = authClient.createScoped(that.scope);

            }

            return callback(null, authClient);

        });
    }


    getLastModifiedDate(callback) {
        // using old v3 api

        request(this.oldApiUrl, (err, res, body) => {
            if (err) {
                return callback(err);
            }

            if (res.statusCode !== 200) {
                return callback(new Error('Cant get last modified external'));
            }

            body = JSON.parse(body);

            if (!body.feed.updated.$t) {
                return false;
            }



            return callback(null, body.feed.updated.$t);
        });
    }


    getData(callback) {
        let that = this;
        let sheets = this.google.sheets('v4');

        this.auth((err, auth) => {
            if (err) {
                return callback(err);
            }

            sheets.spreadsheets.values.get({
                    auth: auth,
                    spreadsheetId: this.options.sheetId,
                    range: `${this.options.begin}:${this.options.end}`,
                }, (err, res) => {
                if (err) {
                    console.log('error!');
                    return callback(err);
                }
                return callback(null, res.values);
            });
        });
    }


}

module.exports = Sheet;