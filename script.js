var quiz_type = document.getElementById('quiz_type');
var four_option = document.getElementById('four-option');
var six_option = document.getElementById('six-option');

var ididentifier = document.getElementById('ididentifier');
var level = document.getElementById('level');
var text = document.getElementById('text');
var question = document.getElementById('question');
var question_helper = document.getElementById('question_helper');
var answer = document.getElementById('answer');
var options = document.getElementById('options');
var options_helper = document.getElementById('options_helper');
var generate = document.getElementById('generate');

var json_container = document.getElementById('json-container');

var copybutton = document.getElementById('copybutton');
var savebutton = document.getElementById('savebutton');

var localdata = localStorage.getItem('jsondata');
if(localdata != null){
    json_container.value = localdata;
} else {
    json_container.value = JSON.stringify([]);
}

function jsonPrettier(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return match;
    });
}

generate.addEventListener('click', () => {
    let json_to_push = JSON.parse(json_container.value);
    json_to_push.push(
        {
            'classId': `${level.value}_${ididentifier.value}`, 
            'text': text.value,
            'question': question.value,
            'question_helper': question_helper.value,
            'answer': answer.value,
            'options': options.value.split(','),
            'quiz_type': quiz_type.value,
            'options_helper': options_helper.value.split(','),
        },
    );

    json_container.value = jsonPrettier(json_to_push);

    text.value = '';
    question.value = '';
    answer.value = '';
});

copybutton.addEventListener('click', () => {
    json_container.select();
    json_container.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert('JSON Berhasil disalin');
});

savebutton.addEventListener('click', () => {
    localStorage.setItem('jsondata', json_container.value);
    alert('Data JSON Berhasil disimpan di lokal');
});