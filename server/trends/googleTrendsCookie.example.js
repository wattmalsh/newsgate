//See README.md for how to utilize the function below.

function promiseArr(keywords, timePeriod) {
  return groupKeywords(keywords).map(function (keyword, index, arr) {
    console.log('called this');
    return rp({
      uri: 'http://www.google.com/trends/fetchComponent?q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=3&' + timePeriod,
      headers: {
        //Personal cookie can be found in Chrome, this cookie will not work
        'Cookie': 'APISID=phZcBBd_oF_clAao/A2biC9KLw1Wk42F4H; HSID=AvCAPi1_gcLNPHp04; NID=90\=ljp9bPedFIvbHjyJu_ASSrzAyOjG8bql-141rlIlMUAFUl2whg2O7g6u8Fa0_I5Nf3WteTzfPF4UEp1K5BZw_FLqRXrpdICasdbkRT24zGGkdJHloBLmNZ55hJb2EgUtfsglxlevfPTIeM5bSZ0SmQejORetaXY_yWUvLxQ5NgsxFjMw8eBuqFYruG3aOMhK4jCrc2p8evYPwLMU5t5z1YqdjvBsJw0pWHTHpM7WWWqHhEVvPgZh8SwvAdCTMidd4Q9TTa3bX77lA8hG_kvcaXGApb1ppelSHCE607viCgNYy4pBHAMYypWW9cgX_WxwOmhzvbSjNn21gJZw6TUkadGhEt8vWYjbJUW7q; SAPISID=cZpNlAneFfMDfB3FLx/AB-QxJFQYeWxEY6zB; SID=7gOUsm_siHAB7zmta3cPjuZM-Nos7Ok4pEekdyB_DPpWH3CspzMf4fxnJ7QoWelTrapcMg.; SSID=ASVarA9Iip_lMFg-w;'
      }
    })
    .then(function (htmlString) {
      return parseJSON(htmlString, arr[index].split(','));
    });
  });
}