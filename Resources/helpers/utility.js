var empty = {},
    locale = Ti.Platform.locale,
    osname = Ti.Platform.osname;

function mixin(/*Object*/ target, /*Object*/ source){
    var name, s, i;
    for(name in source){
        s = source[name];
        if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
            target[name] = s;
        }
    }
    return target; // Object
}

var Utility = {
    mixin: function(/*Object*/ obj, /*Object...*/ props){
        if(!obj){ obj = {}; }
        for(var i=1, l=arguments.length; i<l; i++){
            mixin(obj, arguments[i]);
        }
        return obj; // Object
    },

    combine: function(/*Object*/ obj, /*Object...*/ props) {
        var newObj = {};
        for(var i=0, l=arguments.length; i<l; i++){
            mixin(newObj, arguments[i]);
        }
        return newObj;
    },

    locale: function(/*Object*/ map) {
        var def = map.def||null; //default function or value
        if (map[locale]) {
            if (typeof map[locale] == 'function') { return map[locale](); }
            else { return map[locale]; }
        }
        else {
            if (typeof def == 'function') { return def(); }
            else { return def; }
        }
    },

    os: function(/*Object*/ map) {
        var def = map.def||null; //default function or value
        if (typeof map[osname] != 'undefined') {
            if (typeof map[osname] == 'function') { return map[osname](); }
            else { return map[osname]; }
        }
        else {
            if (typeof def == 'function') { return def(); }
            else { return def; }
        }
    }
};

module.exports = Utility;