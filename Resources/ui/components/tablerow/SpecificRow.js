function SpecificRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            className: 'featureRow',
            _key: item.name
        });

    var featureLabel = Ti.UI.createLabel({
        text: item.name,
        top: 10,
        left: 10,
        width: 250
    }),
    featureValueLabel = Ti.UI.createLabel({
        text: item.description,
        color: '#000',
        left: 260,
        top: 10,
        right: 10,
        bottom: 10
    });

    self.add(featureLabel);
    self.add(featureValueLabel);

    return self;
}

module.exports = SpecificRow;