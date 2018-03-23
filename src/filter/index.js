export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timefilter1000(value){
  if (value) {
    var s = value / 1000;
    var m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    var h = Math.floor(m / 60);
    m = Math.floor(m % 60);
    if (s.toString().length <= 1) {
      s = "0" + s;
    }
    if (m.toString().length <= 1) {
      m = "0" + m;
    }
    if (h.toString().length <= 1) {
      h = "0" + h;
    }
    return h + ":" + m + ":" + s;
  } else {
    return "00:00:00";
  }
}

export function timefilter(value){
  if (value) {
    var s = value;
    var m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    var h = Math.floor(m / 60);
    m = Math.floor(m % 60);
    if (s.toString().length <= 1) {
      s = "0" + s;
    }
    if (m.toString().length <= 1) {
      m = "0" + m;
    }
    if (h.toString().length <= 1) {
      h = "0" + h;
    }
    return h + ":" + m + ":" + s;
  } else {
    return "00:00:00";
  }
}

export function datefilter(value,str){
  if (value) {
    var d = new Date(value);
    if (str) {

    } else {
      str = "YYYYMMDD";
    }
    return d.Format(str);
  } else {
    return "";
  }
}

export function arrayjoinfilter(value,code){
  var tempstr = "";
  if (value && value.length && value.length > 0) {
    value.forEach((obj) => {

      tempstr += obj[code];

    })
  }
  return tempstr;
}