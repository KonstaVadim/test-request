const urlDataJson = 'data.json';  //url файла

/* Загружаем данные  */
getJsonFile(urlDataJson);/* Получить статус от сервера */

function getStatus() {
    jQuery.ajax({
        'url': 'status1.json',         //Страница, с которой мы запрашиваем данные
        'dataType': 'json',        //Тип запроса
        'type': 'get'          //Способ передачи данных
    }).then(result => {
        if (result.status.toLowerCase() === 'success') {
            showStatus('Успешный ответ');
        } else if (result.status.toLowerCase() == 'error') {
            showStatus('Ошибка запроса');
        } else {

        }
    })
        .fail((response) => {
            if (i < 5) {
                showStatus('Попытка номер: ' + i)
                i++;
                setTimeout(getStatus, 2000)
            } else {
                showStatus('Нет ответа')
            }
        })
}

let i = 1;
jQuery('#send').click(() => {
    getStatus();
});


function showStatus(text) {
    console.log(text)
    document.getElementById('status-text').innerText = text;
}

/* Получить json файл */
async function getJsonFile(url) {
    /*Получаем данные */
    let response = await axios.get(url)

    /* Как только они загрузились, показываем*/
    let data = response.data;
    showData(data);
}

/* Показать данные */
function showData(data) {
    if (!data) {
        console.log('Данные не загружены');
        return
    }

    /* Пробегаемся по массиву */
    data.forEach(sensor => {
        // Проверяем все данные на наличие
        let sensor_type = sensor.Sensor_type !== undefined ? sensor.Sensor_type : 'Нет данных',
            num = sensor.num !== undefined ? sensor.num : 'Нет данных',
            name = sensor.name !== undefined ? sensor.name : 'Нет данных',
            temperature = sensor.temperature !== undefined ? sensor.temperature : 'Нет данных',
            humidity = sensor.humidity !== undefined ? sensor.humidity : 'Нет данных';

        // добавляем данные в html
        let htmlRow =
            '<div class="tr">' + sensor_type + '</div>\n' +
            '<div class="tr">' + num + '</div>\n' +
            '<div class="tr">' + name + '</div>\n' +
            '<div class="tr">' + temperature + '</div>\n' +
            '<div class="tr">' + humidity + '</div>\n'

        let row = createNode('div', 'row');
        row.innerHTML = htmlRow;

        document.getElementById('table-content').appendChild(row);
    })
}

/* Создать узел  */
function createNode(tag, className) {
    let node = document.createElement(tag);
    node.className = className;
    return node;

}

