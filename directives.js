var app = angular.module('highchartsModule', []);


function get_options(attrs, typemap, scope, parseJson){
    // helper function to map element attributes to highcharts options
    typemap = typemap || {};
    scope = scope || {};
    parseJson = typeof parseJson !== 'undefined' ? parseJson : true;

    var data = {};
    for(var item in typemap){
        if(!(item in attrs)){
            continue;
        }

        var types = typemap[item].split('|');

        for(var i = 0; i < types.length; i++){
            var ty = types[i];
            if(ty === 'number'){
                data[item] = parseFloat(attrs[item]);
                if(isNaN(data[item])){
                    data[item] = undefined;
                }
            }
            else if(ty === 'boolean'){
                var val = attrs[item].toLowerCase();
                if(val === 'true'){
                    data[item] = true;
                }
                else if(val === 'false'){
                    data[item] = false;
                }
            }
            else if(ty === 'string'){
                data[item] = attrs[item] || undefined;
            }
            else if(ty === 'function' && attrs[item] in scope){
                data[item] = scope[attrs[item]];
            }
            else if(ty === 'object' || ty === 'array'){
                if(!parseJson){
                    data[item] = attrs[item];
                }
                else{
                    //array or object
                    try{
                        data[item] = $.parseJSON(attrs[item])
                    }
                    catch(err){
                        console.log('error: ' + err);
                        data[item] = undefined;
                    }
                }
            }
            if(data[item] !== undefined){
                //data[item] has been populated
                break;
            }
        }
    }
    return data;
}


