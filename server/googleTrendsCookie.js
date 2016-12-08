//Go to node_modules/google-trends-api/lib/utils/trendData.js and replace for promiseArr

function promiseArr(keywords, timePeriod) {
  return groupKeywords(keywords).map(function (keyword, index, arr) {
    console.log('called this');
    return rp({
      uri: 'http://www.google.com/trends/fetchComponent?q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=3&' + timePeriod,
      headers: {
        'Cookie': 'APISID=hDguZYjq9yQQn-pN/AyvxrUcx-bKPLgZ0d; HSID=AL6_xR7zxbfMm1ntJ; NID=91=Xsc-58QeVBR_pJrG8SYo-3KfwAb8gEk5sxjxJHdgjaNCDdXrJFRYV5aJh5kWqyTFs5Ot2UrRoTKkQ4FiroT-9CRxLc7m5363zpDAhfHMYx9ywOD69GgdAP4PvAhgTp9BpfL-OCUYl9clzm3GiAriDqcJq3wXYJPyu-wRpjVl514evnA5PZI8PCvyKVSBdgf76_loV8aX9dm1xZIUT5YeVQRjjOjq1D-NGIcbYOVECyhN3A9Xr7rgLoCjL-EUIH8IwvZ6AL6hR103aq3DRkBjZVJ7XYMBKhJpSReMWbM; SAPISID=sLhE5wOP-BWBGFf5/A1fQx_LFq5GJWRn_v; SID=EQSTl7LdhcJhXK9zV6n5_G0UCAIOjce8Whwmf4RfZgmhQx8HQEv_IFFqTvQrrMRmz9TgpQ.; SSID=AZTYsi_k17mZlsrOO'
      }
    })
    .then(function (htmlString) {
      return parseJSON(htmlString, arr[index].split(','));
    });
  });
}