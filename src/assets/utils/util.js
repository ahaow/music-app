export const host = "http://localhost:4000";

// 歌曲 多个歌手 分割 "/" 
export const changeSongName = (nameArr) => {
    console.log(nameArr);
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