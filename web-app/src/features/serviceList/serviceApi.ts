import Service from 'models/service';

const url = 'http://localhost:8000/services';

function getAllServices() {
  return fetch(`${url}`);
}

function addService(service: Service) {
  return fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
}

function editService(service: Service) {
  return fetch(`${url}/${service.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
}

function deleteService(service: Service) {
  return fetch(`${url}/${service.id}`, {
    method: 'DELETE',
  });
}
const serviceApi = {
  getAllServices,
  addService,
  editService,
  deleteService,
};

export default serviceApi;
