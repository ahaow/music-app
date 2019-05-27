export const host = "http://localhost:4000";

// 歌曲 多个歌手 分割 "/" 
export const changeSongName = (nameArr) => {
    // console.log(nameArr);
    let str = "";
    let a = ' / ';
    if(nameArr.length > 0) {
        for(let i = 0; i < nameArr.length; i++) {
            str += nameArr[i].name + a;
            
        }
    }
    str = str.substring(0,str.length-3)
    return str;     
}

// 分割url ? search部分

export const GetRequ = (url) => {
    let theRequest = {};
    if(url.indexOf('?') !== -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for(let i=0; i<strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return theRequest;        
}


// 格式化歌词
export const FormatLyric = (lyric) => {
    var medisArray = [];
    var medises = lyric.split("\n");
    medises.forEach((item,index) => {
        var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
        medisArray.push({
            t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
            c: item.substring(item.indexOf("]") + 1, item.length)
        });
    });
    return medisArray;
}