import moment from "moment";


const timeFunction = (val) => {
    return moment(new Date(val)).format("hh:mm a")
}

const timeHumanizeFunction = (val) => {
    let date = moment(new Date());
    let value = moment(new Date(val));
    let duration = value.diff(date);
    return moment.duration(duration).humanize();
}

const firstLetterCapital =(val) =>{
    const words = val.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
   return  words.join(" ");
}

const trimLength = (val)=>{
    return val.substr(0, 30)+"..."
}


export {
    timeFunction,
    timeHumanizeFunction,
    firstLetterCapital,
    trimLength
}