app.directive('highchart', function (){
    return {
        // elements and attributes allowed
        restrict: 'E, A',
        // isolate scope
        scope: {},

        controller: function($scope){
            // config options for highcharts
            $scope.highchart_options = {
                title: {},
                subtitle: {},
                series:  [],
                xaxis:  {
                    plotBands: [],
                    title: {}
                },
                yaxis:  {
                    plotBands: [],
                    title: {}
                },
                chart:  {},
                legend:  {},
                credits:  {},
                loading:  {},
                tooltip:  {}
            };

            // typecast map
            $scope.typemap = {
                series: {
                    name: 'string',
                    data: 'object',
                    type: 'string',
                    xaxis: 'number|string',
                    yaxis: 'number|string',
                    zIndex: 'number',
                    stack: 'object',
                    index: 'number',
                    onSeries: 'string',
                    width: 'number',
                    shape: 'string',
                    id: 'string',
                    pointStart: 'number',
                    pointInterval: 'number'
                },
                credits: {
                    enabled: 'boolean',
                    href: 'string',
                    position: 'object',
                    text: 'string'
                },
                tooltip: {
                    animation: 'boolean',
                    backgroundColor: 'string',
                    borderColor: 'string',
                    borderRadius: 'number',
                    borderWidth: 'number',
                    changeDecimals: 'number',
                    crosshairs: 'boolean|array|object',
                    dateTimeLabelFormats: 'object',
                    enabled: 'boolean',
                    followPointer: 'boolean',
                    followTouchMove: 'boolean',
                    formatter: 'function',
                    headerFormat: 'string',
                    pointFormat: 'string',
                    positioner: 'function',
                    shadow: 'boolean',
                    shared: 'boolean',
                    snap: 'number',
                    style: 'string|object',
                    useHTML: 'boolean',
                    valueDecimals: 'number',
                    valuePrefix: 'string',
                    valueSuffix: 'string',
                    xDateFormat: 'string'
                },
                loading: {
                    hideDuration: 'number',
                    labelStyle: 'string|object',
                    showDuration: 'number',
                    style: 'string|object'
                },
                plotband: {
                    color: 'string',
                    from: 'number',
                    id: 'string',
                    to: 'number',
                    zIndex: 'number'
                },
                title: {
                    align: 'string',
                    floating: 'boolean',
                    margin: 'number',
                    style: 'object',
                    text: 'string',
                    useHTML: 'boolean',
                    rotation: 'number',
                    x: 'number',
                    y: 'number'
                },
                legend: {
                    align: 'string',
                    backgroundColor: 'string',
                    borderColor: 'string',
                    borderRadius: 'number',
                    borderWidth: 'number',
                    enabled: 'boolean',
                    floating: 'boolean',
                    itemDistance: 'number',
                    itemMarginBottom: 'number',
                    itemMarginTop: 'number',
                    itemWidth: 'object',
                    labelFormat: 'string',
                    layout: 'string',
                    margin: 'number',
                    maxHeight: 'number',
                    padding: 'number',
                    reversed: 'boolean',
                    shadow: 'boolean',
                    symbolPadding: 'number',
                    symbolWidth: 'number',
                    useHTML: 'boolean',
                    verticalAlign: 'string',
                    width: 'number',
                    x: 'number',
                    y: 'number',

                    labelFormatter: 'function'
                },
                chart: {
                    alignTicks: 'boolean',
                    animation: 'boolean|object',
                    backgroundColor: 'string',
                    borderColor: 'string',
                    borderRadius: 'number',
                    borderWidth: 'number',
                    className: 'string',
                    height: 'number',
                    ignoreHiddenSeries: 'boolean',
                    margin: 'array',
                    marginBottom: 'number',
                    marginLeft: 'number',
                    marginRight: 'number',
                    marginTop: 'number',
                    panning: 'boolean',
                    pinchType: 'string',
                    plotBackgroundColor: 'string',
                    plotBackgroundImage: 'string',
                    plotBorderColor: 'string',
                    plotBorderWidth: 'number',
                    plotShadow: 'boolean|object',
                    reflow: 'boolean',
                    renderTo: 'boolean|object',
                    selectionMarkerFill: 'string',
                    shadow: 'boolean|object',
                    spacing: 'array',
                    spacingBottom: 'number',
                    spacingLeft: 'number',
                    spacingRight: 'number',
                    spacingTop: 'number',
                    type: 'string',
                    width: 'number',
                    zoomType: 'string'
                },
                axis: {
                    allowDecimals: 'boolean',
                    alternateGridColor: 'string',
                    dateTimeLabelFormats: 'object',
                    endOnTick: 'boolean',
                    gridLineColor: 'string',
                    gridLineDashStyle: 'string',
                    gridLineWidth: 'number',
                    gridZIndex: 'number',
                    id: 'string',
                    height: 'number',
                    lineColor: 'string',
                    lineWidth: 'number',
                    linkedTo: 'number',
                    max: 'number',
                    maxPadding: 'number',
                    min: 'number',
                    minPadding: 'number',
                    minRange: 'number',
                    minTickInterval: 'number',
                    minorGridLineColor: 'string',
                    minorGridLineDashStyle: 'string',
                    minorGridLineWidth: 'number',
                    minorTickColor: 'string',
                    minorTickInterval: 'number',
                    minorTickWidth: 'number',
                    minorTickPosition: 'string',
                    minorTickLength: 'number',
                    offset: 'number',
                    opposite: 'boolean',
                    ordinal: 'boolean',
                    range: 'number',
                    reversed: 'boolean',
                    showEmpty: 'boolean',
                    showFirstLabel: 'boolean',
                    showLastLabel: 'boolean',
                    startOfWeek: 'number',
                    startOnTick: 'number',
                    tickColor: 'strng',
                    tickInterval: 'number',
                    tickLength: 'number',
                    tickPixelInterval: 'number',
                    tickPosition: 'string',
                    tickPositioner: 'function',
                    tickPositions: 'array',
                    tickWidth: 'number',
                    top: 'number',
                    type: 'string'
                }
            };

            $scope.n_series = 0;
            $scope.n_series_ready = 0;
            $scope.is_highstock = false;

            this.setCredits = function(attrs){
                $.extend($scope.highchart_options.credits, get_options(attrs, $scope.typemap.credits));
            };

            this.setToolTip = function(attrs){
                $.extend($scope.highchart_options.tooltip, get_options(attrs, $scope.typemap.tooltip));
            };

            this.setLoading = function(attrs){
                $.extend($scope.highchart_options.loading, get_options(attrs, $scope.typemap.loading));
            };


            this.addPlotBand = function(axis, attrs){
                if(axis === 'x'){
                    $scope.highchart_options.xaxis.plotBands.push(get_options(attrs, $scope.typemap.plotband));
                }
                else{
                    $scope.highchart_options.yaxis.plotBands.push(get_options(attrs, $scope.typemap.plotband));
                }
            };

            this.setTitle = function(attrs){
                $.extend($scope.highchart_options.title, get_options(attrs, $scope.typemap.title));
            };

            this.setSubTitle = function(attrs){
                $.extend($scope.highchart_options.subtitle, get_options(attrs, $scope.typemap.title));
            };

            this.setLegend = function(attrs){
                $.extend($scope.highchart_options.legend, get_options(attrs, $scope.typemap.legend, $scope));
            };

            this.setChart = function(attrs){
                $.extend($scope.highchart_options.chart, get_options(attrs, $scope.typemap.chart));
            };

            this.setAxis = function(axis, attrs){
                if(axis === 'x'){
                    var opt = get_options(attrs, $scope.typemap.axis);
                    $.extend($scope.highchart_options.xaxis, opt);
                }
                else if(axis === 'y'){
                    var opt = get_options(attrs, $scope.typemap.axis);
                    $.extend($scope.highchart_options.yaxis, opt);
                }
            };

            this.addSeries = function(attrs){
                $scope.n_series += 1;
                $scope.n_series_ready += 1;

                // some kind of bug not resolving point-start to pointStart
                attrs['pointStart'] = attrs['pointBegin'];
                $scope.highchart_options.series.push(get_options(attrs, $scope.typemap.series, $scope));
            };

            this.addSeriesFromURL = function(attrs){
                var url = attrs['url'];
                $scope.n_series += 1;

                $.getJSON(url, function(data) {
                    $scope.n_series_ready += 1;

                    attrs['data'] = data;
                    var series = get_options(attrs, $scope.typemap.series, $scope, false);
                    $scope.highchart_options.series.push(series);

                    if($scope.n_series_ready === $scope.n_series){
                        $scope.draw();
                    }
                });
            };

            this.addCategories = function(axis, categories){
                categories = categories.replace(",", ' ').replace(/\s+/g, ' ').split(' ');
                if(axis === 'x'){
                    $scope.highchart_options.xaxis['categories'] = categories;
                }
                else if(axis === 'y'){
                    $scope.highchart_options.yaxis['categories'] = categories;
                }
            };

            $scope.draw = function(){
                var options = {
                    title: $scope.highchart_options.title,
                    subtitle: $scope.highchart_options.subtitle,
                    xAxis: $scope.highchart_options.xaxis,
                    yAxis: $scope.highchart_options.yaxis,
                    series: $scope.highchart_options.series,
                    legend: $scope.highchart_options.legend,
                    scrollbar: {
                        enabled: true
                    },
                    navigator: {
                        enabled: true
                    },
                    credits: $scope.highchart_options.credits
                };

                if($scope.is_highstock){
                    $scope.chart = $scope.chart_element.highcharts('StockChart', options);
                }
                else{
                    $scope.chart = $scope.chart_element.highcharts(options);
                }
            }
        },

        link: function(scope, element, attrs){
            scope.chart_element = element;
            scope.is_highstock = 'highstock' in attrs;
            if(scope.n_series_ready == scope.n_series){
                scope.draw();
            }
        }
    }
});


