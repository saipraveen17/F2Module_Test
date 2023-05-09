const searchButton = document.getElementById('search-btn');
const searchInput = document.querySelector('input');
const sortAsc = document.getElementById('sort-asc');
const sortDesc = document.getElementById('sort-desc');
const sortMarks = document.getElementById('sort-marks');
const sortPass = document.getElementById('sort-pass');
const sortClass = document.getElementById('sort-class');
const sortGender = document.getElementById('sort-gender');
const tableBody = document.querySelector('tbody');

fetch('MOCK_DATA.json')
  .then(response => response.json())
  .then(data => {
    receiveData(data);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

/*class, email, first_name, gender, id, img_src, last_name, marks, passing*/
function receiveData(data) {
    // data.sort((a, b) => b.marks - a.marks);
    console.log(data);
    defaultPage(data);
    searchInput.addEventListener('input', searchTable);
    searchButton.addEventListener('click', searchTable);
    sortAsc.addEventListener('click', ()=>sortDataAsc(data));
    sortDesc.addEventListener('click', ()=>sortDataDesc(data));
    sortMarks.addEventListener('click', ()=>sortDataMarks(data));
    sortPass.addEventListener('click', ()=>sortDataPass(data));
    sortClass.addEventListener('click', ()=>sortDataClass(data));
    sortGender.addEventListener('click', ()=>sortDataGender(data));
}

function appendData(data) {
    data.forEach(element => {
        const image = document.createElement('img');
        image.src = element.img_src;
        const fullName = element.first_name+' '+element.last_name;
        const spanName = document.createElement('span');
        spanName.innerText = fullName;
        spanName.className = 'fullName';
        const row = document.createElement('tr');
        row.className = 'dataRow';
        const tdid = document.createElement('td');
        tdid.innerText = element.id;
        row.appendChild(tdid);
        const tdname = document.createElement('td');
        const divName = document.createElement('div');
        divName.appendChild(image);
        divName.appendChild(spanName);
        divName.id = 'name';
        tdname.appendChild(divName);
        row.appendChild(tdname);
        const tdgender = document.createElement('td');
        tdgender.innerText = element.gender;
        row.appendChild(tdgender);
        const tdclass = document.createElement('td');
        tdclass.innerText = element.class;
        row.appendChild(tdclass);
        const tdmarks = document.createElement('td');
        tdmarks.innerText = element.marks;
        row.appendChild(tdmarks);
        const tdpassing = document.createElement('td');
        tdpassing.innerText = element.passing==true ? 'Passed' : 'Failed';
        row.appendChild(tdpassing);
        const tdemail = document.createElement('td');
        tdemail.innerText = element.email;
        tdemail.className = 'email';
        row.appendChild(tdemail);
        tableBody.appendChild(row);
    });
}

function defaultPage(data) {
    appendData(data);
}

// Search function
function searchTable() {
    const tableRows = document.querySelectorAll('.dataRow');
    const filter = searchInput.value.toUpperCase();
  
    // Loop through all table rows and hide those that don't match the search query
    tableRows.forEach(row => {
        // console.log(row);
        const fullName = row.querySelector('.fullName').innerText.toUpperCase();
        let arr = fullName.split(' ');
        const firstName = arr[0];
        const lastName = arr[1];
        const email = row.querySelector('.email').textContent.toUpperCase();
        
        if (firstName.indexOf(filter) > -1 || lastName.indexOf(filter) > -1 || email.indexOf(filter) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function sortDataAsc(data) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort by ascending based on name
    rows.sort((a, b) => {
        const aValue = a.querySelector('td:nth-child(2)').textContent;
        const bValue = b.querySelector('td:nth-child(2)').textContent;
        if(aValue<bValue) return -1;
        else if(aValue>bValue) return 1;
        else return 0;
    });

    // Re-append the rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

function sortDataDesc(data) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort by descending based on name
    rows.sort((a, b) => {
        const aValue = a.querySelector('td:nth-child(2)').textContent;
        const bValue = b.querySelector('td:nth-child(2)').textContent;
        if(aValue<bValue) return 1;
        else if(aValue>bValue) return -1;
        else return 0;
    });

    // Re-append the rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

function sortDataMarks(data) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort by marks
    rows.sort((a, b) => {
        const aValue = parseInt(a.querySelector('td:nth-child(5)').textContent);
        const bValue = parseInt(b.querySelector('td:nth-child(5)').textContent);
        return aValue - bValue;
    });

    // Re-append the rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

function sortDataPass(data) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    //sort by passing
    let passedData = rows.filter((e)=>{
        let pass = e.querySelector('td:nth-child(6)').textContent;
        return pass!='Passed';
    })
    passedData.forEach(row => {
        row.style.display = 'none';
        tableBody.appendChild(row);
    });
}

function sortDataClass(data) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort by class
    rows.sort((a, b) => {
        const aValue = parseInt(a.querySelector('td:nth-child(4)').textContent);
        const bValue = parseInt(b.querySelector('td:nth-child(4)').textContent);
        return aValue - bValue;
    });

    // Re-append the rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

function sortDataGender(data) {

    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort by gender
    rows.sort((a, b) => {
        const aValue = a.querySelector('td:nth-child(3)').textContent;
        const bValue = b.querySelector('td:nth-child(3)').textContent;
        if(aValue<bValue) return -1;
        else if(aValue>bValue) return 1;
        else return 0;
    });

    // Re-append the rows to the table body
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}