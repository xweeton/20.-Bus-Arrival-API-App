const arrivalInfoDiv = document.getElementById('arrivalInfo');

async function fetchBusArrival(busStopIdInput) {
  arrivalInfoDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://sg-bus-arrivals.sigma-schoolsc1.repl.co/?id=${busStopIdInput}`);

    if (response.ok) {
      const busStopArrivalData = await response.json();
      let arrivalInfo = '';

      for (const service of busStopArrivalData.services) {
        let nextBusMins = service.next_bus_mins <= 0 ? 'Arriving' : `Next arrival in ${service.next_bus_mins} minutes`;
        arrivalInfo +=
          `<div> 
            <strong>Bus no: ${service.bus_no}</strong> - ${nextBusMins}
          </div>`;
      }
      arrivalInfoDiv.innerHTML = `${arrivalInfo} <strong>${busStopArrivalData.services.length}</strong> bus(es)`;

    } else {
      arrivalInfoDiv.innerHTML = 'Error fetching bus arrival data.';
    }
  } catch (error) {
    arrivalInfoDiv.innerHTML = `Error: ${error}`;
  }
}

function autoRefreshBusArrival(busStopIdInput) {
  fetchBusArrival(busStopIdInput);

  setInterval(() => {
    fetchBusArrival(busStopIdInput);
  }, 5000)
}

function getBusTiming() {
  const busStopIdInput = document.getElementById('busStopId').value;
  autoRefreshBusArrival(busStopIdInput)
}