app.directive('charttitle', function(){
    return {
        restrict: 'E',
        require: '^highchart',

        link: function(scope, elements, attrs, highchartController){
            highchartController.setTitle(attrs);
        }
    }
});


app.directive('subtitle', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, elements, attrs, highchartController){
            highchartController.setSubTitle(attrs);
        }
    }
});


app.directive('series', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, elements, attrs, highchartController){
            if('url' in attrs){
                highchartController.addSeriesFromURL(attrs);
            }
            else if('data' in attrs){
                highchartController.addSeries(attrs);
            }
        }
    }
});


app.directive('axis', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        controller: function($scope){
            this.setAxisTitle = function(axis, attrs){
                if(which === 'x'){
                    $.extend($scope.highchart_options.xaxis.title, get_options(attrs, $scope.typemap.title));
                }
                else if(which === 'y'){
                    $.extend($scope.highchart_options.yaxis.title, get_options(attrs, $scope.typemap.title));
                }
            }
        },

        link: function(scope, element, attrs, highchartController){
            if('categories' in attrs){
                highchartController.addCategories(attrs.which, attrs['categories']);
            }
            highchartController.setAxis(attrs.which, attrs);
        }
    }
});


app.directive('axistitle', function(){
    return {
        restrict: 'E',
        require: '^axis',
        link: function(scope, element, attrs, ctrl){
            ctrl.setAxisTitle(attrs.which, attrs);
        }
    }
});


app.directive('legend', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, highchartController){
            highchartController.setLegend(attrs);
        }
    }
});


app.directive('credits', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, ctrl){
            ctrl.setCredits(attrs);
        }
    }
});


app.directive('plotband', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, ctrl){
            ctrl.addPlotBand(attrs.axis, attrs);
        }
    }
});


app.directive('tooltip', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, ctrl){
            ctrl.setToolTip(attrs);
        }
    }
});

app.directive('loading', function(){
    return {
        restrict: 'E',
        require: '^highchart',
        link: function(scope, element, attrs, ctrl){
            ctrl.setLoading(attrs);
        }
    }
});
