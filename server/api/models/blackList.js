'use strict';

class BlackList {
    constructor(provider, metaData, scammer) {
        this.dataProvider = provider;
        this.metaData = metaData;
        this.scammer = scammer;
        this.sheetDate = null;
    }

    needToUpdate(callback) {

        let that = this;

        that.metaData.get((err, metaData) => {
            if (err || !metaData) {
                return callback(null, true);
            }

            let now = new Date();
            let lastPending = metaData.lastPending;
            let localLastUpdated = metaData.lastUpdated;

            console.log('Time diff', now.getTime() - lastPending.getTime());
            if ((now.getTime() - lastPending.getTime()) > 300000) {
                that.dataProvider.getLastModifiedDate((err, sheetDate) => {

                    if (err || !sheetDate) {
                        return callback(null, true);
                    }

                    sheetDate = new Date(sheetDate);

                    this.metaData.updateMeta({lastPending: now, lastUpdated: sheetDate}, () => {
                            console.log('meta updated');
                            if (sheetDate.getTime() !== localLastUpdated.getTime()) {
                                console.log('need to update local db');
                                return callback(null, true);
                            } else {
                                console.log('no need to update, external checked');
                                return callback(null, false);
                            }
                    });

                });
            } else {
                console.log('no need to update');
                return callback(null, false);
            }

        });
    }

    update(callback) {
        let that = this;
        console.log('updating started!');
        this.dataProvider.getData((err, data) => {
            if (err) {
                return callback(err);
            }
            // new scammers first
            data = data.reverse();

            let scammers = data.map((scammer) => {
                return {
                    name: scammer[0],
                    href: scammer[1],
                    description: scammer[2],
                    complaintFrom: scammer[3],
                };
            });
            that.scammer.remove({}, (err) => {
                that.scammer.collection.insert(scammers, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Items inserted');
                    }
                });
            });

            return callback(null, scammers);
        });
    }

    getAllScammers(callback) {
        let that = this;
        that.needToUpdate((err, needToUpdate) => {
            if (err) {
                return callback(err);
            }

            if (needToUpdate) {
                that.update((err, scammers) => {
                    if (err) {
                        // if error ocured get all from database
                        console.error(err);
                        return that.getAllFromDB(callback);
                    }
                    return callback(null, scammers);
                });
            } else {
                return that.getAllFromDB(callback);
            }
        });
    }

    getAllFromDB(callback) {
        this.scammer.find({}, (err, scammers) => {
            if (err) {
                return callback(err);
            }

            return callback(null, scammers);
        });
    }

    fullTextSearch() {
        // need to implement this later
    }
}

module.exports = BlackList;