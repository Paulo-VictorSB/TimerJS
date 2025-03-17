document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        hour: document.querySelector('#hour'),
        min: document.querySelector('#min'),
        second: document.querySelector('#second')
    };

    let timerInterval;

    document.querySelector('#playBtn').addEventListener('click', () => {
        if (!validatefields(inputs.hour.value, inputs.min.value, inputs.second.value)) return;

        let hour = parseInt(inputs.hour.value, 10);
        let min = parseInt(inputs.min.value, 10);
        let second = parseInt(inputs.second.value, 10);

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(() => {
            if (second === 0) {
                if (min === 0) {
                    if (hour === 0) {
                        clearInterval(timerInterval);
                    } else {
                        hour--;
                        min = 59;
                        second = 59;
                    }
                } else {
                    min--;
                    second = 59;
                }
            } else {
                second--;
            }

            inputs.hour.value = hour.toString().padStart(2, '0');
            inputs.min.value = min.toString().padStart(2, '0');
            inputs.second.value = second.toString().padStart(2, '0');
        }, 1000);
    });

    document.querySelector('#resetBtn').addEventListener('click', () => {
        resetfileds();
        clearInterval(timerInterval);
    })

    document.querySelector('#stopBtn').addEventListener('click', () => {
        clearInterval(timerInterval);;
    })

    function resetfileds() {
        inputs.hour.value = "00";
        inputs.min.value = "00";
        inputs.second.value = "00";
    }

    function validatefields(hour, min, second) {
        let msg = "";

        if (hour > 24 || hour < 0) {
            msg += 'As horas devem estar entre 0 e 24\n'
        }

        if (min > 59 || min < 0) {
            msg += 'Os minutos devem estar entre 0 e 60\n'
        }

        if (second > 59 || second < 0) {
            msg += 'Os segundos devem estar entre 0 e 60\n'
        }

        if (msg) {
            alert(msg)
            resetfileds()
            return false;
        }

        return true;
    }
})