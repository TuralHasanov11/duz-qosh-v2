export default (value)=>{
    // value = `${value.substring(0, value.length - 1)}+04:00`;
    // let date = new Date(value);
  
    // return `${date
    //   .toISOString()
    //   .split("T")[0]
    //   .split("-")
    //   .reverse()
    //   .join("-")} ${date.toTimeString().substring(0, 5)}`;

    const date = new Date(value);
    return date.toLocaleString(['az'], {month:'short', day:'2-digit', year:'numeric',hour: '2-digit',minute:'2-digit'});
}
