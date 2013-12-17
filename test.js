var app = angular.module('myapp', []);

app.controller('AppController', function($scope){
    $scope.addSeries = function(){
        var chart = $('#chart').highcharts();
        chart.addSeries({
            name: 'ADBE',
            data: ADBE
        });
    }
});


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]';
}


function attrs_to_config(attrs, defaults, parseJson){
    parseJson = typeof parseJson !== 'undefined' ? parseJson : true;

    var data = {};
    for(item in defaults){
        if(item in attrs){
            if(typeof(defaults[item]) === 'string'){
                data[item] = attrs[item] || defaults[item];
            }
            else if(typeof(defaults[item]) === 'number'){
                data[item] = parseFloat(attrs[item]) || defaults[item];
            }
            else if(typeof(defaults[item]) === 'boolean'){
                var val = attrs[item].toLowerCase();
                if(val === 'true'){
                    data[item] = true;
                }
                else if(val === 'false'){
                    data[item] = false;
                }
                else{
                    data[item] = defaults[item];
                }
            }
            else{
                if(!parseJson){
                    data[item] = attrs[item];
                }
                else{
                    //array or object
                    try{
                        data[item] = $.parseJSON(attrs[item])
                    }
                    catch(err){
                        data[item] = defaults[item];
                    }
                }
            }
        }
    }
    return data;
}


app.directive('highchart', function (){
    return {
        restrict: 'E, A',
        controller: function($scope){
            $scope.highchart_title = {};
            $scope.highchart_subtitle = {};
            $scope.highchart_series = [];
            $scope.highchart_xaxis = {};
            $scope.highchart_yaxis = {};

            this.setTitle = function(attrs){
                var defaults = {
                    align: '',
                    floating: false,
                    margin: 0,
                    style: {},
                    text: '',
                    useHTML: false,
                    x: 0,
                    y: 0
                };

                $scope.highchart_title = attrs_to_config(attrs, defaults);
            };

            this.setSubTitle = function(attrs){
                var defaults = {
                    align: '',
                    floating: false,
                    margin: 0,
                    style: {},
                    text: '',
                    useHTML: false,
                    x: 0,
                    y: 0
                };

                $scope.highchart_subtitle = attrs_to_config(attrs, defaults);
            };

            this.addSeries = function(attrs){
//                var chart = $('#chart').highcharts();
//                chart.addSeries({
//                    name: 'ADBE',
//                    data: ADBE
//                });
//                var defaults = {
//                    name: '',
//                    data: {}
//                };
//
//                $scope.highchart_series.push(attrs_to_config(attrs, defaults));
            };

            this.addSeriesFromURL = function(attrs){
                var defaults = {
                    name: '',
                    data: {}
                };
                var url = attrs['url'];

                console.log('fetching ' + url);
                $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
                    console.log('received data');
                    var chart = $scope.chart.highcharts();
                    console.log('chart: ' + chart);
                    console.log('adding series...');
//                    chart.addSeries({
//                        name: 'ADBE',
//                        data: ADBE
//                    });
                    chart.addSeries({
                        name: attrs['name'],
                        data: data
                    });

                    console.log('series added');
                });
            };

            this.addCategories = function(axis, categories){
                categories = categories.replace(",", ' ').replace(/\s+/g, ' ').split(' ');
                if(axis === 'x'){
                    $scope.highchart_xaxis['categories'] = categories;
                }
                else if(axis === 'y'){
                    $scope.highchart_xaxis['categories'] = categories;
                }
            };
        },

        link: function(scope, element, attrs){
            var options = {
                scrollbar: {
                    enabled: true
                },

                navigator: {
                    enabled: true
                },

                rangeSelector: {
                    selected: 1
                },

                series: [{
                    name: 'MSFT',
                    data: MSFT
                }]
            };

            scope.chart = element.highcharts('StockChart', options);
        }
    }
});



app.directive('series', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, highchartController){
            console.log('series link function');
            if('url' in attrs){
                highchartController.addSeriesFromURL(attrs);
            }
            else if('data' in attrs){
                highchartController.addSeries(attrs);
            }
        }
    }
});

