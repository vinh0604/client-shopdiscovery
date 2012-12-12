var GEO = (function(){
    /**
     * WKT parser referred  from OpenLayers.Format.WKT.js
     */
    var WKT = {
        regExes: {
            'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            'spaces': /\s+|\+/
        },
        read: function (wkt) {
            var features, type, str;
            var matches = this.regExes.typeStr.exec(wkt);
            if(matches) {
                type = matches[1].toLowerCase();
                str = matches[2];
                if(this.parse[type]) {
                    features = this.parse[type].apply(this, [str]);
                }
            }
            return features;
        },
        parse: {
            'point': function(str) {
                var coords = str.split(this.regExes.spaces);
                return {
                    latitude: coords[1],
                    longitude: coords[0]
                };
            }
        }
    };

    return {
        WKT: WKT
    };
})();

module.exports = GEO;