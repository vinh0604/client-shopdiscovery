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
    },
    getSearchHistories: function () {
        var db = Ti.Database.install('/database/appdata', 'appdata'),
            userRs = db.execute('SELECT * FROM search_histories ORDER BY last_search_date DESC'),
            result = [];

        if (userRs.isValidRow()) {
            result.push(userRs.fieldByName('keyword'));
        }
        userRs.close();
        db.close();
        return result;
    },
    removeSearchHistories: function () {
        var db = Ti.Database.install('/database/appdata', 'appdata');
        db.execute('DELETE FROM search_histories');
        db.close();
    },
    updateSearchHistory: function (keyword) {
        if (!keyword) {
            return;
        }
        var db = Ti.Database.install('/database/appdata', 'appdata'),
            historyRs = db.execute('SELECT * FROM search_histories WHERE keyword = ? LIMIT 1', keyword);

        if (historyRs.isValidRow()) {
            db.execute('UPDATE search_histories SET search_times = search_times + 1, last_search_date = ? WHERE keyword = ?', (new Date()).valueOf(),keyword);
        } else {
            db.execute('INSERT INTO search_histories(keyword, last_search_date, search_times) VALUES(?,?,1)', keyword, (new Date()).valueOf());
        }
        historyRs.close();
        db.close();
    }
};

module.exports = DB;