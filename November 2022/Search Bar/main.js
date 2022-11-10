const searchwrapper = document.querySelector(".search_input");
const inputbox = searchwrapper.querySelector("input");
const sugbox = searchwrapper.querySelector(".auto_com");


inputbox.onkeyup = (e) =>{
    // console.log(e.target.value);

    let userdata = e.target.value;
    let emptyarray = [];


    if(userdata)
    {
        emptyarray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userdata.toLocaleLowerCase());

        });

        // console.log(emptyarray);

        emptyarray = emptyarray.map((data) =>{
            return data = `<li> ${data} </li>`;
        });

        // console.log(emptyarray);

        searchwrapper.classList.add("active");

        showsuggg(emptyarray);

        let alllist = sugbox.querySelectorAll("li");


        for (let i = 0; i < alllist.length; i++) {
            alllist[i].setAttribute("onclick","select(this)");
            
        }

    }

    else{
        searchwrapper.classList.remove("active");
    }
}

function select(element)
{
    let selectuserdata = element.textContent;
    inputbox.value = selectuserdata;
    searchwrapper.classList.remove("active");
}

function showsuggg(list)
{
    let listdata;

    if(!list.length)
    {
        uservalue = inputbox.value;
        listdata = `<li>${uservalue}</li>`;
    }

    else
    {
        listdata = list.join('');
    }
    sugbox.innerHTML = listdata;
}