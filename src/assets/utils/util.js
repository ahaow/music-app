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