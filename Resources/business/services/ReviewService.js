function ReviewService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        DB = require('business/database'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    self.summary = function (params) {
        var deferred = new _.Deferred(),
            req_params = {
                reviewable_type: params.reviewable_type,
                auth_token: DB.getAuthToken()
            },
            api_deferred = api.request('GET','reviews/'+params.id+'/summary', req_params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.all = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','reviews/'+params.id, params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.reviews) {
                result.rows = _.pluck(json.reviews, 'review');
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.postReview = function (data) {
        var deferred = new _.Deferred(),
            params = _.extend({
                auth_token: DB.getAuthToken()
            }, data),
            api_deferred = api.request('POST','reviews', params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    return self;
}

module.exports = ReviewService;