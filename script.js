const arrivalInfoDiv = document.getElementById('arrivalInfo');

async function fetchBusArrival(busStopIdInput) {
  arrivalInfoDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://sg-bus-arrivals.sigma-schoolsc1.repl.co/?id=${busStopIdInput}`);

    if (response.ok) {
      const busStopArrivalData = await response.json();
      let arrivalInfo = '';

      for (const service of busStopArrivalData.services) {
        arrivalInfo += 
          `<div> 
            <strong>Bus no: ${service.bus_no}</strong> - Next arrival in ${service.next_bus_mins} minutes
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

function getBusTiming() {
  const busStopIdInput = document.getElementById('busStopId').value;
  return fetchBusArrival(busStopIdInput);
}
