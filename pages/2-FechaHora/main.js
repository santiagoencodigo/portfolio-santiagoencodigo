window.addEventListener('DOMContentLoaded',(event)=> {
    
    let dateDom = document.querySelector('.main__date');
    let hourDom = document.querySelector('.main__hour');

    let myDate = () =>{
        
        // alert('Fecha cargada');
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        let hour = date.getHours();
        let hour1 = hour %12 || 12
        let ampm = hour1>12 ? 'AM':'PM';

        let mins = date.getMinutes();
        let secs = date.getSeconds();

        // alert (date)
        // alert(day)
        // alert(month)
        // alert(year)

        if(day < 10) day = `0${day}`;
        if(month < 10) month = `0${month}`;
        if(mins <10) mins = `0${mins}`;
        if(secs <10) secs = `0${secs}`;

        dateDom.innerHTML = `${day} / ${month} / ${year}`;
        hourDom.innerHTML = `${hour}:${mins}:${secs} ${ampm}`;
    }   

    myDate();

    setInterval(()=>{
        myDate();
    },1000)

})