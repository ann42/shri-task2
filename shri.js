/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'}
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random() * 1000));
}

/**
 * Ваши изменения ниже

 * Ошибка возникла из-за того, что callback срабатывал асинхронно.
 * В этот момент в переменной request было не актуальное значение,
 * не соответсвующее request(у), который сработал.

 * Чтобы избежать ошибки я бы предложила избегать
 * замыканий в асинхронном коде.
 * Как вариант: создать 3 callback(а) в виде трех отдельных функций.
 */

var requests = ['/countries', '/cities', '/populations'];
var responses = {};

requests.forEach(function(item){
    var request = item;
    var callback = function (error, result) {
        if(error) {
            return;
        }

        responses[request] = result;
        var l = [];
        for (var K in responses)
            l.push(K);

        if (l.length === requests.length) {
            var c = [], cc = [], p = 0;
            for (var i = 0; i < responses['/countries'].length; i++) {
                if (responses['/countries'][i].continent === 'Africa') {
                    c.push(responses['/countries'][i].name);
                }
            }

            for (i = 0; i < responses['/cities'].length; i++) {
                for (var j = 0; j < c.length; j++) {
                    if (responses['/cities'][i].country === c[j]) {
                        cc.push(responses['/cities'][i].name);
                    }
                }
            }

            for (i = 0; i < responses['/populations'].length; i++) {
                for (j = 0; j < cc.length; j++) {
                    if (responses['/populations'][i].name === cc[j]) {
                        p += responses['/populations'][i].count;
                    }
                }
            }

            console.log('Total population in African cities: ' + p);

            var geographyName = prompt('Type city name or country name :-)', responses['/cities'][0].name);
            for(i = 0; i < responses['/populations'].length;i++ ) {
                if(responses['/populations'][i].name === geographyName) {
                    alert('Total population in '+ geographyName + ' is ' + responses['/populations'][i].count );
                    return;
                }
            }

            var isCountyExists = false;
            var geograpyPopulation = 0;
            for(i = 0; i < responses['/cities'].length; i++) {
                if(responses['/cities'][i].country === geographyName) {
                    isCountyExists = true;
                    for(j = 0; j < responses['/populations'].length; j++) {
                        if (responses['/populations'][j].name === responses['/cities'][i].name) {
                            geograpyPopulation += responses['/populations'][i].count;
                        }
                    }
                }
            }

            if(isCountyExists){
                alert('Total population in '+ geographyName + ' is ' + geograpyPopulation );
            } else {
                alert('There is no information about the population in '+ geographyName  );
            }
        }
    };
    getData(request, callback);

});