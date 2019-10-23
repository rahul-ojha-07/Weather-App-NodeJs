console.log('Client side js')

const weatherForm = document.querySelector('form')
const inputData = document.querySelector('input')
const output1 = document.querySelector('#message-1')
const output2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    output1.textContent = 'Loading...'
    output2.textContent = ''
    
    const location = inputData.value
    const url = '/weather?address=' + encodeURIComponent(location) 
    fetch(url).then((response) => {
        response.json().then((data) => {
            // console.log(data);
            if (data.error) {
                console.log(data.error);
                output1.textContent = data.error
                
            } else {
                output1.textContent = data.location 
                output2.textContent =  data.forcast
                
                // console.log(data.location);
                // console.log(data.forcast);
            }
        })
    })
})