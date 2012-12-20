var DB = {
    getAuthToken: function () {
        var db = Ti.Database.install('/database/appdata', 'appdata'),
            userRs = db.execute('SELECT * FROM users LIMIT 1'),
            token = "";

        if (userRs.isValidRow()) {
            token = userRs.fieldByName('authentication_token');
        }
        userRs.close();
        db.close();
        return token;
    }
};

module.exports = DB;